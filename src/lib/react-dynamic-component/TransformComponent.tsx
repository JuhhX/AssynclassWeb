import { useState, useContext, useEffect} from "react"
import Draggable from "react-draggable";

import { GlobalContext } from "./FluidContext";

// import { Clipboard, Trash} from "phosphor-react";
import {Clipboard, Trash} from 'lucide-react'

import TextComponent from "./TextComponent";
import SquareComponent from "./SquareComponent";
import CircleComponent from "./CircleComponent";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";

interface TransformComponentProps{
    id: number,
    uploaded?: any,
    onlyCopy?: boolean
}

export default function TransformComponent(props: TransformComponentProps){

    const [id] = useState<number>(props.id);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [model, setModel] = useState<any>(null);
    const {currentIDSelected, setCurrentIDSelected, setToRemove, color, setIsColorOpen} = useContext(GlobalContext)
    const [customStyle] = useState({
        borderColor: "#2E8B57",
        width: "50px",
        height: "50px",
        backgroundColor: "transparent"
    });

    useEffect(() => {
        if(id == currentIDSelected){
            setEditMode(true);
            setIsColorOpen(false);
        }
        else
            setEditMode(false);
        
    }, [currentIDSelected])

    useEffect(() => {
        if(props.uploaded != null){
            upload(props.uploaded)
        }
    }, [props.uploaded])

    function transform(){
        
        navigator.clipboard.readText().then(res => {
            console.log(res)
            let loadedModel = JSON.parse(res);
            loadedModel["x"] = null;
            loadedModel["y"] = null;

            setModel(loadedModel)
        });
    }

    function upload(data : any){
        setModel(data)
    }

    if(model == null){
        return(
            <Draggable defaultPosition={{x: 100, y: 50}}>
                <div className={"w-20 z-[1] absolute"} >
                    <div style={customStyle} onClick={() => {setCurrentIDSelected(id)}} className={"bg-transparent border-2 rounded-lg overflow-auto"}>
    
                    </div>
                    <div className="w-full h-full bg-slate-200">
                        {
                            (editMode) ? 
                            <div>
                                <div className="justify-around flex p-2">
                                    <button className="hover:bg-slate-100" onClick={() => {transform()}}><Clipboard size={24} /></button>
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
    else{
        if(model.type == "text"){
            return(
              <TextComponent key={id} id={id} text={model.text} onlyCopy={(props.onlyCopy == undefined) ? false : props.onlyCopy} customStyles={model.customStyles} textStyles={model.textStyles} x={model.x} y={model.y} />
            )
        }
        else if(model.type == "image"){
            return(
                <ImageComponent key={id} id={id} customStyles={model.customStyles} urlImage={model.image_url} x={model.x} y={model.y} imageStyles={model.imageStyle} />
            )
        }
        else if(model.type == "square"){
            return(
                <SquareComponent key={id} id={id} customStyles={model.customStyles} x={model.x} y={model.y} />
            )
        }
        else if(model.type == "circle"){
            return(
                <CircleComponent key={id} id={id} customStyles={model.customStyles} x={model.x} y={model.y} />
            )
        }
        else if(model.type == "video"){
            return(
                <VideoComponent key={id} id={id} customStyles={model.customStyles} videoUrl={model.url} x={model.x} y={model.y} />
            )
        }
        else{
            return(
                <Draggable defaultPosition={{x: 100, y: 50}}>
                    <div className={"w-20 z-[1]"} >
                        <div style={customStyle} onClick={() => {setCurrentIDSelected(id)}} className={"bg-transparent border-2 rounded-lg overflow-auto"}>
        
                        </div>
                        <div className="w-full h-full bg-slate-200">
                            {
                                (editMode) ? 
                                <div>
                                    <div className="justify-around flex p-2">
                                        <button className="hover:bg-slate-100" onClick={() => {transform()}}><Clipboard size={24} /></button>
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
    }
}