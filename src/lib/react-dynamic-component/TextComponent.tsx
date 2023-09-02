import { useState, useContext, useEffect, useRef } from "react"
import Draggable from "react-draggable";

import { GlobalContext } from "./FluidContext";

// import { ArrowUp, ArrowDown, TextAa, TextBolder, PaintBucket, Square, DotsNine,
// ArrowsOutLineHorizontal, ArrowsInLineHorizontal, Lock, LockOpen, Copy, Trash} from "phosphor-react";
import {ArrowUp, ArrowDown, Baseline as TextAa, Bold as TextBolder, PaintBucket, Square, Grip as DotsNine, ChevronsLeftRight as ArrowsOutLineHorizontal, ChevronsRightLeft as ArrowsInLineHorizontal, Lock, Unlock as LockOpen, Trash, Copy} from 'lucide-react'

import TextareaAutosize from 'react-textarea-autosize';

interface TextComponentProps{
    id: number,
    text? : string,
    customStyles?: any,
    textStyles?: any,
    x?: number,
    y?: number,
    onlyCopy?: boolean,
}

export default function TextComponent(props: TextComponentProps){

    const [id] = useState<number>(props.id);
    const draggableRef = useRef<any>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [onlyCopy] = useState<boolean>(props.onlyCopy == undefined ? false : props.onlyCopy);
    const [currentText, setCurrentText] = useState<string>((props.text == undefined) ? "" : props.text);
    const [colorMode, setColorMode] = useState<string>("");
    const {currentIDSelected, setCurrentIDSelected, setToRemove, color, setIsColorOpen, currentToSave, setCurrentData} = useContext(GlobalContext)
    const [locked, setLocked] = useState((props.onlyCopy == undefined) ? true : onlyCopy);
    const [textStyle, setTextStyle] = useState(
        (props.textStyles == undefined) ? {
            fontSize: 16,
            fontWeight: "normal",
            color: "black"
        }
        : props.textStyles
    );
    const [customStyle, setCustomStyle] = useState(
        (props.customStyles == undefined) ? {
            borderColor: "#4169E1",
            width: 350,
            backgroundColor: "transparent"
        }
        : props.customStyles
    );

    useEffect(() => {
        if(id == currentIDSelected){
            setEditMode(true);
            setIsColorOpen(false);
        }
        else
            setEditMode(false);
        
    }, [currentIDSelected])

    useEffect(() => {
        if(currentIDSelected == id){
            if(colorMode == "background")
                setCustomStyle({...customStyle, backgroundColor: color})
            else if(colorMode == "border")
                setCustomStyle({...customStyle, borderColor: color})
            else if(colorMode == "text")
                setTextStyle({...textStyle, color: color})
        }
    }, [color])

    useEffect(() => {
        if(currentToSave == id){
            saveContent();
        }
    }, [currentToSave])

    function saveContent(){
        if(currentText != ""){
            var toJSON = JSON.parse(getObject());
            setCurrentData(toJSON);
        }
    }

    function increaseLetter(){
        setTextStyle({...textStyle, fontSize: textStyle.fontSize + 2});
    }
    
    function decreaseLetter(){
        setTextStyle({...textStyle, fontSize: textStyle.fontSize - 2})
    }
    
    function setBoldLetter(){
        setTextStyle({...textStyle, fontWeight: (textStyle.fontWeight == "normal") ? "bold" : "normal"})
    }

    function setBorderColor(color: string){
        setCustomStyle({...customStyle, borderColor: color})
    }
    
    function increaseWidth(){
        setCustomStyle({...customStyle, width: (customStyle.width+10)})
    }

    function decreaseWidth(){
        setCustomStyle({...customStyle, width: (customStyle.width-10)})
    }

    function requestColor(type : string){
        setIsColorOpen(true);
        setColorMode(type);
    }

    function getObject(){
        var exportComponent = `{
            "key": "${id}",
            "type": "text", 
            "x": ${draggableRef.current.state.x},
            "y": ${draggableRef.current.state.y},
            "text": "${currentText.replaceAll('\n', '\\n')}",
            "customStyles": ${JSON.stringify(customStyle)},
            "textStyles": ${JSON.stringify(textStyle)}
        }`;
        return exportComponent
    }

    function copyComponent(){
        navigator.clipboard.writeText(getObject());
    }

    return(
        <Draggable positionOffset={{x: 0, y: 0}} defaultPosition={{x: (props.x == null) ? 100 : props.x, y: (props.y == null) ? 50 : props.y}} ref={draggableRef} disabled={locked}>
            <div style={{width: customStyle.width}} className={"w-80 z-[1] absolute flex flex-row"} >
                <div style={customStyle} className={"bg-transparent border-2 rounded-lg overflow-auto ml-4"}>
                    {
                        (editMode) ?
                        <TextareaAutosize className="w-full p-2 overflow-hidden h-10 resize-none bg-transparent" style={textStyle} value={currentText} onInput={(text : any) => {setCurrentText(text.target.value)}} placeholder="Escreva algo ..." />
                        : <p style={textStyle} onClick={() => {setCurrentIDSelected(id);}} className={"select-none text-left m-2 whitespace-pre-line"}>{(currentText == "") ? "Clique para editar" : currentText}</p>
                    }
                </div>
                {
                    //AJUSTAR PARA ACEITAR CÓPIAS
                    (editMode) ?
                        (onlyCopy) ?
                        <div className="w-18 h-fit bg-slate-200 absolute -translate-x-full rounded-xl p-4 z-20">
                            <button className="hover:bg-slate-100" onClick={() => {copyComponent()}} ><Copy size={24} /></button>
                        </div>
                        :
                        <div className="w-18 h-fit bg-slate-200 absolute -translate-x-full rounded-xl p-4 z-20">
                            <div className="flex flex-row justify-between p-2 gap-2">
                                <button className="hover:bg-slate-100" onClick={() => {increaseLetter()}}><ArrowUp size={24} /></button>
                                <p>{textStyle.fontSize}</p>
                                <button className="hover:bg-slate-100" onClick={() => {decreaseLetter()}}><ArrowDown size={24} /></button>
                            </div>
                            <div className="flex flex-row justify-between p-2">
                                <button className="hover:bg-slate-100" onClick={() => {requestColor("text")}}><TextAa size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setBoldLetter()}}><TextBolder size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {requestColor("background")}}><PaintBucket size={24} /></button>
                            </div>
                            <div className="flex flex-row justify-center p-2 gap-2">
                                <button className="hover:bg-slate-100" onClick={() => {requestColor("border")}}><Square size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setBorderColor("transparent")}} ><DotsNine size={24} /></button>
                            </div>
                            <div className="flex flex-row justify-center p-2 gap-2">
                                <button className="hover:bg-slate-100" onClick={() => {increaseWidth()}} ><ArrowsOutLineHorizontal size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {decreaseWidth()}} ><ArrowsInLineHorizontal size={24} /></button>
                            </div>
                            <div className="flex flex-row justify-between p-2">
                                <button className="hover:bg-slate-100" onClick={() => {setLocked(!locked)}} >{(locked) ? <Lock size={24} /> : <LockOpen size={24} />}</button>
                                <button className="hover:bg-slate-100" onClick={() => {copyComponent()}} ><Copy size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setToRemove(id)}} ><Trash size={24} /></button>
                            </div>
                        </div>
                    : null
                }
            </div>
        </Draggable>
    )
}