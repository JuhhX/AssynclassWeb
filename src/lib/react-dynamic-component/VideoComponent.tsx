import { useState, useContext, useEffect, useRef } from "react"
import Draggable from "react-draggable";

import { GlobalContext } from "./FluidContext";

// import {PaintBucket, Square, DotsNine,
// ArrowsOutLineHorizontal, ArrowsInLineHorizontal, Copy, Trash, ArrowsOutCardinal, MonitorPlay, Lock, LockOpen} from "phosphor-react";
import {Square, Grip as DotsNine, PaintBucket, Copy, Airplay as MonitorPlay, Maximize2 as ArrowsOutLineHorizontal, Minimize2 as ArrowsInLineHorizontal, Lock, Unlock as LockOpen, Trash, Move as ArrowsOutCardinal} from 'lucide-react'

interface VideoComponentProps{
    id: number,
    text? : string,
    customStyles?: any,
    videoUrl?: string,
    x?: number,
    y?: number
}

export default function VideoComponent(props: VideoComponentProps){

    const [id] = useState<number>(props.id);
    const draggableRef = useRef<any>();
    const [videoURL, setVideoURL] = useState<string>((props.videoUrl == undefined) ? "" : props.videoUrl);
    const [videoURLToLoad, setVideoURLToLoad] = useState<string>((props.videoUrl == undefined) ? "" : props.videoUrl);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [videoLoaded, setVideoLoaded] = useState<boolean>((props.videoUrl == undefined) ? false : true);
    const [locked, setLocked] = useState<boolean>(false);

    const [colorMode, setColorMode] = useState<string>("");
    const {currentIDSelected, setCurrentIDSelected, setToRemove, color, setIsColorOpen, currentToSave, setCurrentData} = useContext(GlobalContext)

    const [customStyle, setCustomStyle] = useState(
        (props.customStyles == undefined) ? {
            borderColor: "#4169E1",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent"
        }
        : props.customStyles
    );
    const [videoStyle, setVideoStyle] = useState({
        width: 560,
        height: 315
    })

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
        }
    }, [color])

    useEffect(() => {
        if(currentToSave == id){
            saveContent();
        }
    }, [currentToSave])

    function saveContent(){
        if(videoLoaded){
            var toJSON = JSON.parse(getObject());
            setCurrentData(toJSON);
        }
    }

    function setBorderColor(color: string){
        setCustomStyle({...customStyle, borderColor: color})
    }
    
    function increaseWidth(){
        setVideoStyle({...videoStyle, width: videoStyle.width+10, height: videoStyle.height+10 })
    }
    
    function decreaseWidth(){
        setVideoStyle({...videoStyle, width: videoStyle.width-10, height: videoStyle.height-10 })
    }

    function requestColor(type : string){
        setIsColorOpen(true);
        setColorMode(type);
    }

    function getObject(){
        var exportComponent = `{
            "key": "${id}",
            "type": "video",
            "customStyles": ${JSON.stringify(customStyle)},
            "x": ${draggableRef.current.state.x},
            "y": ${draggableRef.current.state.y},
            "url": "${videoURLToLoad}"
        }`;

        return exportComponent;
    }

    function copyComponent(){

        navigator.clipboard.writeText(getObject());
    }

    function loadVideo(){
        let videoID = videoURL.replace("https://www.youtube.com/watch?v=", "");

        setVideoURLToLoad("https://www.youtube.com/embed/" + videoID)
        setVideoLoaded(true);
    }

    function resetVideoComponent(){
        setVideoURLToLoad("");
        setVideoURL("");
        setVideoLoaded(false);
    }

    return(
        <Draggable ref={draggableRef} defaultPosition={{x: (props.x == null) ? 100 : props.x, y: (props.y == null) ? 50 : props.y}} disabled={locked}>
            <div className={"w-fit z-[1] select-none absolute flex flex-row"} >
                <div style={customStyle} className={"bg-transparent border-2 rounded-lg overflow-auto relative ml-4"}>
                    {
                        (videoLoaded) ?
                        <iframe width={videoStyle.width} unselectable="off"  height={videoStyle.height} src={videoURLToLoad}></iframe>
                        : 
                        <div>
                            <input value={videoURL} onInput={(text : any) => {setVideoURL(text.target.value)}} className="p-2" placeholder="Url do video (Youtube)" />
                            <button className="bg-blue-300 p-2 hover:bg-blue-100 select-none" onClick={() => {loadVideo()}}>OK</button>
                        </div>
                    }
                    {
                        (!editMode) && <div onDoubleClick={() => {setCurrentIDSelected(id)}} className={"absolute w-full h-full -translate-y-full bg-transparent"} />
                    }
                </div>
                {
                    (editMode) &&
                    <div className="w-18 h-fit bg-slate-200 absolute -translate-x-full rounded-xl p-4 z-20">
                        <div className="flex flex-row justify-between p-2 gap-2">
                            <button className="hover:bg-slate-100" onClick={() => {requestColor("background")}}><PaintBucket size={24} /></button>
                            <button className="hover:bg-slate-100" onClick={() => {requestColor("border")}}><Square size={24} /></button>
                            <button className="hover:bg-slate-100" onClick={() => {setBorderColor("transparent")}} ><DotsNine size={24} /></button>
                        </div>
                        <div className="flex flex-row justify-between p-2 gap-2">
                            <button className="hover:bg-slate-100" onClick={() => {resetVideoComponent()}} ><MonitorPlay size={24} /></button>
                            <button className="hover:bg-slate-100" onClick={() => {increaseWidth()}} ><ArrowsOutLineHorizontal size={24} /></button>
                            <button className="hover:bg-slate-100" onClick={() => {decreaseWidth()}} ><ArrowsInLineHorizontal size={24} /></button>
                        </div>
                        <div className="flex flex-row justify-between p-2 gap-2">
                            <button className="hover:bg-slate-100" onClick={() => {setLocked(!locked)}} >{(locked) ? <Lock size={24} /> : <LockOpen size={24} />}</button>
                            <button className="hover:bg-slate-100" onClick={() => {copyComponent()}} ><Copy size={24} /></button>
                            <button className="hover:bg-slate-100" onClick={() => {setToRemove(id)}} ><Trash size={24} /></button>
                        </div>
                    </div>
                }
            </div>
        </Draggable>
    )
}