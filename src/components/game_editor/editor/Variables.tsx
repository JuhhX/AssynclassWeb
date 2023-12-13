import { useEffect, useState } from "react";
import VariablesContainer from "./Containers/VariablesContainer";

import { Plus, Minus } from "lucide-react";

interface VariablesInterface{
    set: Function,
    data: string[]
}

export default function Variables(props: VariablesInterface){

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [variables, setVariables] = useState<number[]>([]);
    const [currentID, setCurrentID] = useState<number>(0)
    const [currentVariable, setCurrentVariable] = useState<number>(0);

    const [requestData, setRequestData] = useState<number>(-1);

    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        if(lines.length > 0)
            props.set(lines);
    }, [lines])

    useEffect(() => {
        if(props.data.length > 0){
            let vars: number[] = [];
            let finalID = 0;

            props.data.forEach(_l => {
                vars.push(finalID);
                finalID += 1;
            })

            setVariables(vars);
            setCurrentID(finalID);
            setLines(props.data);
        }
    }, [props.data])

    function addVariable(){
        if(!isOpen)
            setIsOpen(true);
        setVariables([...variables, currentID]);
        setCurrentID(currentID+1);
    }
    
    function deleteVariable(){
        if(!isOpen)
            setIsOpen(true);

        let indexItem = variables.indexOf(currentVariable);

        setLines((prev) => {
            let updated = [...prev]
            updated = updated.filter((_n, i) => i != indexItem)

            return updated;
        });

        setVariables((prev) => {
            let updated = [...prev]
            updated = updated.filter(n => n != currentVariable)

            return updated;
        });
    }

    function setCurrent(id: number){
        setCurrentVariable(id);
    }

    function getData(data: string, id: number){
        setLines((prev) =>{
            const updated = [...prev];
            updated[id] = data

            return updated;
        })
    }

    return (
        <div className={`w-full flex flex-col ${isOpen ? "h-full" : ""}`}>
            <div className="flex flex-row gap-4 justify-center">
                <button className="w-2/4 p-4 bg-blue-900 text-white font-bold rounded-xl" onClick={() => {setIsOpen(!isOpen)}}>VARIÁVEIS</button>
                <button className="w-14 p-4 bg-blue-900 text-white font-bold rounded-full text-lg" onClick={() => addVariable()}><Plus /></button>
                <button className="w-14 p-4 bg-blue-900 text-white font-bold rounded-full text-lg" onClick={() => deleteVariable()}><Minus /></button>
            </div>
            <div className={`w-4/5 h-3/4 border-2 border-azul rounded-xl mt-8 p-2 relative flex flex-col self-center ${(isOpen) ? "flex" : "hidden"} overflow-auto pb-28`}>
                <div className="overflow-auto">
                    {
                        variables.map((v, i) => {
                            return <VariablesContainer key={v} id={v} index={i} onClick={() => {setCurrent(v)}} requestData={requestData} setRequestData={getData} data={lines[i]} />
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