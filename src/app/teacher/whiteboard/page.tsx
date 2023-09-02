'use client'

import { SideBar } from "@/components/SideBar";
import usePress from "@/lib/react-dynamic-component/CustomHooks";
import FluidContext from "@/lib/react-dynamic-component/FluidContext";
import {Type, Image, Circle, Square, Atom, Video, AppWindow, Download, Upload} from 'lucide-react'
import { useRef, useState } from "react";

export default function TeacherWhiteBoard() {

    const [value, setValue] = usePress();
    const [uploaded, setUploaded] = useState<any>(null);
    const fileRef = useRef<any>();

    function buildAndDownload(){
      setValue("saveCtx");
      setTimeout(() => {
        setValue("download")
      }, 5000)
    }

    function readFile(){
      fileRef.current.click();
    }

    function openFile(e : any){
      let reader = new FileReader();
      
      reader.readAsText(e.target.files[0]);
      
      let contentRead; 
      reader.onload = function() {
        contentRead = JSON.parse(reader.result + "")
        setUploaded(contentRead)
      };
    }

    return (
      <main className="h-screen overflow-auto w-full flex flex-col">

        <FluidContext style={'w-full h-screen select-none'} active={true} addButton={value} toUpload={uploaded} />

        <div className="flex flex-row bg-cinza w-fit p-2 px-4 absolute bottom-4 self-center rounded-xl justify-center gap-4">
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("text")}><Type size={32} color="white" /></button>
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("image")}><Image size={32} color="white" /></button>
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("circle")}><Circle size={32} color="white" /></button>
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("square")}><Square size={32} color="white" /></button>
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("video")}><Video size={32} color="white" /></button>
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("paint")}><AppWindow size={32} color="white" /></button>
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => setValue("transform")}><Atom size={32} color="white" /></button>
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => {buildAndDownload()}}><Download size={32} color="white" /></button>
          <button className="bg-verde p-2 rounded-xl transition-colors hover:bg-verdesel" onClick={() => {readFile()}}><Upload size={32} color="white" /></button>
          <input type="file" className="hidden" ref={fileRef} onChange={e => {openFile(e)}} />
        </div>

        <SideBar type="professor" />
      </main>
    )
  }
  