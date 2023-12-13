import { useEffect, useState } from "react";
import { resolveValue } from "../../editor_core";

interface StylesContainerProps{
    onClick: Function,
    requestData: number,
    index: number,
    setRequestData: Function,
    data: string
}

export default function stylesContainer(props: StylesContainerProps){

    const [name, setName] = useState<string>("");
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if(props.requestData != -1){
            props.setRequestData(exportData(), props.index);
        }
    }, [props.requestData])

    useEffect(() => {
        if(props.data != undefined){
            recoverData();
        }
    }, [props.data])

    function exportData(){

        const data = value.split("\n").map(l => {
            l = l.trim();
            let index_separator = l.indexOf("-");

            if(index_separator != -1)
                l = l.slice(0, index_separator) + l[index_separator+1].toUpperCase() + l.slice(index_separator+2, l.length-1)
            else 
                l = l.slice(0, l.length-1)

            if(l != ""){
                let splited = l.split(":");
                let cssValue = resolveValue(splited[1].trim());
    
                if(typeof cssValue == "string")
                    cssValue = `"${cssValue}"`
    
                return splited[0] + ": " + cssValue;
            }
        }).join("\n");

        return (
            `style: ${name}\n${data}\nend_style`
        );
        
    }

    function recoverData(){
        let split_data = props.data.split("\n");
        let style_data = "";
        
        for(var x = 1; x < split_data.length - 1; x++){
            style_data += resolveStyleData(split_data[x]);
        }
        
        setName(split_data[0].replace("style: ", "").trim());
        setValue(style_data);
    }

    function resolveStyleData(data: string){
        let founded = "";
        let replaceTo = "";

        if(data != ""){
            let data_splited = data.split(":");
    
            for(var x = 0; x < data_splited[0].length; x++){
                if(data_splited[0][x] != " " && data_splited[0][x] == data_splited[0][x].toUpperCase()){
                    founded = data_splited[0][x];
                    replaceTo = `-${data_splited[0][x].toLowerCase()}`
                }
            }
    
            data_splited[0] = data_splited[0].replace(founded, replaceTo);
            data_splited[1] = data_splited[1].trim();
    
            if(data_splited[1].startsWith("\"") && data_splited[1].endsWith("\""))
                data_splited[1] = data_splited[1].slice(1, data_splited[1].length-1)
    
            return data_splited.join(": ") + ";\n";
        }

        return "";
    }

    return(
        <div className="mt-4" onClick={() => {props.onClick()}}>
            <input type="text" className="w-full p-2 rounded-xl border-slate-400 border-2" placeholder="Nome" value={name} onChange={(e) => {setName(e.currentTarget.value)}} />
            <textarea className="w-full p-2 rounded-xl border-slate-400 border-2 mt-2 resize-none" placeholder="Estilo CSS" value={value} onChange={(e) => {setValue(e.currentTarget.value)}} name="" id="" cols={30} rows={5}></textarea>
        </div>
    )
}