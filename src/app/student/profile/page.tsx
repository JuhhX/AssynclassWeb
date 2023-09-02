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

  return (
    <main className="w-full h-screen flex flex-col">

      <div className="w-1/2 flex flex-row self-center border-b-2 border-b-azul mt-16">
        <div className="w-1/4 h-full justify-center flex flex-col items-center p-4">
          {(student == null) ? <UserCircle2 size={90} className="text-azul" /> : <img src={student.avatarURL} alt="avatar" className='w-14 h-14 rounded-lg self-center' />}
        </div>

        <div className="w-1/2 p-4 text-azul text-lg flex flex-col justify-center">
          {
            (student != null) &&
            <>
              <p>{"Nome: " + student.studentName}</p>
              <p>{"Código: " + student.studentID}</p>
              <p>{"Série: " + SeriesAlunos[student.studentGrade]}</p>
              <p>{"RA: " + student.ra}</p>
            </>
          }
        </div>
        <div className="w-1/4 flex justify-center items-center p-4 text-verde">
          <Settings size={45} />
        </div>
      </div>

      <div className="w-1/2 flex flex-row self-center justify-around p-4">
        <button className={`text-xl ${(showContent == 0) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(0)}>Informações gerais</button>
        <button className={`text-xl ${(showContent == 1) ? "text-verde" : "text-azul"}`} onClick={() => setShowContent(1)}>Mentores</button>
      </div>

      <div className="w-1/2 flex flex-col self-center">
        {
          (showContent == 0) ?
            (student != null) ?
              <div className="p-8">
                <p className="text-azul text-lg">{"Código de usuário: " + student.studentID}</p>
                <p className="text-azul text-lg">{"Nome: " + student.studentName}</p>
                <p className="text-azul text-lg">{"RA: " + student.ra}</p>
                <p className="text-azul text-lg">{"Data de nascimento: " + student.birthday}</p>
                <p className="text-azul text-lg">{"Contato: " + student.contact}</p>
              </div>
              :
              null
            :
            //COMPONENTE
            teachers.map(t => {
              return (
                <div key={t.teacherID} className="w-full flex flex-row self-center border-b-2 border-b-azul mt-6">
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
