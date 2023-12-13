import { useEffect, useState } from "react";

enum FunctionsTypes{
    SINGLE,
    USE_VARIABLE,
    USE_EVENT,
    CREATE,
    NULL
}

interface PropertiesContainerProps{
    onClick: Function,
    requestData: number,
    index: number,
    setRequestData: Function,
    data: string
    isOpen: boolean
}

export default function PropertiesContainer(props: PropertiesContainerProps){

    const [value, setValue] = useState<string>("text");
    const [paramters, setParameters] = useState<string>("");
    const [structure, setStructure] = useState<string>("");
    const [functionType, setFunctionType] = useState<FunctionsTypes>(FunctionsTypes.SINGLE);

    const SINGLE = ["text", "imageurl", "input", "placeholder", "storetextin", "canmove", "onclick", "onmouseover", "onmouseout", "style", "posx", "posy", "connect", "call", "visible"];
    const USE_VARIABLE = ["linkedto"]
    const USE_EVENT = ["if", "timeout", "interval", "collision"]

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

    function defineType(type: string){

        if(SINGLE.includes(type))
            setFunctionType(FunctionsTypes.SINGLE);
        else if(USE_VARIABLE.includes(type))
            setFunctionType(FunctionsTypes.USE_VARIABLE);
        else if(USE_EVENT.includes(type))
            setFunctionType(FunctionsTypes.USE_EVENT);
        else
            setFunctionType(FunctionsTypes.NULL);

        setValue(type);
    }

    function exportData(){

        if(functionType == FunctionsTypes.SINGLE)
            return `${value}: ${paramters}`;
        else if(functionType == FunctionsTypes.USE_VARIABLE)
            return `${value}: ${paramters} = ${structure}`
        else if(functionType == FunctionsTypes.USE_EVENT)
            return `${value}: ${paramters} => ${structure}`

        return "";
    }

    function recoverData(){
        let data_splited = props.data.trim().split(":");

        defineType(data_splited[0]);
        
        try{
            if(data_splited[1].includes(">")){
                let split_structure = data_splited[1].trim().split(">");
                setParameters(split_structure[0].trim());
                setStructure(split_structure[1].trim());
            }
            else if(data_splited[1].includes("=>")){
                let split_structure = data_splited[1].trim().split("=>");
                setParameters(split_structure[0].trim());
                setStructure(split_structure[1].trim());
            }
            else{
                if(data_splited.length == 3)
                    setParameters(data_splited[1].trim()+":"+data_splited[2].trim());
                else
                    setParameters(data_splited[1].trim());
            }
        }catch{}
    }

    return (
        <>
        {
            props.isOpen &&
            
            <div className="border-2 border-emerald-500 rounded-xl mt-2 p-2" onClick={() => {props.onClick()}}>
                <select name="" id="" className="w-full p-2 rounded-xl border-slate-400 border-2" value={value} onChange={(e) => {defineType(e.currentTarget.value)}}>
                    <option value="text">TEXTO</option>
                    <option value="imageurl">URL DE IMAGEM</option>
                    <option value="input">ENTRADA</option>
                    <option value="placeholder">TEXTO DE FUNDO</option>
                    <option value="storetextin">GUARDAR TEXTO EM</option>
                    <option value="canmove">PODE MOVER</option>
                    <option value="onclick">AO CLICAR</option>
                    <option value="onmouseover">MOUSE SOBRE</option>
                    <option value="onmouseout">MOUSE FORA</option>
                    <option value="style">ESTILO</option>
                    <option value="posx">POSIÇÃO EM X</option>
                    <option value="posy">POSIÇÃO EM Y</option>
                    <option value="connect">CONECTAR COM</option>
                    <option value="collision">COLISÃO</option>
                    <option value="linkedto">VARIÁVEL LOCAL</option>
                    <option value="visible">VISIVEL</option>
                    <option value="if">SE</option>
                    <option value="call">CHAMAR</option>
                    <option value="timeout">CHAMAR APÓS TEMPO</option>
                    <option value="interval">CHAMAR EM INTERVALO</option>
                </select>

                {
                    (functionType == FunctionsTypes.SINGLE) ?
                        <input type="text" className="w-full p-2 mt-4 rounded-xl border-slate-400 border-2" placeholder="Valor" value={paramters} onChange={(e) => {setParameters(e.currentTarget.value)}} />
                    : (functionType == FunctionsTypes.USE_VARIABLE) ?
                        <div className="flex flex-row gap-2">
                            <input type="text" className="w-full p-2 mt-4 rounded-xl border-slate-400 border-2" placeholder="Variável" value={paramters} onChange={(e) => {setParameters(e.currentTarget.value)}} />
                            <input type="text" className="w-full p-2 mt-4 rounded-xl border-slate-400 border-2" placeholder="Valor" value={structure} onChange={(e) => {setStructure(e.currentTarget.value)}} />
                        </div>
                    : (functionType == FunctionsTypes.USE_EVENT) ?
                        <div className="flex flex-row gap-2">
                            <input type="text" className="w-full p-2 mt-4 rounded-xl border-slate-400 border-2" placeholder="Valores" value={paramters} onChange={(e) => {setParameters(e.currentTarget.value)}} />
                            <input type="text" className="w-full p-2 mt-4 rounded-xl border-slate-400 border-2" placeholder="Evento" value={structure} onChange={(e) => {setStructure(e.currentTarget.value)}} />
                        </div>
                    :   null
                }
            </div>
        }
        </>
        
    );
}