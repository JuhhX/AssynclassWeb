import { useEffect, useRef, useState } from "react";
import Components from "./Components";
import Events from "./Events";
import Styles from "./Styles";
import Variables from "./Variables";
import { ChevronsRight } from "lucide-react";
import { getUserName } from "@/lib/user/user";
import { useSearchParams } from "next/navigation";
import RenderStack from "./RenderStack";

interface ContainerProps{
    load: Function,
    requestDownload: number
}

export default function Container(props: ContainerProps){

    const params = useSearchParams();

    const [variables, setVariables] = useState<string[]>([]);
    const [events, setEvents] = useState<string[]>([]);
    const [styles, setStyles] = useState<string[]>([]);
    const [componentes, setComponents] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [renderStack, setRenderStack] = useState<string[]>([]);

    const [isMerge, setMerge] = useState<boolean>(false);

    const [isClosed, setIsClosed] = useState<boolean>(false);

    const [showingUpload, showUploadButton] = useState<boolean>(false);
    const [teacherID, setTeacherID] = useState<string | null>(null);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [isUpdate, setUpdate] = useState<boolean>(false);

    const downloadRef = useRef<HTMLAnchorElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        props.load(getSplited(variables).concat(getSplited(events)).concat(getSplited(styles)).concat(getSplited(componentes)).concat(getSplited(models)))
    }, [variables, events, styles, componentes, models])

    useEffect(() => {
        getUserName().then(res => {
            setTeacherID(res.id);
            showUploadButton((res.type == "1") ? true : false);
        });
    }, []);

    useEffect(() => {
        const template_type = params.get("template");
        const id = params.get("id");
    
        if(template_type){
          fetch(`http://localhost:3333/templates/${template_type}`, {
            method: "GET"
          })
          .then(resp => resp.blob())
          .then(data => {
              const reader = new FileReader();
                reader.onload = () => {
                    var objects = String(reader.result).split("§§");
    
                    setVariables(JSON.parse(objects[0]));
                    setEvents(JSON.parse(objects[1]));
                    setStyles(JSON.parse(objects[2]));
                    setComponents(JSON.parse(objects[3]));
                    setModels(JSON.parse(objects[4]));
                };
    
                reader.readAsText(data, 'UTF-8');
          })
        }
        else if(id){
            fetch(`http://localhost:3333/games/${id}`, {
                method: "GET"
            })
            .then(resp => resp.blob())
            .then(data => {
                const reader = new FileReader();
                    reader.onload = () => {
                        var objects = String(reader.result).split("\n");

                        let vars : string[] = [], evts : string[] = [], stys : string[] = [], comp : string[] = [];
                        let current_reading: string;

                        objects.map(line => {
                            if(line.startsWith("var:")) current_reading = "var";
                            else if(line.startsWith("event:")) current_reading = "event";
                            else if(line.startsWith("style:")) {
                                if(current_reading != "component")
                                    current_reading = "style";
                            }
                            else if(line.startsWith("component:")) current_reading = "component";

                            if(line != " " && line.length != 0){
                                if(current_reading == "var")
                                    vars.push(line);
                                else if(current_reading == "event")
                                    evts.push(line);
                                else if(current_reading == "style")
                                    stys.push(line);
                                else if(current_reading == "component")
                                    comp.push(line);
                            }
                        })

                        setVariables(vars);
                        setEvents(groupData(evts, "event:", "end_event"));
                        setStyles(groupData(stys, "style:", "end_style"));
                        setComponents(groupData(comp, "component:", "end_component"));
                        setUpdate(true);
                    };
        
                    reader.readAsText(data, 'UTF-8');
            })
        }
    
    }, []);
      
    function groupData(data: string[], init: string, end: string) : string[]{
        
        let response : string[] = [];
        let data_aux : string = "";
        let is_reading : boolean = false;

        data.map(l => {
            let ignore = false;

            if(l.startsWith(init)){
                is_reading = true;
                data_aux += l + "\n";
                ignore = true;
            }
            else if(l == end){
                is_reading = false;
                data_aux += l;

                response.push(data_aux);
                data_aux = "";
            }

            if(is_reading && !ignore)
                data_aux += l + "\n";
        })
        
        return response;
    }
    
    function getSplited(v: string[]){
        let result: string[] = [];

        v.forEach(l => {
            if(l){
                let splited = l.split("\n")
                
                splited.forEach(s => {
                    if(s != "")
                        result.push(s);
                })
            }
        });


        return result;
    }

    function saveInServer(){
        if(isUpdate && teacherID){
            if(String(params.get("id")).startsWith(teacherID)){
                fetch(`http://localhost:3333/games/${String(params.get("id"))}`, {
                    method: "PUT",
                    body: JSON.stringify(
                        {
                            teacherID,
                            gameContent: `owner: "${teacherID}"\n${getSplited(renderStack).join("\n")}\n\n${getSplited(variables).join("\n")}\n\n${getSplited(events).join("\n")}\n\n${getSplited(styles).join("\n")}\n\n${getSplited(models).join("\n")}\n\n${getSplited(componentes).join("\n")}`,
                            gameName: name,
                            gameDescription: description
                        }
                    ),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
                .then(data => {
        
                    if(data.status == 401)
                        alert("Atualização não realizada.");
                    else if(data.status == 200){
                        alert("Atualização realizada com sucesso.");
                    }
                })
            }
        }
        else{
            fetch("http://localhost:3333/upload_game", {
                method: "POST",
                body: JSON.stringify(
                    {
                        teacherID,
                        gameContent: `owner: "${teacherID}"\n${getSplited(renderStack).join("\n")}\n\n${getSplited(variables).join("\n")}\n\n${getSplited(events).join("\n")}\n\n${getSplited(styles).join("\n")}\n\n${getSplited(models).join("\n")}\n\n${getSplited(componentes).join("\n")}`,
                        gameName: name,
                        gameDescription: description
                    }
                ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(data => {
    
                if(data.status == 401)
                    alert("Upload não realizado.");
                else if(data.status == 200){
                    alert("Upload realizado com sucesso.");
                    window.location.href = "/teacher/activities"
                }
            })
        }
    }

    function save(final: boolean){
        
        if(downloadRef.current != null){
            let date = new Date();
            let filename = `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getMilliseconds()}`
            let dataStr = "";

            if(!final){
                dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(`${JSON.stringify(renderStack)}§§${JSON.stringify(variables)}§§${JSON.stringify(events)}§§${JSON.stringify(styles)}§§${JSON.stringify(componentes)}§§${JSON.stringify(models)}`);
                filename += ".txt";
            }
            else{
                dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(`${getSplited(renderStack).join("\n")}\n\n${getSplited(variables).join("\n")}\n\n${getSplited(events).join("\n")}\n\n${getSplited(styles).join("\n")}\n\n${getSplited(models).join("\n")}\n\n${getSplited(componentes).join("\n")}`);
                filename += ".asl";
            }
            downloadRef.current.setAttribute("href", dataStr);
            downloadRef.current.setAttribute("download", filename);
            downloadRef.current.click();
        }
    }

    function importFile(){
        if(inputRef.current != null){
            inputRef.current.click();
        }
    }

    function mergeFile(){
        if(inputRef.current){
            setMerge(true);
            inputRef.current.click();
        }
    }

    function getLoadedData(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files){

            if(e.target.files.length == 1){
              var reader = new FileReader();
      
              //Extrai os componentes para renderizar
              reader.onload = function(event) {
                if(event.target?.result){
                  var objects = event.target.result.toString().split("§§");
            
                  if(isMerge){
                    setVariables([...variables, JSON.parse(objects[0])[0]]);
                    setEvents([...events, JSON.parse(objects[1])[0]]);
                    setStyles([...styles, JSON.parse(objects[2])[0]]);
                    setComponents([...componentes, JSON.parse(objects[3])[0]]);
                    setModels([...models, JSON.parse(objects[4])[0]]);
                  }
                  else{
                      setVariables(JSON.parse(objects[0]));
                      setEvents(JSON.parse(objects[1]));
                      setStyles(JSON.parse(objects[2]));
                      setComponents(JSON.parse(objects[3]));
                      setModels(JSON.parse(objects[4]));
                  }
                }
              }
              
              reader.readAsText(e.target.files[0]);
            }
          }
      
          //setMerge(false);

          if(inputRef.current != null)
            inputRef.current.value = ""
    }

    useEffect(() => {
        if(props.requestDownload != -1)
            save(true);
    }, [props.requestDownload])

    return(
        <div className={`absolute right-0 transition-transform duration-300 ${(isClosed) ? "translate-x-[90%]" : ""} w-1/3 h-screen`}>
            <div className={`absolute cursor-pointer top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-10 bg-azul p-3 rounded-full transition-all duration-500 ${(isClosed) ? "rotate-180" : ""} hover:bg-verde`} onClick={() => setIsClosed(!isClosed)}><ChevronsRight color="white" size={32} /></div>
            <div className="h-full bg-white border-2 border-b-4 border-azul rounded-xl p-4 pb-8 pt-10 flex flex-col overflow-auto gap-4 scrollbar-thin scrollbar-track-azul">

                <input type="text" className="w-4/5 p-2 rounded-xl border-slate-400 border-2 self-center" placeholder="Nome" value={name} onChange={(e) => {setName(e.currentTarget.value)}} />
                <input type="text" className="w-4/5 p-2 rounded-xl border-slate-400 border-2 self-center mb-4" placeholder="Descrição" value={description} onChange={(e) => {setDescription(e.currentTarget.value)}} />

                <Variables set={setVariables} data={variables} />
                <Events set={setEvents} data={events} />
                <Styles set={setStyles} data={styles} />
                <Components model={false} set={setComponents} data={componentes} />
                <RenderStack set={setRenderStack} data={renderStack} />

                <div className="flex flex-row px-8 gap-4 mt-4 justify-center">
                    <button className="bg-emerald-500 w-1/2 py-4 px-2 rounded-xl font-bold text-white" onClick={() => {save(false)}}>Salvar rascunho</button>
                    <button className="bg-emerald-500 w-1/2 py-4 px-2 rounded-xl font-bold text-white" onClick={() => {importFile()}}>Carregar rascunho</button>
                </div>
                <div className="flex flex-row px-8 gap-4 mt-4 justify-center">
                    <button className="bg-emerald-500 w-1/2 py-4 px-2 rounded-xl font-bold text-white" onClick={() => {mergeFile()}}>Misturar rascunhos</button>
                    {
                        (showingUpload) && 
                        <button className="bg-emerald-500 w-1/2 py-4 px-2 rounded-xl font-bold text-white" onClick={() => {saveInServer()}}>Salvar na conta</button>
                    }
                </div>

                <a href="" ref={downloadRef}></a>
                <input type="file" accept=".txt" className="hidden" ref={inputRef} onChange={(e) => getLoadedData(e)} />
                
            </div>
        </div>
    )
}