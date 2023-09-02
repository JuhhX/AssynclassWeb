"use client"

import AtrContent from "@/components/AtrContent";
import GroupAll from "@/components/GroupAll";
import GroupCreation from "@/components/GroupCreation";
import { SideBar } from "@/components/SideBar";
import TeacherMentAll from "@/components/TeacherMentAll";
import TeacherStudentAll from "@/components/TeacherStudentAll";
import { getUserName } from "@/lib/user/user";
import { useEffect, useState } from "react";

export default function TeacherGroups() {

    const [showInterface, setShowInterface] = useState<number>(0);
    const [currentGroup, setCurrentGroup] = useState<string>("");
    const [allGroups, setAllGroups] = useState<any>();
    const [contents, setContents] = useState<Content[]>();
    const [atr, setAtr] = useState<boolean>(false);

    useEffect(() => {
        getUserName().then(res => {
            fetch(`http://localhost:3333/contents/${res.id}`)
            .then(json => json.json())
            .then(data => {
                setContents(data);
            })
        })
    }, [])

    function selectGroup(groupID: string){
        setCurrentGroup(groupID);
        setAtr(true);
    }

    function setGroups(groups: any){
        setAllGroups(groups);
    }   

    function assignContent(idContent: string){

        const groups = allGroups.map((g: any) => {
            if(g.groupID == currentGroup)
                return g.studentID
        }).filter((g: any) => g !== undefined)[0];

        fetch(`http://localhost:3333/sendContent`, {
            method: "POST",
            body: JSON.stringify({
                idContent: idContent,
                toStudents: groups
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        alert("Conteúdo enviado para o grupo! 😃");
    }

    return (
        <main className="h-screen overflow-auto w-full flex flex-col p-8 px-16 gap-8 overflow-hidden">
            <h1 className={`text-azul text-3xl`}>Alunos e grupos</h1>

            <div className="w-full h-full flex flex-row">
                <div className="h-full w-1/5 border-r-2 border-azul flex flex-col">
                    <button onClick={() => setShowInterface(0)} className="text-lg text-azul transition-colors hover:text-verde">Meus alunos</button>
                    <button onClick={() => setShowInterface(1)} className="text-lg text-azul transition-colors hover:text-verde">Meus grupos</button>
                    <button onClick={() => setShowInterface(2)} className="text-lg text-azul transition-colors hover:text-verde">Criar grupos</button>
                    <button onClick={() => setShowInterface(3)} className="text-lg text-azul transition-colors hover:text-verde">Solicitações</button>
                </div>

                <div className="w-4/5 h-full flex flex-col gap-4 p-4 pb-16 overflow-auto">
                    {
                        (showInterface == 0) ? 
                            <TeacherStudentAll />
                        : (showInterface == 1) ?
                            <GroupAll openAtr={selectGroup} setGroups={setGroups} containerType={1} />
                        : (showInterface == 2) ?
                            <GroupCreation />
                        : 
                            <TeacherMentAll />
                    }
                    
                </div>
            </div>
            
            {
                (atr) &&
                <div className="absolute top-0 left-0 w-full h-screen bg-zinc-950/50 flex flex-col justify-center">
                    <div className="bg-white w-1/2 h-3/4 rounded-xl self-center">
                        <div className="w-full h-3/4 p-4 flex flex-col gap-4">
                            <h1 className={`text-azul text-3xl`}>Atribuir conteúdo</h1>
                            {
                                (contents != undefined) &&
                                contents.map((c) => {
                                    return <AtrContent key={c.contentID} idContent={c.contentID} contentName={c.contentName} contentDescription={c.contentDescription} assign={assignContent} />
                                })
                            }
                        </div>
                        <div className="w-full h-1/4 flex flex-row justify-end p-4 pt-10 gap-4">
                            <button onClick={() => setAtr(false)} className='bg-vermelho rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-fit transition-colors'>Cancelar</button>
                        </div>
                    </div>
                </div>
            }
        
            <SideBar type={'professor'} />
        </main>
    )
}
  