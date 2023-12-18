'use client'
import Context from "@/components/game_editor/Context";
import { useRef, useState } from "react";
import { ArrowUpFromLine, RotateCw, Download } from "lucide-react";
import Container from "@/components/game_editor/editor/Container";

export default function GameEditor(){

  const inputRef = useRef<HTMLInputElement | any>();
  const [loaded, setLoaded] = useState<string[]>([]);
  const [reqDownload, setReqDownload] = useState<number>(-1);

  function getLoadedData(e: React.ChangeEvent<HTMLInputElement>){
      if(e.target.files){
  
        if(e.target.files.length == 1){
          var reader = new FileReader();
  
          //Extrai os componentes para renderizar
          reader.onload = function(event) {
            if(event.target?.result){
              if(event.target.result.toString().includes("\r\n"))
                setLoaded(event.target.result.toString().split("\r\n"));
              else  
                setLoaded(event.target.result.toString().split("\n"));
            }
          }
          
          reader.readAsText(e.target.files[0]);
        }
      }
  
      if(inputRef.current)
          inputRef.current.value = ""
  }

  function openFile(){
      if(inputRef.current)
          inputRef.current.click();
  }

  return(
      <div className='w-full h-screen bg-transparent overflow-hidden flex'>
          <Context data={(loaded != undefined) ? loaded : []} />
          <input className="absolute bottom-2 hidden" type="file" accept=".asl" ref={inputRef} onChange={(e) => getLoadedData(e)} />
          <button className="absolute bottom-2 left-2 bg-azul p-3 rounded-full transition-colors hover:bg-verde" onClick={() => openFile()}><ArrowUpFromLine color="white" /></button>
          <button className="absolute bottom-2 left-16 bg-azul p-3 rounded-full transition-colors hover:bg-verde" onClick={() => {window.location.reload()}}><RotateCw color="white" /></button>
          <button className="absolute bottom-16 left-2 bg-azul p-3 rounded-full transition-colors hover:bg-verde" onClick={() => {setReqDownload(Math.random())}}><Download color="white" /></button>

          <Container load={setLoaded} requestDownload={reqDownload} />
      </div>
  )
}