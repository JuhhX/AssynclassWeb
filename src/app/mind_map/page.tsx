'use client'
import Context from "@/components/game_editor/Context";
import {useEffect, useState } from "react";

export default function MindMap(){
    const [loaded, setLoaded] = useState<string[]>([]);

    async function loadMindMap(){
        fetch("http://localhost:3333/mind_map")
        .then(res => res.blob())
        .then(data => {
            
            const reader = new FileReader();
            reader.onload = () => {
                const content = String(reader.result);
                if(content.includes("\r\n"))
                  setLoaded(content.split("\r\n"));
                else  
                  setLoaded(content.split("\n"));
            };

            // Leia os dados binários como texto
            reader.readAsText(data, 'UTF-8');
        })
    }

    useEffect(() => {
        loadMindMap();
    }, [])

    return(
        <div className='w-full h-screen bg-transparent overflow-hidden flex'>
            <Context data={(loaded != undefined) ? loaded : []} />
        </div>
    )
}