import { useEffect, useState } from "react";
import ComponentsContainer from "./Containers/ComponentsContainer";
import { Plus, Minus } from "lucide-react";

interface ComponentsProps{
    model: boolean,
    set: Function,
    data: string[]
}

export default function Components(props: ComponentsProps){

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [componentes, setComponents] = useState<number[]>([]);
    const [currentID, setCurrentID] = useState<number>(0)

    const [currentComponent, setCurrentComponent] = useState<number>(-1);
    const [requestData, setRequestData] = useState<number>(-1);

    const [lines, setLines] = useState<string[]>(props.data);

    useEffect(() => {
        if(lines.length > 0)
            props.set(lines);
    }, [lines]);

    useEffect(() => {
        if(props.data.length > 0){
            let comp: number[] = [];
            let finalID = 0;

            props.data.forEach(_l => {
                comp.push(finalID);
                finalID += 1;
            })

            setComponents(comp);
            setCurrentID(finalID);
            setLines(props.data);
        }
    }, [props.data])

    function addEvent(){
        if(!isOpen)
            setIsOpen(true);
        setComponents([...componentes, currentID]);
        setCurrentID(currentID+1);
    }

    function deleteEvent(){
        if(!isOpen)
            setIsOpen(true);
        setComponents((prev) => {
            let updated = [...prev]
            updated = updated.filter(n => n != currentComponent)

            return updated;
        });
    }

    function setCurrent(id: number){
        setCurrentComponent(id);
    }

    function getData(data: string, id: number){
        setLines((prev) =>{
            const updated = [...prev];
            updated[id] = data

            return updated;
        })
    }

    return(
        <div className={`w-full flex flex-col ${isOpen ? "h-full" : ""} mt-4`}>
            <div className="flex flex-row gap-4 justify-center">
                <button className="w-2/4 p-4 bg-blue-900 text-white font-bold rounded-xl" onClick={() => {setIsOpen(!isOpen)}}>{props.model ? "MODELO" : "COMPONENTES"}</button>
                <button className="w-14 p-4 bg-blue-900 text-white font-bold rounded-full text-lg" onClick={() => {addEvent()}}><Plus /></button>
                <button className="w-14 p-4 bg-blue-900 text-white font-bold rounded-full text-lg" onClick={() => {deleteEvent()}}><Minus /></button>
            </div>
            <div className={`w-4/5 h-3/4 border-2 border-azul rounded-xl mt-8 p-2 relative flex flex-col self-center ${(isOpen) ? "flex" : "hidden"} overflow-auto gap-4`}>
                
                <div className="overflow-auto pb-28">
                    {
                        componentes.map((e, i) => {
                            return <ComponentsContainer key={e} index={i} onClick={() => {setCurrent(e)}} requestData={requestData} setRequestData={getData} model={props.model} data={lines[i]} />
                        })
                    }
                </div>

                <div className="absolute left-0 bottom-0 flex flex-row bg-white gap-4 w-full p-4 border-t-2 border-blue-900">
                    <button className="p-4 bottom-2 bg-blue-900 text-white font-bold rounded-xl" onClick={() => {setRequestData(Math.random())}}>APLICAR</button>
                    <button className="p-4 bottom-2 right-2 bg-blue-900 text-white font-bold rounded-xl" onClick={() => {console.log(lines)}}>TESTAR</button>
                </div>
            </div>
        </div>
    );
}