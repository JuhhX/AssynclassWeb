"use client"

import { SideBar } from "@/components/SideBar";
import { resolveGrade } from "@/lib/general";
import { getUserName } from "@/lib/user/user";
import { ChevronsRight, Settings, UserCircle2 } from 'lucide-react'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

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

    const [profileOwner] = useState<boolean>((params.get("teacherID") == undefined) ? true : false);

    const [isDataLoaded, setDataLoaded] = useState<boolean>(false);

    useEffect(() => {
        getUserName().then(res => {
            
            fetch(`http://localhost:3333/teacher/${(profileOwner) ? res.id : params.get("teacherID")}`)
            .then(json => json.json())
            .then(data => {
                setTeacher(data);
                setDataLoaded(true);
            })

        })
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

            <div className="w-1/2 flex justify-between border-b-2 border-b-azul p-4 border-2 border-b-4 border-azul rounded-xl self-center">

                {
                    (isDataLoaded) ? 
                        <>
                            {(teacher == null) ? <UserCircle2 size={90} className="text-azul" /> : <img src={teacher.avatarURL} alt="avatar" className='w-14 h-14 rounded-lg self-center' />}


                            <div className="w-3/4 pl-4 justify-center flex flex-col">
                                {
                                    (teacher != null) &&
                                    <>
                                        <p className="text-azul"><span className="font-semibold text-azul mr-2">{"Nome: "}</span>{teacher.teacherName}</p>
                                        <p className="text-azul"><span className="font-semibold text-azul mr-2">{"Código: "}</span>{teacher.teacherID}</p>
                                        <p className="text-azul"><span className="font-semibold text-azul mr-2">{"Mentor: "}</span>{((teacher.isMentor) ? "SIM" : "NÃO")}</p>
                                        <p className="text-azul"><span className="font-semibold text-azul mr-2">{"Matéria: "}</span>{MateriasProf[teacher.subjects[0]]}</p>
                                        <p className="text-azul"><span className="font-semibold text-azul mr-2">{"Instituição: "}</span>{(teacher.inst != undefined) ? (teacher.inst[0]) : "Nenhuma instituição vinculada"}</p>
                                    </>
                                }
                            </div>

                            { (params.get("teacherID") == undefined) && <Settings size={45} className="text-verde self-center cursor-pointer" onClick={() => console.log(teacher)} />}
                        </>
                    :
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            wrapperStyle={{alignSelf: "center", marginLeft: "45%"}}
                            wrapperClass="blocks-wrapper"
                            colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
                        />
                }

            </div>

            <div className="w-1/2 self-center flex flex-row justify-around">
                {
                    (params.get("teacherID") == undefined) && <button className={`text-xl font-semibold ${(showContent == 0) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(0)}>Informações gerais</button>
                }
                <button className={`text-xl font-semibold ${(showContent == 1) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(1)}>Conteúdos</button>
            </div>

            <div className="w-1/2 self-center border-2 border-b-4 border-azul rounded-xl overflow-auto scrollbar-thin scrollbar-thumb-azul">
                {
                    (showContent == 0) ? 
                        (teacher != null) ? 
                            <div className="flex flex-col gap-4 p-8">
                                <p className="text-azul text-lg"><span className="font-semibold mr-2">{"Código de usuário: "}</span>{teacher.teacherID}</p>
                                <hr />
                                <p className="text-azul text-lg"><span className="font-semibold mr-2">{"Nome: "}</span>{teacher.teacherName}</p>
                                <hr />
                                <p className="text-azul text-lg"><span className="font-semibold mr-2">{"CPF: "}</span>{teacher.cpf}</p>
                                <hr />
                                <p className="text-azul text-lg"><span className="font-semibold mr-2">{"Instituição: "}</span>{teacher.inst[0]}</p>
                                <hr />
                                <p className="text-azul text-lg"><span className="font-semibold mr-2">{"É mentor: "}</span>{((teacher.isMentor) ? "SIM" : "NÃO")}</p>
                                <hr />
                                <p className="text-azul text-lg"><span className="font-semibold mr-2">{"Matérias: "}</span>{MateriasProf[teacher.subjects[0]]}</p>
                                <hr />
                                <p className="text-azul text-lg"><span className="font-semibold mr-2">{"Séries: "}</span>{resolveGrade(SeriesAlunos[teacher.grades[0]])}</p>
                            </div>
                        : 
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            wrapperStyle={{alignSelf: "center", marginLeft: "45%"}}
                            wrapperClass="blocks-wrapper"
                            colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
                        />
                    : 
                        //COMPONENTE
                        contents.map(c => {
                            return(
                                <div key={c.contentID} className="w-full border-b-2 border-b-azul p-4 flex flex-col">
                                    <h1 className="text-azul text-xl">{c.contentName}</h1>
                                    <p className="text-verde text-lg">{c.contentDescription}</p>
                                    <a href={`/teacher/create?teacherID=${c.teacherID}&contentID=${c.contentID}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
                                </div>
                            )
                        })
                }
            </div>

            <SideBar type={'professor'} />
        </main>
    )
}