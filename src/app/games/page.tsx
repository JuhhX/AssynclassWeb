'use client'
import Context from "@/components/game_editor/Context";
import { useSearchParams } from "next/navigation";
import {useEffect, useState } from "react";

export default function Games(){
    
    const params = useSearchParams();
    const [loaded, setLoaded] = useState<string[]>([]);

    async function loadGame(){

        const gameID : string = String(params.get("id"));
        
        fetch(`http://localhost:3333/games/${gameID}`)
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

            reader.readAsText(data, 'UTF-8');
        })
    }

    useEffect(() => {
        loadGame();
    }, [])

    return(
        <div className='w-full h-screen bg-transparent overflow-hidden flex'>
            <Context data={(loaded != undefined) ? loaded : []} />
        </div>
    )
}