import { ReactNode, useState, useEffect, useContext } from "react";
import Draggable from "react-draggable";

import { GlobalContext } from "./FluidContext";
import { ArrowUp, ArrowDown, TextAa, TextBolder, PaintBucket, Square, DotsNine,
    ArrowsOutLineHorizontal, ArrowsInLineHorizontal, Lock, LockOpen, Copy, Trash, ArrowsOutLineVertical, ArrowsInLineVertical,
    MonitorPlay, Image, PlusCircle, MinusCircle} from "phosphor-react";

interface CustomComponentProps{
    id: number,
    children?: ReactNode,
    className?: string,
    style?: any,
    actionButtons: ActionButtons | null
}

interface ActionButtons{
    increaseLetter?: boolean,
    decreaseLetter?: boolean,
    fontWeight?: boolean,
    textColor?: boolean,
    backgroundColor?: boolean,
    borderColor?: boolean,
    noBorder?: boolean,
    increaseWidth?: boolean,
    increaseHeight?: boolean,
    decreaseWidth?: boolean,
    decreaseHeight?: boolean,
    lockPosition?: boolean,
    copyComponent?: boolean,
    chooseImage?: boolean,
    increaseImageScale?: boolean,
    decreaseImageScale?: boolean,
    chooseVideo?: boolean
}

export default function CustomComponent(props: CustomComponentProps){

    const [id, setID] = useState<number>(props.id);
    const [editMode, setEditMode] = useState<boolean>(false);
    const {currentIDSelected, setCurrentIDSelected, setToRemove, color, setIsColorOpen} = useContext(GlobalContext)

    useEffect(() => {
        if(id == currentIDSelected){
            setEditMode(true);
            setIsColorOpen(false);
        }
        else
            setEditMode(false);
        
    }, [currentIDSelected])


    return(
        <Draggable defaultPosition={{x: 100, y: 50}}>
            <div onClick={() => {setCurrentIDSelected(id)}} style={{width: props.style.width}}>
                <div style={props.style}>
                    {
                        props.children
                    }
                </div>
                <div className="w-full h-full bg-slate-200">
                    {
                        (editMode) ? 
                        <div>
                            {(props.actionButtons?.increaseLetter) ? <button className="hover:bg-slate-100" onClick={() => {}}><ArrowUp size={24} /></button> : null}
                            {(props.actionButtons?.decreaseLetter) ? <button className="hover:bg-slate-100" onClick={() => {}}><ArrowDown size={24} /></button> : null}
                            {(props.actionButtons?.fontWeight) ? <button className="hover:bg-slate-100" onClick={() => {}}><TextBolder size={24} /></button> : null}
                            {(props.actionButtons?.textColor) ? <button className="hover:bg-slate-100" onClick={() => {}}><TextAa size={24} /></button> : null}
                            {(props.actionButtons?.backgroundColor) ? <button className="hover:bg-slate-100" onClick={() => {}}><PaintBucket size={24} /></button> : null}
                            {(props.actionButtons?.borderColor) ? <button className="hover:bg-slate-100" onClick={() => {}}><Square size={24} /></button> : null}
                            {(props.actionButtons?.noBorder) ? <button className="hover:bg-slate-100" onClick={() => {}}><DotsNine size={24} /></button> : null}
                            {(props.actionButtons?.increaseWidth) ? <button className="hover:bg-slate-100" onClick={() => {}}><ArrowsOutLineHorizontal size={24} /></button> : null}
                            {(props.actionButtons?.decreaseWidth) ? <button className="hover:bg-slate-100" onClick={() => {}}><ArrowsInLineHorizontal size={24} /></button> : null}
                            {(props.actionButtons?.increaseHeight) ? <button className="hover:bg-slate-100" onClick={() => {}}><ArrowsOutLineVertical size={24} /></button> : null}
                            {(props.actionButtons?.decreaseHeight) ? <button className="hover:bg-slate-100" onClick={() => {}}><ArrowsInLineVertical size={24} /></button> : null}
                            {(props.actionButtons?.lockPosition) ? <button className="hover:bg-slate-100" onClick={() => {}}>{(true) ? <Lock size={24} /> : <LockOpen size={24} />}</button> : null}
                            {(props.actionButtons?.copyComponent) ? <button className="hover:bg-slate-100" onClick={() => {}}><Copy size={24} /></button> : null}
                            {(props.actionButtons?.chooseImage) ? <button className="hover:bg-slate-100" onClick={() => {}}><Image size={24} /></button> : null}
                            {(props.actionButtons?.increaseImageScale) ? <button className="hover:bg-slate-100" onClick={() => {}}><PlusCircle size={24} /></button> : null}
                            {(props.actionButtons?.decreaseImageScale) ? <button className="hover:bg-slate-100" onClick={() => {}}><MinusCircle size={24} /></button> : null}
                            {(props.actionButtons?.chooseVideo) ? <button className="hover:bg-slate-100" onClick={() => {}}><MonitorPlay size={24} /></button> : null}
                           
                            <button className="hover:bg-slate-100" onClick={() => {() => {setToRemove(id)}}} ><Trash size={24} /></button>
                           
                        </div>
                        : null
                    }
                </div>
            </div>
        </Draggable>
    );

}