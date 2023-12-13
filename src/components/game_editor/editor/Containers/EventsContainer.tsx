import { useEffect, useState } from "react";
import FunctionsContainer from "./FunctionsContainer";

interface EventsContainerProps{
    onClick: Function,
    requestData: number,
    index: number,
    setRequestData: Function,
    data: string
}

export default function EventsContainer(props: EventsContainerProps){

    const [name, setName] = useState<string>("");
    const [functions, setFunctions] = useState<number[]>([]);
    const [currentID, setCurrentID] = useState<number>(0)

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [currentFunction, setCurrentFunction] = useState<number>(-1);
    const [requestData, setRequestData] = useState<number>(-1);

    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        if(props.requestData != -1){
            setRequestData(Math.random());
        }
    }, [props.requestData])
    
    useEffect(() => {
        if(lines.length > 0){
            props.setRequestData(exportData(), props.index);
        }
    }, [lines])

    useEffect(() => {
        if(props.data != undefined){
            recoverData();
            setIsOpen(false);
        }
    }, [props.data])

    function exportData(){

        let data = "";

        lines.forEach(d => {
            data += d + "\n";
        })

        return (
            `event: ${name}\n${data}\nend_event`
        )
    }

    function recoverData(){
        let split_data = props.data.split("\n");

        let fun: number[] = [];
        let finalID = 0;

        for(var x = 1; x < split_data.length-1; x++){
            if(split_data[x] != ""){
                fun.push(finalID);
                finalID += 1;
            }
        }

        setName(split_data[0].replace("event: ", "").trim());
        setFunctions(fun);
        setCurrentID(finalID);
        setLines(split_data.slice(1, split_data.length-1));
    }

    function addFunction(){
        setFunctions([...functions, currentID]);
        setCurrentID(currentID+1);
    }

    function deleteFunction(){
        let indexItem = functions.indexOf(currentFunction);

        setLines((prev) => {
            let updated = [...prev]
            updated = updated.filter((_n, i) => i != indexItem)

            return updated;
        });

        setFunctions((prev) => {
            let updated = [...prev]
            updated = updated.filter(n => n != currentFunction)

            return updated;
        });
    }

    function getData(data: string, id: number){
        setLines((prev) =>{
            const updated = [...prev];
            updated[id] = data

            return updated;
        })
    }

    return(
        <div className="mt-4" onClick={() => {props.onClick()}}>
            <div className="flex flex-row gap-4">
                <input type="text" className="w-1/2 p-2 rounded-xl border-slate-400 border-2" placeholder="Nome" value={name} onClick={() => {setIsOpen(!isOpen)}} onChange={(e) => {setName(e.currentTarget.value)}} />
                <button className="w-14 p-4 bg-emerald-500 text-white font-bold rounded-full text-lg" onClick={() => {addFunction()}}>+</button>
                <button className="w-14 p-4 bg-emerald-500 text-white font-bold rounded-full text-lg" onClick={() => {deleteFunction()}}>-</button>
            </div>
            <div className="overflow-auto">
                {
                    functions.map((f, i) => {
                        return <FunctionsContainer key={f} onClick={() => {setCurrentFunction(f)}} isOpen={isOpen} index={i} requestData={requestData} setRequestData={getData} data={lines[i]} />
                    })
                }
            </div>
        </div>
    )
}