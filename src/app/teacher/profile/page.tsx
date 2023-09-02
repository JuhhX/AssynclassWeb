"use client"

import { SideBar } from "@/components/SideBar";
import { getUserName } from "@/lib/user/user";
import { ChevronsRight, Settings, UserCircle2 } from 'lucide-react'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

enum MateriasProf{
    MATEMATICA,
    PORTUGUES,
    CIENCIAS,
    INGLES,
    GEOGRAFIA,
    HISTORIA
}

enum SeriesAlunos{
    ANO_6,
    ANO_7,
    ANO_8,
    ANO_9,
    ANO_1,
    ANO_2,
    ANO_3,
}

export default function TeacherProfile() {

    const params = useSearchParams();

    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [showContent, setShowContent] = useState<number>((params.get("teacherID") == undefined) ? 0 : 1);
    const [contents, setContents] = useState<Content[]>([])

    const [profileOwner] = useState<boolean>((params.get("teacherID") == undefined) ? true : false)

    useEffect(() => {
        if(profileOwner){
            getUserName().then(res => {
                
                fetch(`http://localhost:3333/teacher/${res.id}`)
                .then(json => json.json())
                .then(data => {
                    setTeacher(data)
                })
    
            })
        }
        else{
            fetch(`http://localhost:3333/teacher/${params.get("teacherID")}`)
            .then(json => json.json())
            .then(data => {
                setTeacher(data)
            })
        }
    }, [])

    useEffect(() => {
        if(showContent == 1 && contents.length == 0 && teacher != null){
            fetch(`http://localhost:3333/contents/${teacher.teacherID}`)
            .then(json => json.json())
            .then(data => {
                setContents(data);
            })
        }
        else if(!profileOwner){
            fetch(`http://localhost:3333/contents/${params.get("teacherID")}`)
            .then(json => json.json())
            .then(data => {
                setContents(data);
            })
        }
    }, [showContent])

    return (
        <main className="h-screen w-full flex flex-col p-8 gap-8">

            <div className="self-center w-1/2">

                <div className="flex justify-between border-b-2 border-b-azul p-4">

                    {(teacher == null) ? <UserCircle2 size={90} className="text-azul" /> : <img src={teacher.avatarURL} alt="avatar" className='w-14 h-14 rounded-lg self-center' />}
                    

                    <div className="w-3/4 pl-4 justify-center flex flex-col">
                        {
                            (teacher != null) &&
                            <>
                                <p className="text-azul ">{"Nome: " + teacher.teacherName}</p>
                                <p className="text-azul">{"Código: " + teacher.teacherID}</p>
                                <p className="text-azul">{"Mentor: " + ((teacher.isMentor) ? "SIM" : "NÃO")}</p>
                                <p className="text-azul">{"Matéria: " + MateriasProf[teacher.subjects[0]]}</p>
                                <p className="text-azul">{(teacher.inst != undefined) ? ("Instituição: " + teacher.inst[0]) : "Nenhuma instituição vinculada"}</p>
                            </>
                        }
                    </div>

                    { (params.get("teacherID") == undefined) && <Settings size={45} className="text-verde self-center cursor-pointer" onClick={() => console.log(teacher)} />}
                </div>

                <div className="w-full pt-10 rounded-1xl flex flex-row justify-around">
                    {
                        (params.get("teacherID") == undefined) && <button className={`text-xl ${(showContent == 0) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(0)}>Informações gerais</button>
                    }
                    <button className={`text-xl ${(showContent == 1) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(1)}>Conteúdos</button>
                </div>

                <div>
                    {
                        (showContent == 0) ? 
                            (teacher != null) ? 
                                <div className="p-8">
                                    <p className="text-azul text-lg">{"Código de usuário: " + teacher.teacherID}</p>
                                    <p className="text-azul text-lg">{"Nome: " + teacher.teacherName}</p>
                                    <p className="text-azul text-lg">{"CPF: " + teacher.cpf}</p>
                                    <p className="text-azul text-lg">{"Instituição: " + teacher.inst[0]}</p>
                                    <p className="text-azul text-lg">{"É mentor: " + ((teacher.isMentor) ? "SIM" : "NÃO")}</p>
                                    <p className="text-azul text-lg">{"Matérias: " + MateriasProf[teacher.subjects[0]]}</p>
                                    <p className="text-azul text-lg">{"Séries: " + SeriesAlunos[teacher.grades[0]]}</p>
                                </div>
                            : 
                                null
                        : 
                            //COMPONENTE
                            contents.map(c => {
                                return(
                                    <div key={c.contentID} className="w-full bg-cinza p-4 rounded-lg flex flex-col mt-5">
                                        <h1 className="text-azul text-xl">{c.contentName}</h1>
                                        <p className="text-verde text-lg">{c.contentDescription}</p>
                                        <a href={`/teacher/create?teacherID=${c.teacherID}&contentID=${c.contentID}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>

            <SideBar type={'professor'} />
        </main>
    )
}