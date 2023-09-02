import { useState, useContext, useEffect, useRef } from "react"
import Draggable from "react-draggable";

import { GlobalContext } from "./FluidContext";

// import { Square, DotsNine, ArrowsOutLineHorizontal, ArrowsInLineHorizontal, Lock, LockOpen, Trash, ArrowsOutLineVertical, ArrowsInLineVertical, ArrowsOutCardinal, PencilSimpleLine, Eraser, PlusCircle, MinusCircle } from "phosphor-react";
import {Square, Grip as DotsNine, ChevronsDownUp as ArrowsOutLineHorizontal, ChevronsUpDown as ArrowsInLineHorizontal, Lock, Unlock as LockOpen, Trash, Pencil as PencilSimpleLine, Eraser, PlusCircle, MinusCircle, Move as ArrowsOutCardinal, ArrowLeftRight as ArrowsOutLineVertical, ArrowRightLeft as ArrowsInLineVertical} from 'lucide-react'

interface PaintComponent{
    id: number,
    customStyles?: any,
    x?: number,
    y?: number
}

export default function PaintComponent(props: PaintComponent){
    
    const draggableRef = useRef<any>();

    const canvasRef = useRef<any>(null);
    const ctxRef = useRef<any>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const [drawMode, setDrawMode] = useState<string>("pen");

    const [id] = useState<number>(props.id);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [locked, setLocked] = useState<boolean>(false);
    const [colorMode, setColorMode] = useState<string>("");
    const {currentIDSelected, setCurrentIDSelected, setToRemove, color, setIsColorOpen} = useContext(GlobalContext)
    const [customStyle, setCustomStyle] = useState(
        (props.customStyles == undefined) ? {
            borderColor: "#4169E1",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent"
        }
        : props.customStyles
    );
    const [canvasStyle, setCanvasStyle] = useState({
        width: "426px",
        height: "240px",
        lineColor: "black",
        lineWidth: 4
    })

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = canvasStyle.lineColor;
        ctx.lineWidth = canvasStyle.lineWidth;
        ctxRef.current = ctx;
    }, [canvasStyle.lineColor, canvasStyle.lineWidth]);
    

    useEffect(() => {
        if(id == currentIDSelected){
            setEditMode(true);
            setLocked(true)
        }
        else{
            setEditMode(false);
            setLocked(false)
        }
        
    }, [currentIDSelected])

    useEffect(() => {
        if(currentIDSelected == id){
            if(colorMode == "border")
               setCustomStyle({...customStyle, borderColor: color})
            else if(colorMode == "pencil")
               setCanvasStyle({...canvasStyle, lineColor: color})

        }
    }, [color])

    function setBorderColor(color: string){
        setCustomStyle({...customStyle, borderColor: color})
    }
    
    function increaseWidth(){
        setCanvasStyle({
            width: (Number(canvasStyle.width.replace('px', ''))+20)+'px',
            height: (Number(canvasStyle.height.replace('px', ''))+15)+'px',
            lineColor: canvasStyle.lineColor,
            lineWidth: canvasStyle.lineWidth
        })
    }
    
    function decreaseWidth(){
        setCanvasStyle({
            width: (Number(canvasStyle.width.replace('px', ''))-20)+'px',
            height: (Number(canvasStyle.height.replace('px', ''))-15)+'px',
            lineColor: canvasStyle.lineColor,
            lineWidth: canvasStyle.lineWidth
        })
    }
    
    function increasePenSize(){
        setCanvasStyle({...canvasStyle, lineWidth: canvasStyle.lineWidth+2})
    }
    
    function decreasePenSize(){
        if(canvasStyle.lineWidth-2 > 0)
            setCanvasStyle({...canvasStyle, lineWidth: canvasStyle.lineWidth-2})
        
    }

    function requestColor(type : string){
        setIsColorOpen(true);
        setColorMode(type);
    }

    function startDrawing(e: any){
        if (locked){
            ctxRef.current.beginPath();
            ctxRef.current.moveTo(
                e.nativeEvent.offsetX, 
                e.nativeEvent.offsetY
            );
            setIsDrawing(true);
        }
    };
  
    function endDrawing(){
        ctxRef.current.closePath();
        setIsDrawing(false);
    };
  
    function draw(e : any){
        if (!isDrawing) {
            return;
        }
        if(drawMode == "pen"){
            ctxRef.current.globalCompositeOperation="source-over";
            ctxRef.current.lineTo(
                e.nativeEvent.offsetX, 
                e.nativeEvent.offsetY
            );
                
            ctxRef.current.stroke();
        }
        else{
            ctxRef.current.globalCompositeOperation="destination-out";
            ctxRef.current.lineTo(
                e.nativeEvent.offsetX, 
                e.nativeEvent.offsetY
            );
            ctxRef.current.stroke();
        }

    };

    return(
        <Draggable ref={draggableRef} defaultPosition={{x: 100, y: 50}} disabled={locked} >
            <div className={"w-fit z-[1] absolute flex flex-row"} >
                <div style={customStyle} onClick={() => {setCurrentIDSelected(id)}} className={"bg-transparent border-2 rounded-lg overflow-auto ml-4 z-10"}>
                    {
                        <canvas 
                            onMouseDown={startDrawing}
                            onMouseUp={endDrawing}
                            onMouseMove={draw}
                            ref={canvasRef}
                            width={canvasStyle.width}
                            height={canvasStyle.height}
                        ></canvas>
                    }
                </div>
                {
                    (editMode) && 
                    <div className="w-18 h-fit bg-slate-200 absolute -translate-x-full rounded-xl p-4 z-20">
                        <div>
                            <div className="flex flex-row justify-between p-2">
                                <button className={`hover:bg-slate-100`} onClick={() => {requestColor("pencil"); setDrawMode("pen")}}><PencilSimpleLine size={24} /></button>
                                <button className={`hover:bg-slate-100`} onClick={() => {setDrawMode("eraser")}}><Eraser size={24} /></button>
                            </div>
                            <div className="flex flex-row justify-between p-2 gap-2">
                                <button className="hover:bg-slate-100" onClick={() => {increasePenSize()}}><PlusCircle size={24} /></button>
                                <p>{canvasStyle.lineWidth}</p>
                                <button className="hover:bg-slate-100" onClick={() => {decreasePenSize()}}><MinusCircle size={24} /></button>
                            </div>
                            <div className="justify-between flex p-2">
                                <button className="hover:bg-slate-100" onClick={() => {requestColor("border")}}><Square size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setBorderColor("transparent")}} ><DotsNine size={24} /></button>
                            </div>
                            <div className="flex flex-row justify-between p-2">
                                <button className="hover:bg-slate-100" onClick={() => {increaseWidth()}} ><ArrowsOutLineHorizontal size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {decreaseWidth()}} ><ArrowsInLineHorizontal size={24} /></button>

                            </div>
                            <div className="justify-between p-2 flex flex-row">
                                <button className="hover:bg-slate-100" onClick={() => {setLocked(!locked)}} >{(locked) ? <Lock size={24} /> : <LockOpen size={24} />}</button>
                                <button className="hover:bg-slate-100" onClick={() => {setToRemove(id)}} ><Trash size={24} /></button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Draggable>
    )

}