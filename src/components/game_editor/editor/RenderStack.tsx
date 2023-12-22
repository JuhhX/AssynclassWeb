import { useEffect, useState } from "react";
import StylesContainer from "./Containers/StylesContainer";
import { Plus, Minus } from "lucide-react";

interface RenderStackInterface{
    set: Function,
    data: string[]
}

export default function RenderStack(props: RenderStackInterface){

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<number>(-1);

    const [lines, setLines] = useState<string[]>(props.data);

    const [renderStackValue, setRenderStackValue] = useState<string>("");

    useEffect(() => {
        if(lines.length > 0)
            props.set(lines);
    }, [lines]);

    useEffect(() => {
        if(props.data.length > 0){
            let sty: number[] = [];
            let finalID = 0;

            props.data.forEach(_l => {
                sty.push(finalID);
                finalID += 1;
            })

            setLines(props.data);
        }
    }, [props.data]);

    useEffect(() => {
        getData(exportData(), 1);
    }, [requestData]);

    function exportData(){

        const IDs = renderStackValue.split("\n").map(i => `"${i.trim()}"`);

        if(renderStackValue.length == 0){
            return "";
        } 
        return `renderstack: r \n${IDs.join("\n")}\nend_render_stack` ;
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
                <button className="w-2/4 p-4 bg-blue-900 text-white font-bold rounded-xl" onClick={() => {setIsOpen(!isOpen)}}>RENDERIZAÇÃO</button>
                <button className="w-14 p-4 bg-blue-900 text-white font-bold rounded-full text-lg" onClick={() => {setIsOpen(true)}}><Plus /></button>
                <button className="w-14 p-4 bg-blue-900 text-white font-bold rounded-full text-lg" onClick={() => {setIsOpen(false)}}><Minus /></button>
            </div>
            <div className={`w-4/5 h-3/4 border-2 border-azul rounded-xl mt-8 p-2 relative flex flex-col self-center ${(isOpen) ? "flex" : "hidden"} overflow-auto gap-4`}>
                
                <div className="overflow-auto pb-28">
                    <textarea className="w-full p-2 rounded-xl border-slate-400 border-2 mt-2 resize-none" placeholder="ID dos jogos (separados por linhas)" value={renderStackValue} onChange={(e) => {setRenderStackValue(e.currentTarget.value)}} name="" id="" cols={30} rows={5}></textarea>
                </div>

                <div className="absolute left-0 bottom-0 flex flex-row bg-white gap-4 w-full p-4 border-t-2 border-blue-900">
                    <button className="p-4 bottom-2 bg-blue-900 text-white font-bold rounded-xl" onClick={() => {setRequestData(Math.random())}}>APLICAR</button>
                    <button className="p-4 bottom-2 right-2 bg-blue-900 text-white font-bold rounded-xl" onClick={() => {console.log(lines)}}>TESTAR</button>
                </div>
            </div>
        </div>
    );
}