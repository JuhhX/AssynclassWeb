"use client"

import { SideBar } from "@/components/SideBar"
import { getUserName } from "@/lib/user/user"
import { UserCircle2, Settings, ChevronsRight } from "lucide-react"
import { useEffect, useState } from "react"

enum MateriasProf{
  MATEMATICA,
  PORTUGUES,
  CIENCIAS,
  INGLES,
  GEOGRAFIA,
  HISTORIA
}

enum SeriesAlunos {
  ANO_6,
  ANO_7,
  ANO_8,
  ANO_9,
  ANO_1,
  ANO_2,
  ANO_3,
}

export default function Home() {

  const [student, setStudent] = useState<student | null>(null);
  const [showContent, setShowContent] = useState<number>(0);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    getUserName().then(res => {

      fetch(`http://localhost:3333/student/${res.id}`)
        .then(json => json.json())
        .then(data => {
          setStudent(data)
        })

    })
  }, [])

  useEffect(() => {
    if(student != null)
        fetch(`http://localhost:3333/student/${student.studentID}/teachers`)
        .then(json => json.json())
        .then(data => {
            setTeachers(data)
        })
  }, [student])

  function resolveGrade(grade: string){

    const grades : any = {
      "ANO_6": "6° ano (Ensino Fundamental II)",
      "ANO_7": "7° ano (Ensino Fundamental II)",
      "ANO_8": "8° ano (Ensino Fundamental II)",
      "ANO_9": "9° ano (Ensino Fundamental II)",
      "ANO_1": "1° ano (Ensino Médio)",
      "ANO_2": "2° ano (Ensino Médio)",
      "ANO_3": "3° ano (Ensino Médio)",
    }

    return grades[grade];
  }

  return (
    <main className="w-full h-screen flex flex-col pb-4 pr-4">

      <div className="w-1/2 flex flex-row self-center border-2 border-azul border-b-4 mt-16 rounded-xl">
        <div className="w-1/4 h-full justify-center flex flex-col items-center p-4">
          {(student == null) ? <UserCircle2 size={90} className="text-azul" /> : <img src={student.avatarURL} alt="avatar" className='w-14 h-14 rounded-lg self-center' />}
        </div>

        <div className="w-1/2 p-4 text-azul text-lg flex flex-col justify-center">
          {
            (student != null) &&
            <>
              <p><span className="font-semibold mr-2">{"Nome: "}</span>{student.studentName}</p>
              <p><span className="font-semibold mr-2">{"Código: "}</span>{student.studentID}</p>
              <p><span className="font-semibold mr-2">{"Série: "}</span>{resolveGrade(SeriesAlunos[student.studentGrade])}</p>
              <p><span className="font-semibold mr-2">{"RA: "}</span>{student.ra}</p>
            </>
          }
        </div>
        <div className="w-1/4 flex justify-center items-center p-4 text-verde">
          <Settings size={45} />
        </div>
      </div>

      <div className="w-1/2 flex flex-row self-center justify-around p-4">
        <button className={`text-xl font-semibold ${(showContent == 0) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(0)}>Informações gerais</button>
        <button className={`text-xl font-semibold ${(showContent == 1) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(1)}>Mentores</button>
      </div>

      <div className="w-1/2 border-2 border-b-4 border-azul rounded-xl flex flex-col self-center overflow-auto">
        {
          (showContent == 0) ?
            (student != null) ?
              <div className="p-8 flex flex-col gap-4">
                <p className="text-azul text-lg"><span className="font-semibold">{"Código de usuário: "}</span>{student.studentID}</p>
                <hr />
                <p className="text-azul text-lg"><span className="font-semibold">{"Nome: "}</span>{student.studentName}</p>
                <hr />
                <p className="text-azul text-lg"><span className="font-semibold">{"RA: "}</span>{student.ra}</p>
                <hr />
                <p className="text-azul text-lg"><span className="font-semibold">{"Data de nascimento: "}</span>{student.birthday}</p>
                <hr />
                <p className="text-azul text-lg"><span className="font-semibold">{"Contato: "}</span>{student.contact}</p>
              </div>
              :
              null
            :
            //COMPONENTE
            teachers.map(t => {
              return (
                <div key={t.teacherID} className="w-full flex flex-row self-center border-b-2 border-b-azul mt-6 cursor-pointer">
                  <div className="w-1/4 h-full justify-center flex flex-col items-center p-4">
                    <img src={t.avatarURL} alt="avatar" className='w-14 h-14 rounded-lg self-center' />
                  </div>
                  <div className="w-1/2 p-4 text-azul text-lg">
                    <p>{t.teacherName}</p>
                    <p>{t.inst[0]}</p>
                    <p>{MateriasProf[t.subjects[0]]}</p>
                  </div>
                  <div className="w-1/4 flex flex-col items-center justify-center">
                    <a href={`/teacher/profile?teacherID=${t.teacherID}`}><ChevronsRight className="text-azul" size={35} /></a>
                  </div>
                </div>
              );
            })
        }
      </div>

      <SideBar type="aluno" />

    </main>
  )
}
