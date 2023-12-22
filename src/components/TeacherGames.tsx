"use client"

import { getUserName } from "@/lib/user/user";
import { ChevronsRight, Copy, Trash } from "lucide-react";
import { useEffect, useState } from "react"
import { ColorRing } from "react-loader-spinner";

export default function TeacherGames(){
    
    const [games, setGames] = useState<GameContent[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        getUserName().then(res => {
            fetch(`http://localhost:3333/teacher/${res.id}/games`)
            .then(r => r.json())
            .then(data => {
                setGames(data);
                setLoaded(true);
            })
        })
    }, []);

    function deleteGame(gameID: string){
        let confirm_option : boolean = confirm("Você está prestes a apagar seu jogo.");

        if(confirm_option){
            fetch(`http://localhost:3333/games/${gameID}`,{
                method: "DELETE"
            })
            .then(_r => {
                console.log("Jogo deletado com sucesso.")
                window.location.reload();
            })
        }
    }
    
    return (
        <div className="flex flex-col gap-4 pt-6">
            {
                (!loaded) ? 
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        wrapperStyle={{marginLeft: "25%", marginTop: "15%"}}
                        wrapperClass="blocks-wrapper"
                        colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
                    />
                : 
                (games.length == 0) ?
                    <h1 className="text-azul text-xl dark:text-azulsel">{"VOCÊ AINDA NÃO CRIOU NENHUM JOGO 🙁"}</h1>
                : 
                    games.map((g, i) => {
                        return (
                            <div key={i} className="w-full border-2 border-b-4 border-azul p-4 rounded-xl flex flex-col dark:shadow-neon-azul">
                                <h1 className="text-azul text-xl font-semibold dark:text-azulsel">{g.gameName}</h1>
                                <p className="text-azul text-lg dark:text-azulsel">{g.gameDescription}</p>
                                <div className="flex flex-row w-full mt-4 justify-end gap-3">
                                    <button onClick={() => {deleteGame(g.gameID)}} className="self-end inline-block"><Trash size={32} className="text-azul dark:text-azulsel" /></button>
                                    <button onClick={() => {navigator.clipboard.writeText(g.gameID); alert("Código copiado!")}} className="self-end inline-block"><Copy size={32} className="text-azul dark:text-azulsel" /></button>
                                    <a href={`/games?id=${g.gameID}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul dark:text-azulsel" /></a>
                                </div>
                            </div>
                          )
                    })
            }
        </div>
    )
}