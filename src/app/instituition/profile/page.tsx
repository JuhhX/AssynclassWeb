"use client"

import { SideBar } from "@/components/SideBar";
import { getUserName } from "@/lib/user/user";
import { ChevronsRight, Settings, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

enum SeriesAlunos{
  ANO_6,
  ANO_7,
  ANO_8,
  ANO_9,
  ANO_1,
  ANO_2,
  ANO_3,
}

export default function InstituitionProfile() {

  const [instituition, setInstituition] = useState<Institution | null>(null);
  const [showContent, setShowContent] = useState<number>(0);

  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
      getUserName().then(res => {
          
          fetch(`http://localhost:3333/instituition/${res.id}`)
          .then(json => json.json())
          .then(data => {
            setInstituition(data)
          })

      })
  }, [])

  
  useEffect(() => {
    if(showContent == 1 && teachers.length == 0 && instituition != null){
        fetch(`http://localhost:3333/instituition/${instituition.instituitionID}/teachers`)
        .then(json => json.json())
        .then(data => {
            setTeachers(data);
        })
    }
  }, [showContent])

  return (
    <main className="flex flex-col items-center">
      <div className="w-1/2 pt-20 rounded-1xl flex flex-row border-b-2 border-b-azul p-4">

        {(instituition == null) ? <UserCircle2 size={90} className="text-azul" /> : <img src={instituition.avatarURL} alt="avatar" className='w-14 h-14 rounded-lg self-center' />}

        <div className="w-3/4 pl-4 flex flex-col justify-center">
          {
            (instituition != null) &&
            <>
              <p className="text-lg text-azul">{"Nome: " + instituition.instituitionName}</p>
              <p className="text-lg text-azul">{"Código: " + instituition.instituitionID}</p>
            </>
          }
        </div>
        <Settings size={45} className="text-verde self-center cursor-pointer" />
      </div>

      <div className="w-1/2 pt-10 rounded-1xl flex flex-row justify-around">
        <button className={`text-xl ${(showContent == 0) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(0)}>Informações gerais</button>
        <button className={`text-xl ${(showContent == 1) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(1)}>Meus professores</button>
      </div>

      <div className="w-1/2">
        {
            (showContent == 0) ? 
                (instituition != null) ? 
                    <div className="py-8">
                        <p className="text-azul text-lg">{"Código de usuário: " + instituition.instituitionID}</p>
                        <p className="text-azul text-lg">{"Nome: " + instituition.instituitionName}</p>
                        <p className="text-azul text-lg">{"CNPJ: " + instituition.cnpj}</p>
                        <p className="text-azul text-lg">{"Email: " + instituition.email}</p>
                        <p className="text-azul text-lg">{"Contato: " + instituition.contact}</p>
                    </div>
                : 
                    null
            : 
                //COMPONENTE
                teachers.map(t => {
                    return(
                        <div key={t.teacherID} className="w-full bg-cinza p-4 rounded-lg flex flex-col mt-5">
                            <h1 className="text-azul text-xl">{t.teacherName}</h1>
                            <p className="text-verde text-lg">{SeriesAlunos[t.grades[0]]}</p>
                            <a href={`/teacher/profile?teacherID=${t.teacherID}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
                        </div>
                    )
                })
        }
      </div>

      <SideBar type={"instituition"} />
    </main>
  );
}
