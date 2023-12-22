'use client'
import Context from "@/components/game_editor/Context";
import { getUserName } from "@/lib/user/user";
import { useSearchParams } from "next/navigation";
import {useEffect, useState } from "react";

export default function Games(){
    
    const params = useSearchParams();
    const [loaded, setLoaded] = useState<string[]>([]);
    const [owner, setOwner] = useState<boolean>(false);
    const [gameID_, setGameID] = useState<string>("");

    async function loadGame(){

        const gameID = String(params.get("id"));
        
        getUserName().then(res => {
            if(gameID.startsWith(String(res.id)))
                setOwner(true);
        })
        
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
        });

        setGameID(gameID);
    }

    useEffect(() => {
        loadGame();
    }, [])

    return(
        <div className='w-full h-screen bg-transparent overflow-hidden flex'>
            <Context data={(loaded != undefined) ? loaded : []} />
            {(owner) && <a href={`/game_editor?id=${gameID_}`} className="absolute bottom-2 right-2 text-xl font-bold bg-verde rounded-lg p-4 text-white cursor-pointer hover:bg-verdesel">Editar</a>}
        </div>
    )
}