import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { CommandsInterface, ErrorsList, current_line, deleteComponent, displayError, new_components, readReturn, render, resolveValue, resolveVariable, set, setText, useData, useEvents, useRenderStack, useStyles, variable, verifyCondition } from "./editor_core";
import { Communication } from "./Context";
import { ArcherElement } from 'react-archer';
import { getUserName } from "@/lib/user/user";
import { useSearchParams } from "next/navigation";

interface GraphicComponentInterface {
    name: string,
    data: string[],
    communication: Function,
    requestCommunication: Communication,
    requestUpdate: Function
}

interface PropertiesInterface {
    [key: string]: string | boolean | number
}

interface Position {
    x: number
    y: number
}

export default function GraphicComponent(props: GraphicComponentInterface) {

    const params = useSearchParams();
    const dRef = useRef<any>();

    const [properties, setProperties] = useState<PropertiesInterface>(
        {
            text: "",
            imageurl: "",
            input: false,
            placeholder: "",
            storetextin: "",
            canmove: false,
            onclick: "",
            onmouseover: "",
            onmouseout: "",
            visible: true,
            posx: 0,
            posy: 0,
            call: "",
            interval: "",
            timeout: "",
            connect: "",
            inputtype: ""
        }
    );

    const [collisions, setCollisions] = useState<(number | string)[][]>([]);
    const [connections, setConnections] = useState<(any)[]>([]);
    const [styles, setStyles] = useState<PropertiesInterface>({});
    const [offPosition, setOffPosition] = useState<Position>({ x: 0, y: 0 });

    const [linkedList, setLinkedList] = useState<PropertiesInterface>({});

    const { getEventByName } = useEvents();
    const { getStyleByName } = useStyles();

    const renderStack = useRenderStack();

    const self_commands: CommandsInterface = {
        "text": setValue,
        "imageurl": setValue,
        "input": setValue,
        "inputtype": setValue,
        "placeholder": setValue,
        "storetextin": setValue,
        "canmove": setValue,
        "onclick": setValue,
        "onmouseover": setValue,
        "onmouseout": setValue,
        "visible": setValue,
        "style": setValue,
        "posx": setValue,
        "posy": setValue,
        "connect": resolveConnection,
        "clearstyle": clearStyle,
        "eventtarget": executeInTarget,
        "if": if_condition,
        "new": new_model,
        "getname": getName,
        "delete": delete_component,
        "render": render_,
        "points": points
    };

    useEffect(() => {
        if (props.data.length > 0) {
            read();
        }
    }, [props.data]);

    useEffect(() => {
        if (props.requestCommunication.requestID != -1 && props.requestCommunication.name == props.name) {
            executeEvent(props.requestCommunication.event);
        }
    }, [props.requestCommunication])

    useEffect(() => {
        setOffPosition(getPosition());
        callOnLoad();
    }, [properties])

    function read() {

        let loaded_properties: PropertiesInterface = {};
        let load_style = false;
        let load_style_name = "";

        props.data.forEach((line) => {
            let splited_line = line.split(": ");

            try {
                let command = splited_line[0].trim().toLowerCase();
                let value = splited_line[1].trim();

                if (command != "collision" && command != "connect" && command != "linkedto")
                    loaded_properties[command] = resolveValue(value);
                else if(command == "connect")
                    resolveConnection(value);
                else if(command == "linkedto")
                    setLinked(value);
                else
                    resolveCollision(value);

                if (command == "style") {
                    load_style = true;
                    load_style_name = value;
                }
            }
            catch { }
        });

        setProperties(loaded_properties);
        if (load_style)
            aplyStyle(load_style_name);
    }

    function aplyStyle(name: string) {
        let loaded_properties: PropertiesInterface = {};

        let style_data = getStyleByName(name);
        
        if(style_data != undefined){
            style_data.forEach((line) => {
                let splited_line = line.split(": ");
    
                try {
                    let command = splited_line[0].trim();
                    let value = resolveValue(splited_line[1].trim());
    
                    loaded_properties[command] = (typeof value == "string") ? value.slice(1, value.length - 1) : value;
                }
                catch { }
            });
        }

        setStyles(loaded_properties);
    }

    function modifyStyle(name: string) {
        getStyleByName(name).forEach((line) => {
            let splited_line = line.split(": ");

            try {
                let command = splited_line[0].trim();
                let value = resolveValue(splited_line[1].trim());

                setStyles((prev) => {
                    let updated = { ...prev };
                    updated[command] = (typeof value == "string") ? value.slice(1, value.length - 1) : value;;

                    return updated;
                })
            }
            catch { }
        });
    }

    function clearStyle() {
        setStyles((_prev) => { return {} });
    }

    function resolveCollision(params: string) {
        const params_split = params.split("=>");
        const numbers = params_split[0].trim().split(",");
        const event = params_split[1].trim();

        let collision: (string | number)[] = [];

        numbers.forEach(number => {
            collision.push((number.startsWith("var:{")) ? resolveVariable(number) : resolveValue(number));
        });

        collision.push(event);

        setCollisions(previous => { return [...previous, collision] });
    }

    function resolveConnection(params:string){
        const params_split = params.split(",");

        let targetID : string = (params_split[0].trim().startsWith("var:{")) ? resolveVariable(params_split[0].trim()) : params_split[0].trim();
        let target_anchor: string = (params_split[1].trim().startsWith("var:{")) ? resolveVariable(params_split[1].trim()) : params_split[1].trim();
        let source_anchor: string = (params_split[2].trim().startsWith("var:{")) ? resolveVariable(params_split[2].trim()) : params_split[2].trim();

        if(targetID.startsWith("\""))
            targetID = targetID.trim().slice(1, targetID.length-2);
        
        if(target_anchor.startsWith("\""))
            target_anchor = target_anchor.trim().slice(1, target_anchor.length-2);
        
        if(source_anchor.startsWith("\""))
            source_anchor = source_anchor.trim().slice(1, source_anchor.length-2);

        
        
        if(params_split.length == 4)
            setConnections([...connections, { targetId: targetID, targetAnchor: target_anchor, sourceAnchor: source_anchor, style: { strokeColor: params_split[3].trim(), strokeWidth: 1 } }])
        if(params_split.length == 5)
            setConnections([...connections, { targetId: targetID, targetAnchor: target_anchor, sourceAnchor: source_anchor, style: { strokeColor: params_split[3].trim(), strokeWidth: 1 }, label: <div style={{ fontWeight: 'bold' }}>{params_split[4].trim()}</div> }])
    }

    function setLinked(params: string){
        
        let param_split = params.split("=");
        let var_name = param_split[0].trim();
        let var_value = param_split[1].trim();
        
        let linked_name = props.name+"_"+var_name;

        setLinkedList((prev) => {
            const updated = {...prev}
            updated[var_name] = linked_name
            return updated;
        });
        variable(`${linked_name} = ${var_value}`)

    }

    function executeInTarget(params: string) {
        const params_split = params.split("=>");
        let name = (params_split[0].trim().startsWith("var:{")) ? resolveVariable(params_split[0].trim()) : params_split[0].trim();
        const event = params_split[1].trim();

        if(name.startsWith("\"")){
            name = name.trim().slice(1, name.length - 2);
        }

        props.communication(name, event);
    }

    function callOnLoad() {
        if (typeof properties.call == "string" && properties.call != "") {
            executeEvent(properties.call);
            setProperties((prev) => {
                let updated = { ...prev }
                updated["call"] = ""

                return updated;
            })
        }
        else if (typeof properties.interval == "string" && properties.interval != "") {
            interval(properties.interval)
            setProperties((prev) => {
                let updated = { ...prev }
                updated["interval"] = ""

                return updated;
            })
        }
        else if (typeof properties.timeout == "string" && properties.timeout != "") {
            timeout(properties.timeout)
            setProperties((prev) => {
                let updated = { ...prev }
                updated["timeout"] = ""

                return updated;
            })
        }
    }

    //Executa evento em um intervalo, sendo parado por uma condição for true
    function interval(params: string) {
        let params_split = params.split("=>");

        if (params_split.length == 2) {
            let params_interval_split = params_split[0].trim().split(",");
            let event = params_split[1].trim();

            if (params_interval_split.length == 2) {
                let time = (params_interval_split[0].trim().startsWith("var:{")) ? resolveVariable(params_interval_split[0].trim()) : resolveValue(params_interval_split[0].trim());
                if (typeof time != "number")
                    displayError(ErrorsList.TYPE_DOESNT_MATCH, current_line, ["number", (typeof time).toString()]);
                else {
                    let time_interval_event = setInterval(() => {

                        executeEvent(event);

                        if (verifyCondition(params_interval_split[1]))
                            clearInterval(time_interval_event);
                    }, time * 1000);
                }
            }
            else {
                displayError(ErrorsList.INTERVAL_WRONG_STRUCTURE, current_line, null);
            }
        }
        else
            displayError(ErrorsList.INTERVAL_WRONG_STRUCTURE, current_line, null);

    }

    //Executa evento após tempo
    function timeout(params: string) {
        let param_split = params.split("=>");

        if (param_split.length == 2) {

            let time = (param_split[0].trim().startsWith("var:{")) ? resolveVariable(param_split[0].trim()) : resolveValue(param_split[0].trim());
            let event = param_split[1].trim();

            if (typeof time != "number") {
                displayError(ErrorsList.TYPE_DOESNT_MATCH, current_line, ["number", (typeof time).toString()]);
            }
            else {
                let time_out_event = setTimeout(() => {
                    executeEvent(event);
                    clearTimeout(time_out_event);
                }, time * 1000);
            }
        }
        else {
            displayError(ErrorsList.TIMEOUT_WRONG_STRUCTURE, current_line, null);
        }

    }

    //Executa um evento se condição for igual a true
    function if_condition(params: string) {
        let param_split = params.split("=>");
        let condition = param_split[0].trim();

        if (param_split.length == 2) {
            let event = param_split[1].trim();
            if (event.startsWith("func:{")) {
                if (verifyCondition(condition)) {
                    let init = event.indexOf("{") + 1;
                    let end = event.indexOf("}");
                    readReturn(event.slice(init, end))
                }
            }
            else if (event in useEvents().getEvents()) {
                if (verifyCondition(condition))
                    executeEvent(event)
            }
            else if (!(event in useEvents().getEvents()))
                displayError(ErrorsList.EVENT_NOT_FOUNDED, current_line, [event]);
        }
        else
            displayError(ErrorsList.IF_MISSING_PARAMETERS, current_line, null);

    }

    function render_(params: string){
        let gameID : string = "";

        if(params.startsWith("\"") && params.endsWith("\""))
            params = params.substring(1, params.length - 1);

        if(renderStack.getRenderStack()){
            
            if(params == "next" || params == "")
                gameID = renderStack.nextRender();
            else if(params == "back")
                gameID = renderStack.backRender();
            else if(params.startsWith(">")){
                params = params.substring(1, params.length);
                let pointer_value : number = (params.trim().startsWith("var:{")) ? resolveVariable(params.trim()) : resolveValue(params.trim());
                gameID = renderStack.setRenderStackPointer(pointer_value);
            }
            else
                gameID = renderStack.nextRender();

            if(gameID)
                gameID = gameID.substring(1, gameID.length-1);
            else{
                alert("Você finalizou as atividades!");
                window.location.href = "/teacher/activities"
            } 
        }
        else
            gameID = params;
        

        fetch(`http://localhost:3333/games/${gameID}`)
        .then(res => res.blob())
        .then(data => {
            const reader = new FileReader();
            let content_loaded : string[]; 

            reader.onload = () => {
                const content = String(reader.result);
                if(content.includes("\r\n"))
                   content_loaded = content.split("\r\n");
                else  
                   content_loaded = content.split("\n");

                render(content_loaded);
                props.requestUpdate(Math.random());
            };

            reader.readAsText(data, 'UTF-8');
        })
    }

    function points(params: string){
        let points_obtained : number = (params.trim().startsWith("var:{")) ? resolveVariable(params.trim()) : resolveValue(params.trim());

        if(points_obtained > 100)
            points_obtained = 100;
        else if(points_obtained < 0)
            points_obtained = 10;

        getUserName().then(resp => {
            fetch(`http://localhost:3333/student/${resp.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    points: points_obtained
                })
            }).then(resp => {
                if(resp.status == 200)
                    alert(`Você ganhou ${points_obtained}`);
            })
        });

        let ownerID = useData().getOwner();

        if(ownerID.startsWith("\"") && ownerID.endsWith("\""))
            ownerID = ownerID.substring(1, ownerID.length - 1);

        fetch(`http://localhost:3333/teacher/${ownerID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                points: points_obtained/2
            })
        })

    }

    function new_model(params: string) {
        let param_split = params.split("=>")
        let names = param_split[0].trim().split(",");
        
        let event = param_split[1].trim();

        let instance_name = names[1].trim();

        if(instance_name.startsWith("force:"))
            instance_name =  instance_name.replace("force:", "");
        else
            instance_name += Math.floor(Math.random() * (1000 - 0) + 0);

        new_components(names[0] + "," + instance_name);
        props.requestUpdate(Math.random());
        if (event != "void") {
            executeInTarget(`${instance_name} => ${event}`);
        }
    }

    function getName(params: string){
        if(params.trim().startsWith("var:{")){
            let init = params.indexOf("{")+1;
            let end = params.indexOf("}");

            params = params.slice(init, end);
        }
            
        set(`"${props.name}" > ${resolveLinked(params.trim(), false)}`);
    }

    function delete_component(params: string){

        params = params.trim();

        if(params.startsWith("var:{")){
            let resolved = resolveVariable(params).trim()
            params = resolved.slice(1, resolved.length - 1);
        }

        deleteComponent(params)
        props.requestUpdate(Math.random());
    }

    function executeClick() {
        if (typeof properties.onclick == "string" && properties.onclick != undefined) {
            if (properties.onclick.includes("func:{")) {
                let init = properties.onclick.indexOf("{") + 1;
                let end = properties.onclick.indexOf("}");
                readReturn(properties.onclick.slice(init, end));
            }
            else {
                executeEvent(properties.onclick);
            }
        }
    }

    function executeOnMouseOver() {
        if (typeof properties.onmouseover == "string" && properties.onmouseover != undefined) {
            if (properties.onmouseover.includes("func:{")) {
                let init = properties.onmouseover.indexOf("{") + 1;
                let end = properties.onmouseover.indexOf("}");
                readReturn(properties.onmouseover.slice(init, end));
            }
            else {
                executeEvent(properties.onmouseover);
            }
        }
    }

    function executeOnMouseOut() {
        if (typeof properties.onmouseout == "string" && properties.onmouseout != undefined) {
            if (properties.onmouseout.includes("func:{")) {
                let init = properties.onmouseout.indexOf("{") + 1;
                let end = properties.onmouseout.indexOf("}");
                readReturn(properties.onmouseout.slice(init, end));
            }
            else {
                executeEvent(properties.onmouseout);
            }
        }
    }

    function setValue(params: string, type: string) {
        if (type == "style") {
            modifyStyle(params);
        }
        else {
            setProperties((prev) => {
                let updated = { ...prev }
                updated[type] = resolveValue(params)

                return updated;
            })
        }

        setOffPosition(getPosition());
    }

    //Executa um evento
    function executeEvent(event: string) {
        getEventByName(event).forEach((f) => {
            f = f.trim();

            f = f.split(" ").map(l => {
                if(l.includes("linked:{"))
                    return resolveLinked(l, false);
                return l;
            }).join(" ");

            let command_end = f.indexOf(":");
            let command = f.slice(0, command_end).toLowerCase();

            if (command in self_commands) {
                self_commands[command](f.slice(command_end + 1, f.length).trim(), command);
            }
            else {
                readReturn(f);
            }
        });

        
    }

    function changeText(text: string) {
        if (typeof properties.storetextin == "string" && properties.storetextin != undefined) {
            setText(`"${text}" #> ${resolveLinked(properties.storetextin, true)}`);
        }
    }

    function resolveLinked(params: string, justName: boolean){
        let init = params.indexOf("{")+1;
        let end = params.indexOf("}");
        let sliced = params.slice(init, end);

        if(sliced in linkedList && !justName)
            return `var:{${linkedList[sliced]}}`
        else if(sliced in linkedList && justName)
            return `${linkedList[sliced]}`
        return params;
    }

    function resolveVisibility() {
        if (properties.visible == undefined)
            return "flex";
        else if (typeof properties.visible == "boolean" && properties.visible)
            return "flex";
        else if (typeof properties.visible == "boolean" && !properties.visible)
            return "hidden";
    }

    function getPosition() {

        let posx = 0;
        let posy = 0;

        if (properties.posx != undefined)
            posx = (properties.posx.toString().startsWith("var:{")) ? resolveVariable(properties.posx.toString()) : Number(properties.posx);
        if (properties.posy != undefined)
            posy = (properties.posx.toString().startsWith("var:{")) ? resolveVariable(properties.posx.toString()) : Number(properties.posy);

        return { x: posx, y: posy };
    }

    function resolveText(text: string) {
        if (text.startsWith("var:{"))
            return resolveVariable(text);
        else
            return text.slice(1, text.length - 1)
    }

    function verifyIntersection() {
        let alredy_fired: string[] = [];
        if (collisions.length > 0) {
            for (var x = 0; x < collisions.length - 1; x++) {
                let posx = Number(collisions[x][0]);
                let posy = Number(collisions[x][1]);
                let width = Number(collisions[x][2]);
                let height = Number(collisions[x][3]);
                if ((posx - 50 < dRef.current.state.x && (posx + width) > dRef.current.state.x) &&
                    (posy - 50 < dRef.current.state.y && (posy + height) > dRef.current.state.y) &&
                    (!alredy_fired.includes(collisions[x][collisions[x].length - 1].toString()))) {
                    alredy_fired.push(collisions[x][collisions[x].length - 1].toString());
                    executeEvent(collisions[x][collisions[x].length - 1].toString());
                }
            }

        }
        setOffPosition({ x: dRef.current.state.x, y: dRef.current.state.y });
        setProperties((prev) => {
            let updated = { ...prev }
            updated["posx"] = dRef.current.state.x
            updated["posy"] = dRef.current.state.y

            return updated;
        })
    }

    return (
        <Draggable ref={dRef} defaultPosition={offPosition} position={offPosition} positionOffset={{ x: 0, y: 0 }} onStop={() => {verifyIntersection(); props.requestUpdate(Math.random());}} disabled={(typeof properties.canmove == "boolean") ? !properties.canmove : false}>


            <div className={`absolute ${resolveVisibility()} break-words`} onClick={() => { executeClick() }} onMouseOver={() => { executeOnMouseOver() }} onMouseOut={() => { executeOnMouseOut() }} style={styles}>
                <ArcherElement id={props.name} relations={connections}>
                    <div className="w-full h-full">

                        {
                            (typeof properties.text == "string" && properties.text != undefined) ?
                                // <p className="whitespace-pre">{resolveText(properties.text.trim())}</p>
                                <p className="">{resolveText(properties.text.trim())}</p>
                            : (typeof properties.imageurl == "string" && properties.imageurl != undefined) ?
                                <img src={properties.imageurl.slice(1, properties.imageurl.length - 1)} />
                            : (typeof properties.input == "boolean" && properties.input) ?
                                <input type={(properties.inputtype != undefined && typeof properties.inputtype == "string") ? properties.inputtype : "text"} className="w-full bg-transparent h-full p-2" placeholder={(typeof properties.placeholder == "string") ? properties.placeholder.slice(1, properties.placeholder.length - 1) : ""} onChange={(e) => { changeText(e.currentTarget.value) }} />
                            :
                                null
                        }

                    </div>
                </ArcherElement>
            </div>


        </Draggable>
    );
}