import { useState, useContext, useEffect, useRef } from "react"
import Draggable from "react-draggable";

import { GlobalContext } from "./FluidContext";

// import { Square, DotsNine, ArrowsOutLineHorizontal, ArrowsInLineHorizontal, Image, PlusCircle, MinusCircle, Lock, LockOpen, Trash, ArrowsOutLineVertical, ArrowsInLineVertical} from "phosphor-react";
import {Square, Grip as DotsNine, ChevronsLeftRight as ArrowsOutLineHorizontal, ChevronsRightLeft as ArrowsInLineHorizontal, Lock, Unlock as LockOpen, Trash, Image, PlusCircle, MinusCircle, ChevronsUpDown as ArrowsOutLineVertical, ChevronsDownUp as ArrowsInLineVertical} from 'lucide-react'

interface ImageComponentProps{
    id: number,
    urlImage? : string,
    customStyles?: any,
    imageStyles?: any,
    x?: number,
    y?: number
}

export default function ImageComponent(props: ImageComponentProps){
    
    const imageRef = useRef<any>();
    const draggableRef = useRef<any>();

    const [id] = useState<number>(props.id);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [locked, setLocked] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<string>("");
    const [colorMode, setColorMode] = useState<string>("");
    const {currentIDSelected, setCurrentIDSelected, setToRemove, color, setIsColorOpen, currentToSave, setCurrentData} = useContext(GlobalContext)
    const [imageStyle, setImageStyle] = useState(
        (props.imageStyles == undefined) ? {
            width: "100px",
            height: "100px"
        }
        : props.imageStyles
    );
    const [customStyle, setCustomStyle] = useState(
        (props.customStyles == undefined) ? {
            borderColor: "#4169E1",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent"
        }
        : props.customStyles
    );

    useEffect(() => {
        if(id == currentIDSelected)
            setEditMode(true);
        else
            setEditMode(false);
        
    }, [currentIDSelected])

    useEffect(() => {
        if(currentIDSelected == id){
            if(colorMode == "border")
               setCustomStyle({...customStyle, borderColor: color})
        }
    }, [color])

    useEffect(() => {
        if(currentToSave == id){
            saveContent();
        }
    }, [currentToSave])

    function setBorderColor(color: string){
        setCustomStyle({...customStyle, borderColor: color})
    }
    
    function increaseWidth(){
        setCustomStyle({...customStyle, width: (Number(customStyle.width.replace("%", ""))+10)+"%" })
        setImageStyle({...imageStyle, width: (Number(imageStyle.width.replace("px", ""))+10)+"%"})
    }
    
    function decreaseWidth(){
        setCustomStyle({...customStyle, width: (Number(customStyle.width.replace("%", ""))-10)+"%" })
        setImageStyle({...imageStyle, width: (Number(imageStyle.width.replace("px", ""))-10)+"%"})
    }

    function increaseHeight(){
        setCustomStyle({...customStyle, height: (Number(customStyle.height.replace("%", ""))+10)+"%" })
        setImageStyle({...imageStyle, height: (Number(imageStyle.height.replace("px", ""))+10)+"px"})
    }
    
    function decreaseHeight(){
        setCustomStyle({...customStyle, height: (Number(customStyle.height.replace("%", ""))-10)+"%" })
        setImageStyle({...imageStyle, height: (Number(imageStyle.height.replace("px", ""))-10)+"px"})
    }

    function getImageLoaded(e: any){
        if(e.target.files){
            console.log(e.target.value);
            setImageURL(URL.createObjectURL(e.target.files[0]))
            setImageLoaded(true);
        }
    }

    function addImageDimensions(){
        setImageStyle({...imageStyle, width: imageRef.current.clientWidth+"px", height: imageRef.current.clientHeight+"px"})
    }

    function increaseImageDimension(){
        setImageStyle({...imageStyle, width: (Number(imageStyle.width.replace("px", ""))+10)+"px",
        height: (Number(imageStyle.height.replace("px", ""))+10)+"px"})
    }

    function decreaseImageDimension(){
        setImageStyle({...imageStyle, width: (Number(imageStyle.width.replace("px", ""))-10)+"px",
        height: (Number(imageStyle.height.replace("px", ""))-10)+"px"})
    }

    function requestColor(type : string){
        setIsColorOpen(true);
        setColorMode(type);
    }

    function saveContent(){
        if(imageURL != ""){
            var toJSON = JSON.parse(getObject());
            setCurrentData(toJSON);
        }
    }

    function getObject(){
        var exportComponent = `{
            "key": "${id}",
            "type": "image", 
            "x": ${draggableRef.current.state.x},
            "y": ${draggableRef.current.state.y},
            "image_url": "${imageURL}",
            "customStyles": ${JSON.stringify(customStyle)},
            "imageStyle": ${JSON.stringify(imageStyle)}
        }`;
        return exportComponent
    }

    return(
        <Draggable ref={draggableRef} defaultPosition={{x: 100, y: 50}} disabled={locked}>
            <div className={"w-fit z-[1] absolute"} >
                <div style={customStyle} onClick={() => {setCurrentIDSelected(id)}} className={"bg-transparent border-2 rounded-lg overflow-auto"}>
                    {
                        (!imageLoaded) ?
                        <input type="file" accept=".jpeg,.png,.jpg" onChange={(e) => {getImageLoaded(e)}} />
                        : <img ref={imageRef} style={imageStyle} onLoad={() => {addImageDimensions()}} src={imageURL} className="select-none" draggable={false} />
                    }
                </div>
                <div className="w-full h-full bg-slate-200">
                    {
                        (editMode) ? 
                        <div>
                            <div className="justify-around flex p-2">
                                <button className="hover:bg-slate-100" onClick={() => {requestColor("border")}}><Square size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setBorderColor("transparent")}} ><DotsNine size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {increaseImageDimension()}} ><PlusCircle size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {decreaseImageDimension()}} ><MinusCircle size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setImageLoaded(false)}} ><Image size={24} /></button>
                            </div>
                            <div className="justify-around flex p-2">
                            <button className="hover:bg-slate-100" onClick={() => {increaseHeight()}} ><ArrowsOutLineVertical size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {decreaseHeight()}} ><ArrowsInLineVertical size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {increaseWidth()}} ><ArrowsOutLineHorizontal size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {decreaseWidth()}} ><ArrowsInLineHorizontal size={24} /></button>
                                <button className="hover:bg-slate-100" onClick={() => {setLocked(!locked)}} >{(locked) ? <Lock size={24} /> : <LockOpen size={24} />}</button>
                                <button className="hover:bg-slate-100" onClick={() => {setToRemove(id)}} ><Trash size={24} /></button>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        </Draggable>
    )

}