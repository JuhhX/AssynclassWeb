'use client'
import {createContext, useEffect, useState, useRef} from "react";

import TextComponent from "./TextComponent";
import SquareComponent from "./SquareComponent";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";
import CircleComponent from "./CircleComponent";

import { SketchPicker } from "react-color";
import TransformComponent from "./TransformComponent";
import PaintComponent from "./PaintComponent";

interface FluidContextProps{
    style?: string,
    addButton?: string,
    toUpload?: any,
    active?: boolean,
    onlyCopy?: boolean,
    getSavedPage?: Function,
    currentSave?: string,
    id?: string,
    linkedToPage?: number,
}

export const GlobalContext = createContext<any>("");

export default function FluidContext(props: FluidContextProps){

    const fluidContextRef = useRef<any>();
    const [toRemove, setToRemove] = useState<number>(1);
    const [overContext, setOverContext] = useState<boolean>(false);
    const [onlyCopy] = useState<boolean>((props.onlyCopy == undefined) ? false : props.onlyCopy);
    const [componentList, setComponentList] = useState<any[]>([]);
    const [currentIDSelected, setCurrentIDSelected] = useState<number>(1);

    const [currentToSave, setCurrentToSave] = useState();
    const [datasSaved, setDatasSaved] = useState<string[]>([]);
    const [currentData, setCurrentData] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [isColorOpen, setIsColorOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>("#4b0082");

    useEffect(() => {
        let generatedID = Math.random();

        //EXCLUSIVO PARA LOUSA DE CONTEUDOS
        if(props.id == props.currentSave){
            if(props.addButton?.includes("savePage")){
                if(currentIndex != 0)
                    setCurrentIndex(0);
                else
                    setCurrentToSave(componentList[currentIndex]?.key)
            }
        }

        if(props.active){

            if(props.addButton?.includes("text")){
                setComponentList([...componentList, <TextComponent onlyCopy={onlyCopy} key={generatedID} id={generatedID} />])
            }
            else if(props.addButton?.includes("image")){
                setComponentList([...componentList, <ImageComponent key={generatedID} id={generatedID} />])
            }
            else if(props.addButton?.includes("square")){
                setComponentList([...componentList, <SquareComponent key={generatedID} id={generatedID} />])
            }
            else if(props.addButton?.includes("circle")){
                setComponentList([...componentList, <CircleComponent key={generatedID} id={generatedID} />])
            }
            else if(props.addButton?.includes("paint")){
                setComponentList([...componentList, <PaintComponent key={generatedID} id={generatedID} />])
            }
            else if(props.addButton?.includes("video")){
                setComponentList([...componentList, <VideoComponent key={generatedID} id={generatedID} />])
            }
            else if(props.addButton?.includes("transform")){
                setComponentList([...componentList, <TransformComponent key={generatedID} id={generatedID} />])
            }
            //EVENTO PARA MONTAR O CONTEXTO EM JSON
            else if(props.addButton?.includes("saveCtx")){
                setCurrentToSave(componentList[currentIndex]?.key);
            }
            //EVENTO PARA BAIXAR O CONTEXTO EM JSON
            else if(props.addButton?.includes("download")){
                // console.log(datasSaved);
                const download = document.createElement('a');
    
                download.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(datasSaved)));
                download.setAttribute('download', `${new Date().getDate()}_${(new Date().getMonth()+1)}_${new Date().getFullYear()}.json`);
    
                download.style.display = 'none';
                document.body.appendChild(download);
    
                download.click();
    
                document.body.removeChild(download);
            }
        }
        
        setCurrentIDSelected(generatedID);
    }, [props.addButton]);

    useEffect(() => {

        let newList = componentList.filter((component : any) => component?.key != toRemove);
        setComponentList(newList);
       
        let newSave = datasSaved.filter((component : any) => component?.key != toRemove);
        setDatasSaved(newSave);

        setCurrentIndex(0);
    }, [toRemove])

    useEffect(() => {
        if(currentData != ""){
            setDatasSaved([...datasSaved, currentData])
            setCurrentIndex(currentIndex+1);
        }
    }, [currentData])
        
    useEffect(() => {
        try{
            //MANTEM OS ITENS UNICOS NO VETOR DATASAVED
            const uniqueArray = datasSaved.filter((item: any, index) => {
                return datasSaved.findIndex((obj : any) => obj?.key === item?.key) === index;
            });
            setDatasSaved(uniqueArray);

            setCurrentToSave(componentList[currentIndex]?.key);
        }catch(erro){}

        if(currentIndex == componentList.length && props.getSavedPage && props.id == props.currentSave){
            //SE O CONTEXTO INICIAR O PROCESSO DE SALVAMENTO, ENTÂO ELE É O ATUAL
            if(props.getSavedPage)
                    props.getSavedPage(datasSaved, props.linkedToPage);
        }

    }, [currentIndex])
    
    useEffect(() => {
        if(props.toUpload != null){

            
            props.toUpload.forEach((item : any) => {
                //SE O ID FICAR FORA DO LOOP OS COMPONENTES PODEM ACABAR RECEBENDO O MESMO ID
                let generatedID = Math.random();

                //OBRIGA O USESTATE A ATUALIZAR IMEDIATAMENTE
                setComponentList((prevComponentList) => [
                    ...prevComponentList,
                    <TransformComponent key={generatedID} onlyCopy={onlyCopy} id={generatedID} uploaded={item} />,
                ]);
            })

        }
    }, [props.toUpload])

    function verifyOver(e : any){
        if(e.target == fluidContextRef.current)
            setOverContext(true);
        else
            setOverContext(false);
    }

    function doubleClickEvent(){
        if(overContext){
            setCurrentIDSelected(-1000);
            setIsColorOpen(false);
        }
    }

    return (
        <GlobalContext.Provider value={{currentIDSelected, setCurrentIDSelected, setToRemove, color, setIsColorOpen, currentToSave, setCurrentData}}>    
            <div ref={fluidContextRef} onMouseOver={(e) => {verifyOver(e)}} onDoubleClick={() => {doubleClickEvent()}} className={props.style + " cursor-pointer select-none"}>
                {
                    componentList.map(item => {
                        return item;
                    })    
                }
            </div>
            {
                (isColorOpen) ?
                <div className="fixed right-2 bottom-2 z-10">
                    <SketchPicker color={color} onChangeComplete={(color : any) => {setColor(color.hex)}} />
                </div>
                : null
            }
        </GlobalContext.Provider>
    );
}

/**
<CustomComponent id={1} style={{padding: 4, borderWidth: 2, borderColor:"#4b0082", width: 350, borderRadius: 10}} actionButtons={{backgroundColor: true}}>
    
    <div>
        <p style={{fontWeight: "bold"}}>PORQUE ESCOLHER REACT?</p>
    </div>
    <div style={{width: "100%", textAlign: "right", padding: 4}}>
        <a href="" style={{fontSize: 14}}>Escrito por: Julio</a>
    </div>

</CustomComponent>
*/