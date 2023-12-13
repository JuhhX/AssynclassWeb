import { useEffect, useState } from "react";

enum FunctionsTypes{
    SINGLE,
    USE_VARIABLE,
    USE_EVENT,
    CREATE,
    NULL
}

interface FunctionsContainerProps{
    onClick: Function,
    requestData: number,
    index: number,
    setRequestData: Function,
    data: string,
    isOpen: boolean
}

export default function FunctionsContainer(props: FunctionsContainerProps){

    const [value, setValue] = useState<string>("print");
    const [paramters, setParameters] = useState<string>("");
    const [structure, setStructure] = useState<string>("");
    const [functionType, setFunctionType] = useState<FunctionsTypes>(FunctionsTypes.SINGLE);

    const SINGLE = ["print", "alert", "clear", "delete", "call", "text", "imageurl", "input", "placeholder", "storetextin", "canmove", "onclick", "onmouseover", "onmouseout", "style", "posx", "posy", "connect", "clearstyle", "getname", "visible"];
    const USE_VARIABLE = ["sum", "sub", "mult", "div", "random", "randomf", "pow", "sqrt", "set", "concat"]
    const USE_EVENT = ["loop", "if", "timeout", "interval", "collision", "eventtarget"]
    const CREATE = ["new"]

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
        else if(CREATE.includes(type))
            setFunctionType(FunctionsTypes.CREATE);
        else
            setFunctionType(FunctionsTypes.NULL);

        setValue(type);
    }

    function exportData(){

        if(functionType == FunctionsTypes.SINGLE)
            return `${value}: ${paramters}`;
        else if(functionType == FunctionsTypes.USE_VARIABLE)
            return `${value}: ${paramters} > ${structure}`
        else if(functionType == FunctionsTypes.USE_EVENT)
            return `${value}: ${paramters} => ${structure}`
        else if(functionType == FunctionsTypes.CREATE){
            if(structure == "")
                return `${value}: ${paramters} => void`
            return `${value}: ${paramters} => ${structure}`
        }

        return "";
    }

    function recoverData(){
        // let data_splited = props.data.trim().split(":");
        let index = props.data.indexOf(":");
        let p = props.data.slice(0, index);
        let s = props.data.slice(index+1, props.data.length);

        defineType(p);
        
        if(s.includes("=>")){
            let split_structure = s.trim().split("=>");
            setParameters(split_structure[0].trim());
            setStructure(split_structure[1].trim());
        }
        else if(s.includes(">")){
            let split_structure = s.trim().split(">");
            setParameters(split_structure[0].trim());
            setStructure(split_structure[1].trim());
        }
        else
            setParameters(s.trim());
    }

    return (
        <>
            {
                props.isOpen &&
                <div className="border-2 border-emerald-500 rounded-xl mt-2 p-2" onClick={() => {props.onClick()}}>
                    <select name="" id="" className="w-full p-2 rounded-xl border-slate-400 border-2" value={value} onChange={(e) => {defineType(e.currentTarget.value)}}>
                        <option value="print">IMPRIMIR</option>
                        <option value="alert">ALERTAR</option>
                        <option value="clear">LIMPAR</option>
                        <option value="sum">SOMAR</option>
                        <option value="sub">SUBTRAIR</option>
                        <option value="mult">MULTIPLICAR</option>
                        <option value="div">DIVIDIR</option>
                        <option value="random">NÚMERO ALEATÓRIO (INTEIRO)</option>
                        <option value="randomf">NÚMERO ALEATÓRIO (DECIMAL)</option>
                        <option value="pow">EXPONENCIAÇÃO</option>
                        <option value="sqrt">RADICIAÇÃO</option>
                        <option value="set">DEFINIR VALOR</option>
                        <option value="concat">CONCATENAR</option>
                        <option value="loop">LOOP</option>
                        <option value="if">SE</option>
                        <option value="call">CHAMAR</option>
                        <option value="timeout">CHAMAR APÓS TEMPO</option>
                        <option value="interval">CHAMAR EM INTERVALO</option>
                        <option value="new">ADICIONAR COMPONENTE</option>
                        <option value="delete">REMOVER COMPONENTE</option>

                        <option value="text">TEXTO</option>
                        <option value="imageurl">URL DE IMAGEM</option>
                        <option value="input">ENTRADA</option>
                        <option value="placeholder">TEXTO DE FUNDO</option>
                        <option value="storetextin">GUARDAR TEXTO EM</option>
                        <option value="canmove">PODE MOVER</option>
                        <option value="visible">VISIVEL</option>
                        <option value="onclick">AO CLICAR</option>
                        <option value="onmouseover">MOUSE SOBRE</option>
                        <option value="onmouseout">MOUSE FORA</option>
                        <option value="style">ESTILO</option>
                        <option value="posx">POSIÇÃO EM X</option>
                        <option value="posy">POSIÇÃO EM Y</option>
                        <option value="connect">CONECTAR COM</option>
                        <option value="collision">COLISÃO</option>
                        <option value="eventtarget">DISPARAR EVENTO EM</option>
                        <option value="clearstyle">LIMPAR ESTILO</option>
                        <option value="getname">PEGAR NOME</option>
                    </select>

                    {
                        (functionType == FunctionsTypes.SINGLE) ?
                            <input type="text" className="w-full p-2 mt-4 rounded-xl border-slate-400 border-2" placeholder="Valor" value={paramters} onChange={(e) => {setParameters(e.currentTarget.value)}} />
                        : (functionType == FunctionsTypes.USE_VARIABLE) ?
                            <div className="flex flex-row gap-2">
                                <input type="text" className="w-full p-2 mt-4 rounded-xl border-slate-400 border-2" placeholder="Valores" value={paramters} onChange={(e) => {setParameters(e.currentTarget.value)}} />
                                <input type="text" className="w-full p-2 mt-4 rounded-xl border-slate-400 border-2" placeholder="Variável" value={structure} onChange={(e) => {setStructure(e.currentTarget.value)}} />
                            </div>
                        : (functionType == FunctionsTypes.USE_EVENT || functionType == FunctionsTypes.CREATE) ?
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