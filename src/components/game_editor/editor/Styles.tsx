import { useEffect, useState } from "react";
import StylesContainer from "./Containers/StylesContainer";
import { Plus, Minus } from "lucide-react";

interface StylesInterface{
    set: Function,
    data: string[]
}

export default function Styles(props: StylesInterface){

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [styles, setStyles] = useState<number[]>([]);
    const [currentID, setCurrentID] = useState<number>(0)

    const [currentStyle, setCurrentStyle] = useState<number>(-1);
    const [requestData, setRequestData] = useState<number>(-1);

    const [lines, setLines] = useState<string[]>(props.data);

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

            setStyles(sty);
            setCurrentID(finalID);
            setLines(props.data);
        }
    }, [props.data])

    function addStyle(){
        if(!isOpen)
            setIsOpen(true);
        setStyles([...styles, currentID]);
        setCurrentID(currentID+1);
    }

    function deleteStyle(){
        if(!isOpen)
            setIsOpen(true);

        let indexItem = styles.indexOf(currentStyle);

        setLines((prev) => {
            let updated = [...prev]
            updated = updated.filter((_n, i) => i != indexItem)

            return updated;
        });

        setStyles((prev) => {
            let updated = [...prev]
            updated = updated.filter(n => n != currentStyle)

            return updated;
        });
    }

    function setCurrent(id: number){
        setCurrentStyle(id);
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
                <button className="w-2/4 p-4 bg-blue-900 text-white font-bold rounded-xl" onClick={() => {setIsOpen(!isOpen)}}>ESTILOS</button>
                <button className="w-14 p-4 bg-blue-900 text-white font-bold rounded-full text-lg" onClick={() => {addStyle()}}><Plus /></button>
                <button className="w-14 p-4 bg-blue-900 text-white font-bold rounded-full text-lg" onClick={() => {deleteStyle()}}><Minus /></button>
            </div>
            <div className={`w-4/5 h-3/4 border-2 border-azul rounded-xl mt-8 p-2 relative flex flex-col self-center ${(isOpen) ? "flex" : "hidden"} overflow-auto gap-4`}>
                
                <div className="overflow-auto pb-28">
                    {
                        styles.map((e, i) => <StylesContainer key={e} index={i} onClick={() => { setCurrent(e); } } requestData={requestData} setRequestData={getData} data={lines[i]} />)
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