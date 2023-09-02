import { useState, useContext, useEffect, useRef } from "react"
import Draggable from "react-draggable";

import { GlobalContext } from "./FluidContext";

// import {PaintBucket, Square, DotsNine, ArrowsOutLineHorizontal, ArrowsInLineHorizontal, Lock, LockOpen, Copy, Trash} from "phosphor-react";
import {PaintBucket, Square, Grip as DotsNine, Maximize2 as ArrowsOutLineHorizontal, Minimize2 as ArrowsInLineHorizontal, Lock, Unlock as LockOpen, Copy, Trash} from 'lucide-react'

interface CircleComponentProps{
    id: number,
    customStyles? : any,
    x?: number,
    y?: number,
}

export default function CircleComponent(props: CircleComponentProps){

    const [id] = useState<number>(props.id);
    const draggableRef = useRef<any>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [locked, setLocked] = useState<boolean>(false);
    const [colorMode, setColorMode] = useState<string>("");
    const {currentIDSelected, setCurrentIDSelected, setToRemove, color, setIsColorOpen, currentToSave, setCurrentData} = useContext(GlobalContext)
    const [customStyle, setCustomStyle] = useState(
        (props.customStyles == undefined) ? {
            borderColor: "#4169E1",
            width: 50,
            height: 50,
            backgroundColor: "transparent",
            borderRadius: "100px"
        } : props.customStyles
    );

    useEffect(() => {
        if(id == currentIDSelected)
            setEditMode(true);
        else
            setEditMode(false);
        
    }, [currentIDSelected])

    useEffect(() => {
        if(currentIDSelected == id){
            if(colorMode == "background")
                setCustomStyle({...customStyle, backgroundColor: color})
            else if(colorMode == "border")
                setCustomStyle({...customStyle, borderColor: color})
        }
    }, [color])

    useEffect(() => {
        if(currentToSave == id){
            saveContent();
        }
    }, [currentToSave])

    function saveContent(){
        var toJSON = JSON.parse(getObject());
        setCurrentData(toJSON);
    }

    function setBorderColor(color: string){
        setCustomStyle({...customStyle, borderColor: color})
    }
    
    function increaseWidth(){
        setCustomStyle({...customStyle, width: (customStyle.width)+10, height: (customStyle.height)+10})
    }

    function decreaseWidth(){
        setCustomStyle({...customStyle, width: (customStyle.width)-10, height: (customStyle.height)-10})
    }

    function requestColor(type : string){
        setIsColorOpen(true);
        setColorMode(type);
    }

    function getObject(){
        var exportComponent = `{
            "key": "${id}",
            "type": "circle", 
            "customStyles": ${JSON.stringify(customStyle)},
            "x": ${draggableRef.current.state.x},
            "y": ${draggableRef.current.state.y}
        }`;

        return exportComponent 
    }

    function copyComponent(){
        navigator.clipboard.writeText(getObject());
    }


    return(
        <Draggable ref={draggableRef} defaultPosition={{x: (props.x == null) ? 100 : props.x, y: (props.y == null) ? 50 : props.y}} disabled={locked}>
            <div className={"w-80 z-[1] absolute flex flex-row"} >
                <div style={customStyle} onClick={() => {setCurrentIDSelected(id)}} className={"bg-transparent border-2 rounded-lg overflow-auto ml-4"}>

                </div>
                {
                    (editMode) &&
                    <div className="w-18 h-fit bg-slate-200 absolute -translate-x-full rounded-xl p-4 z-20">
                        <div>
                            <div className="flex flex-row justify-between p-2 gap-2">
                                <button className="hover:bg-slate-100" onClick={() => {increaseWidth()}} ><ArrowsOutLineHorizontal size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {decreaseWidth()}} ><ArrowsInLineHorizontal size={24} /></button>
                            </div>
                            <div className="flex flex-row justify-between p-2 gap-2">
                                <button className="hover:bg-slate-100" onClick={() => {requestColor("background")}}><PaintBucket size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {requestColor("border")}}><Square size={24} /></button>
                            </div>
                            <div className="flex flex-row justify-between p-2 gap-2">
                                <button className="hover:bg-slate-100" onClick={() => {setBorderColor("transparent")}} ><DotsNine size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setLocked(!locked)}} >{(locked) ? <Lock size={24} /> : <LockOpen size={24} />}</button>
                            </div>
                            <div className="flex flex-row justify-between p-2 gap-2">
                                <button className="hover:bg-slate-100" onClick={() => {copyComponent()}} ><Copy size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setToRemove(id)}} ><Trash size={24} /></button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Draggable>
    )
}