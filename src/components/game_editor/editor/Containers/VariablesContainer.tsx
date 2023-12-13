import { useEffect, useState } from "react";
import { resolveValue } from "../../editor_core";

interface VariablesContainerProps{
    id: number,
    index: number,
    onClick: Function,
    requestData: number
    setRequestData: Function,
    data: string
}

export default function VariablesContainer(props: VariablesContainerProps){

    const [name, setName] = useState<string>((props.data != undefined) ? props.data : "");
    const [value, setValue] = useState<string>((props.data != undefined) ? props.data : "");

    useEffect(() => {
        if(props.requestData != -1){
            props.setRequestData(exportData(), props.index);
        }
    }, [props.requestData])

    useEffect(() => {
        if(props.data != undefined)
            recoverData();
    }, [props.data])

    function exportData(){

        const resolvedValue = resolveValue(value);

        if(typeof resolvedValue == "string")
            return `var: ${name} = "${resolveValue(value)}"`
        return `var: ${name} = ${resolveValue(value)}`
    }

    function recoverData(){
        let split_values = props.data.split("=");
        
        if(split_values[1].startsWith("\"") && split_values[1].endsWith("\""))
            split_values[1] = split_values[1].slice(1, split_values[1].length-1)
        
        setName(split_values[0].replace("var: ", "").trim());
        setValue(split_values[1].trim())
    }

    return (
        <div className="flex flex-row h-16 p-2 gap-2" onClick={() => props.onClick()}>
            <input type="text" className="w-1/2 p-2 rounded-xl border-slate-400 border-2" placeholder="Nome" value={name} onChange={(e) => {setName(e.currentTarget.value)}} />
            <input type="text" className="w-1/2 p-2 rounded-xl border-slate-400 border-2" placeholder="Valor" value={value} onChange={(e) => {setValue(e.currentTarget.value)}} />
        </div>
    )
}