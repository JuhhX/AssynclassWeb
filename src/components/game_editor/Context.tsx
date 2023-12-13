import { useEffect, useState } from "react";
import { executeScript, useComponents, EventsInterface, reset } from "./editor_core";
import GraphicComponent from "./GraphicComponent";
import { ArcherContainer } from 'react-archer';

interface ContextInterface{
    data: string[];
}

export interface Communication{
    requestID: number,
    name: string,
    event: string
}

export default function Context(props: ContextInterface){

    const [component_list, setComponentList] = useState<EventsInterface>({});
    const [requestCommunication, setCommunication] = useState<Communication>({requestID: -1, name: "", event: ""});

    const [requestUpdate, setRequestUpdate] = useState<number>(-1);

    useEffect(() => {
        if(props.data.length > 0){
            reset();
            executeScript(props.data);
            setComponentList(useComponents().getComponents());
        }
    }, [props.data]);
    
    useEffect(() => {
        if(requestUpdate != -1){
            setComponentList(useComponents().getComponents());
        }
    }, [])

    function communication(name: string, event: string){
        setCommunication(
            {
                requestID: Math.random(),
                name: name,
                event: event
            }
        );
    }

    return(
        <div className="flex w-full h-screen bg-transparent">
            <ArcherContainer style={{width: "100%", height: "100%"}}>
                
                {
                    (Object.keys(component_list).length > 0) &&
                        Object.keys(component_list).map((key, index) => {
                            return <GraphicComponent key={key+index} name={key} data={component_list[key]} communication={communication} requestCommunication={requestCommunication} requestUpdate={setRequestUpdate} />
                        })
                }
                
            </ArcherContainer>
        </div>
    )
}