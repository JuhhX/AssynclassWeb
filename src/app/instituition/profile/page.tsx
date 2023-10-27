"use client"

import { SideBar } from "@/components/SideBar";
import { resolveGrade } from "@/lib/general";
import { getUserName } from "@/lib/user/user";
import { ChevronsRight, Settings, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

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

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isDataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
      getUserName().then(res => {
          
          fetch(`http://localhost:3333/instituition/${res.id}`)
          .then(json => json.json())
          .then(data => {
            setInstituition(data);
            setDataLoaded(true);
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
    <main className="flex flex-col items-center pb-4 pr-4 gap-8">
      <div className="w-1/2 rounded-xl flex flex-row border-2 border-b-4 border-azul p-4 mt-8 dark:shadow-neon-azul">

        {
          (isDataLoaded) ? 
            <>
              <div className="w-1/4 h-full justify-center flex flex-col items-center p-4">
                {(instituition == null) ? <UserCircle2 size={90} className="text-azul" /> : <img src={instituition.avatarURL} alt="avatar" className='w-14 h-14 rounded-lg self-center' />}
              </div>

              <div className="w-1/2 pl-4 flex flex-col justify-center">
                {
                  (instituition != null) &&
                  <>
                    <p className="text-lg text-azul dark:text-azulsel"><span className="font-semibold mr-2">{"Nome: "}</span>{instituition.instituitionName}</p>
                    <p className="text-lg text-azul dark:text-azulsel"><span className="font-semibold mr-2">{"Código: "}</span>{instituition.instituitionID}</p>
                  </>
                }
              </div>

              <div className="w-1/4 h-full justify-center flex flex-col items-center p-4">
                <Settings size={45} className="text-verde self-center cursor-pointer" />
              </div>
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

      <div className="w-1/2 flex flex-row justify-around">
        <button className={`text-xl font-semibold ${(showContent == 0) ? "text-verde" : "text-azul dark:text-azulsel"}`} onClick={() => setShowContent(0)}>Informações gerais</button>
        <button className={`text-xl font-semibold ${(showContent == 1) ? "text-verde" : "text-azul dark:text-azulsel"}`} onClick={() => setShowContent(1)}>Meus professores</button>
      </div>

      <div className="w-1/2 border-2 border-b-4 border-azul rounded-xl dark:shadow-neon-azul">
        {
            (showContent == 0) ? 
                (instituition != null) ? 
                    <div className="p-8 flex flex-col gap-4">
                        <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold mr-2">{"Código de usuário: "}</span>{instituition.instituitionID}</p>
                        <hr />
                        <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold mr-2">{"Nome: "}</span>{instituition.instituitionName}</p>
                        <hr />
                        <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold mr-2">{"CNPJ: "}</span>{instituition.cnpj}</p>
                        <hr />
                        <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold mr-2">{"Email: "}</span>{instituition.email}</p>
                        <hr />
                        <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold mr-2">{"Contato: "}</span>{instituition.contact}</p>
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
                teachers.map(t => { 
                    return(
                        <div key={t.teacherID} className="w-full p-4 flex flex-col border-b-2 border-azul">
                            <h1 className="text-azul text-xl dark:text-azulsel">{t.teacherName}</h1>
                            <p className="text-azul text-lg dark:text-azulsel">{resolveGrade(SeriesAlunos[t.grades[0]])}</p>
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
