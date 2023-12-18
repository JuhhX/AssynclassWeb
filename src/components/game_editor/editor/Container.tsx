import { useEffect, useRef, useState } from "react";
import Components from "./Components";
import Events from "./Events";
import Styles from "./Styles";
import Variables from "./Variables";
import { ChevronsRight } from "lucide-react";
import { getUserName } from "@/lib/user/user";
import { useSearchParams } from "next/navigation";

interface ContainerProps{
    load: Function,
    requestDownload: number
}

export default function Container(props: ContainerProps){

    const params = useSearchParams();

    const [variables, setVariables] = useState<string[]>([]);
    const [events, setEvents] = useState<string[]>([]);
    const [styles, setStyles] = useState<string[]>([]);
    const [componentes, setComponents] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);

    const [isMerge, setMerge] = useState<boolean>(false);

    const [isClosed, setIsClosed] = useState<boolean>(false);

    const [showingUpload, showUploadButton] = useState<boolean>(false);
    const [teacherID, setTeacherID] = useState<string | null>(null);

    const downloadRef = useRef<HTMLAnchorElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        props.load(getSplited(variables).concat(getSplited(events)).concat(getSplited(styles)).concat(getSplited(componentes)).concat(getSplited(models)))
    }, [variables, events, styles, componentes, models])

    useEffect(() => {
        getUserName().then(res => {
            setTeacherID(res.id);
            showUploadButton((res.type == "1") ? true : false);
        });
    }, []);

    useEffect(() => {
        const template_type = params.get("template");
    
        if(template_type){
          fetch(`http://localhost:3333/templates/${template_type}`, {
            method: "GET"
          })
          .then(resp => resp.blob())
          .then(data => {
              const reader = new FileReader();
                reader.onload = () => {
                    var objects = String(reader.result).split("§§");
    
                    setVariables(JSON.parse(objects[0]));
                    setEvents(JSON.parse(objects[1]));
                    setStyles(JSON.parse(objects[2]));
                    setComponents(JSON.parse(objects[3]));
                    setModels(JSON.parse(objects[4]));
                };
    
                reader.readAsText(data, 'UTF-8');
          })
        }
    
      }, []);

    function getSplited(v: string[]){
        let result: string[] = [];

        v.forEach(l => {
            if(l){
                let splited = l.split("\n")
                
                splited.forEach(s => {
                    if(s != "")
                        result.push(s);
                })
            }
        });


        return result;
    }

    function saveInServer(){
        fetch("http://localhost:3333/upload_game", {
            method: "POST",
            body: JSON.stringify(
                {
                    teacherID,
                    gameContent: `${getSplited(variables).join("\n")}\n\n${getSplited(events).join("\n")}\n\n${getSplited(styles).join("\n")}\n\n${getSplited(models).join("\n")}\n\n${getSplited(componentes).join("\n")}`
                }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(data => {

            if(data.status == 401)
                alert("Upload não realizado.");
            else if(data.status == 200){
                alert("Upload realizado com sucesso.");
            }
        })
    }

    function save(final: boolean){
        
        if(downloadRef.current != null){
            let date = new Date();
            let filename = `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getMilliseconds()}`
            let dataStr = "";

            if(!final){
                dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(`${JSON.stringify(variables)}§§${JSON.stringify(events)}§§${JSON.stringify(styles)}§§${JSON.stringify(componentes)}§§${JSON.stringify(models)}`);
                filename += ".txt";
            }
            else{
                dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(`${getSplited(variables).join("\n")}\n\n${getSplited(events).join("\n")}\n\n${getSplited(styles).join("\n")}\n\n${getSplited(models).join("\n")}\n\n${getSplited(componentes).join("\n")}`);
                filename += ".asl";
            }
            downloadRef.current.setAttribute("href", dataStr);
            downloadRef.current.setAttribute("download", filename);
            downloadRef.current.click();
        }
    }

    function importFile(){
        if(inputRef.current != null){
            inputRef.current.click();
        }
    }

    function mergeFile(){
        if(inputRef.current){
            setMerge(true);
            inputRef.current.click();
        }
    }

    function getLoadedData(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files){

            if(e.target.files.length == 1){
              var reader = new FileReader();
      
              //Extrai os componentes para renderizar
              reader.onload = function(event) {
                if(event.target?.result){
                  var objects = event.target.result.toString().split("§§");
            
                  if(isMerge){
                    setVariables([...variables, JSON.parse(objects[0])[0]]);
                    setEvents([...events, JSON.parse(objects[1])[0]]);
                    setStyles([...styles, JSON.parse(objects[2])[0]]);
                    setComponents([...componentes, JSON.parse(objects[3])[0]]);
                    setModels([...models, JSON.parse(objects[4])[0]]);
                  }
                  else{
                      setVariables(JSON.parse(objects[0]));
                      setEvents(JSON.parse(objects[1]));
                      setStyles(JSON.parse(objects[2]));
                      setComponents(JSON.parse(objects[3]));
                      setModels(JSON.parse(objects[4]));
                  }
                }
              }
              
              reader.readAsText(e.target.files[0]);
            }
          }
      
          //setMerge(false);

          if(inputRef.current != null)
            inputRef.current.value = ""
    }

    useEffect(() => {
        if(props.requestDownload != -1)
            save(true);
    }, [props.requestDownload])

    return(
        <div className={`absolute right-0 transition-transform duration-300 ${(isClosed) ? "translate-x-[90%]" : ""} w-1/3 h-screen`}>
            <div className={`absolute cursor-pointer top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-10 bg-azul p-3 rounded-full transition-all duration-500 ${(isClosed) ? "rotate-180" : ""} hover:bg-verde`} onClick={() => setIsClosed(!isClosed)}><ChevronsRight color="white" size={32} /></div>
            <div className="h-full bg-white border-2 border-b-4 border-azul rounded-xl p-4 pb-8 pt-20 flex flex-col overflow-auto gap-4 scrollbar-thin scrollbar-track-azul">

                <Variables set={setVariables} data={variables} />
                <Events set={setEvents} data={events} />
                <Styles set={setStyles} data={styles} />
                <Components model={false} set={setComponents} data={componentes} />

                <div className="flex flex-row px-8 gap-4 mt-4 justify-center">
                    <button className="bg-emerald-500 w-1/2 py-4 px-2 rounded-xl font-bold text-white" onClick={() => {save(false)}}>Salvar rascunho</button>
                    <button className="bg-emerald-500 w-1/2 py-4 px-2 rounded-xl font-bold text-white" onClick={() => {importFile()}}>Carregar rascunho</button>
                </div>
                <div className="flex flex-row px-8 gap-4 mt-4 justify-center">
                    <button className="bg-emerald-500 w-1/2 py-4 px-2 rounded-xl font-bold text-white" onClick={() => {mergeFile()}}>Misturar rascunhos</button>
                    {
                        (showingUpload) && 
                        <button className="bg-emerald-500 w-1/2 py-4 px-2 rounded-xl font-bold text-white" onClick={() => {saveInServer()}}>Salvar na conta</button>
                    }
                </div>

                <a href="" ref={downloadRef}></a>
                <input type="file" accept=".txt" className="hidden" ref={inputRef} onChange={(e) => getLoadedData(e)} />
                
            </div>
        </div>
    )
}