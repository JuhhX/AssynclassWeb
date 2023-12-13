import { useEffect, useState } from "react";
import PropertiesContainer from "./PropertiesContainer";

interface ComponentsContainerProps{
    onClick: Function,
    requestData: number,
    index: number,
    setRequestData: Function,
    model: boolean,
    data: string
}

export default function ComponentsContainer(props: ComponentsContainerProps){

    const [name, setName] = useState<string>("");
    const [properties, setProperties] = useState<number[]>([]);
    const [currentID, setCurrentID] = useState<number>(0);

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [currentProperty, setCurrentProperty] = useState<number>(-1);
    const [requestData, setRequestData] = useState<number>(-1);

    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        if(props.requestData != -1){
            setRequestData(Math.random());
        }
    }, [props.requestData]);
    
    useEffect(() => {
        if(lines.length > 0){
            props.setRequestData(exportData(), props.index);
        }
    }, [lines])

    useEffect(() => {
        if(props.data != undefined){
            recoverData();
            //setIsOpen(false);
        }
    }, [props.data])

    function exportData(){

        let data = "";

        lines.forEach(d => {
            data += d + "\n";
        })

        if(props.model)
            return (
                `model: ${name}\n${data}\nend_model`
            )
        return (
            `component: ${name}\n${data}\nend_component`
        )
    }

    function recoverData(){
        let split_data = props.data.split("\n");

        let pro: number[] = [];
        let finalID = 0;

        for(var x = 1; x < split_data.length-1; x++){
            if(split_data[x] != ""){
                pro.push(finalID);
                finalID += 1;
            }
        }

        setName(split_data[0].replace("component: ", "").replace("model: ", "").trim());
        setProperties(pro);
        setCurrentID(finalID);
        setLines(split_data.slice(1, split_data.length-1).filter(n => n != ""));
    }

    function addFunction(){
        setProperties([...properties, currentID]);
        setCurrentID(currentID+1);
    }

    function deleteFunction(){
        let indexItem = properties.indexOf(currentProperty);

        setLines((prev) => {
            let updated = [...prev]
            updated = updated.filter((_n, i) => i != indexItem)

            return updated.filter(n => n != "");
        });

        setProperties((prev) => {
            let updated = [...prev]
            updated = updated.filter(n => n != currentProperty)

            return updated;
        });
    }

    function getData(data: string, id: number){
        if(data != ""){
            setLines((prev) =>{
                const updated = [...prev];
                updated[id] = data
    
                return updated.filter(n => n != "");
            })
        }
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
                    properties.map((f, i) => {
                        return <PropertiesContainer key={f} onClick={() => {setCurrentProperty(f)}} index={i} isOpen={isOpen} requestData={requestData} setRequestData={getData} data={lines[i]} />
                    })
                }
            </div>
        </div>
    )
}