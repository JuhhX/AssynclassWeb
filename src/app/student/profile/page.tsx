"use client"

import AvatarEditor from "@/components/AvatarEditor"
import { SideBar } from "@/components/SideBar"
import { resolveGrade } from "@/lib/general"
import { getUserName } from "@/lib/user/user"
import { UserCircle2, Settings, ChevronsRight } from "lucide-react"
import { useEffect, useState } from "react"
import { ColorRing } from "react-loader-spinner"

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

  const [isDataLoaded, setDataLoaded] = useState<boolean>(false);
  const [openAvatarEditor, setOpenAvatarEditor] = useState<boolean>(false);

  useEffect(() => {
    getUserName().then(res => {

      fetch(`http://localhost:3333/student/${res.id}`)
        .then(json => json.json())
        .then(data => {
          setStudent(data)
          setDataLoaded(true);
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
    <main className="w-full h-screen flex flex-col pb-4 pr-4">

      <div className="w-1/2 flex flex-row self-center border-2 border-azul border-b-4 mt-16 rounded-xl transition duration-500 dark:shadow-neon-azul">

        {
          (!isDataLoaded) ?
            <ColorRing
              visible={true}
              height="80"
              width="80"
              wrapperStyle={{alignSelf: "center", marginLeft: "45%"}}
              wrapperClass="blocks-wrapper"
              colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
            />
          :
            <>
              <div className="w-1/4 h-full justify-center flex flex-col items-center p-4">
                {(student == null) ? <UserCircle2 size={90} className="text-azul" /> : <img src={student.avatarURL} alt="avatar" onClick={() => {setOpenAvatarEditor(true)}} className='w-14 h-14 rounded-lg self-center cursor-pointer' />}
              </div>

              <div className="w-1/2 p-4 text-azul text-lg flex flex-col justify-center">
                {
                  (student != null) &&
                  <>
                    <p className="dark:text-azulsel"><span className="font-semibold mr-2">{"Nome: "}</span>{student.studentName}</p>
                    <p className="dark:text-azulsel"><span className="font-semibold mr-2">{"Código: "}</span>{student.studentID}</p>
                    <p className="dark:text-azulsel"><span className="font-semibold mr-2">{"Pontos: "}</span>{student.points}</p>
                    <p className="dark:text-azulsel"><span className="font-semibold mr-2">{"Série: "}</span>{resolveGrade(SeriesAlunos[student.studentGrade])}</p>
                    <p className="dark:text-azulsel"><span className="font-semibold mr-2">{"RA: "}</span>{student.ra}</p>
                  </>
                }
              </div>
              <div className="w-1/4 flex justify-center items-center p-4 text-verde">
                <Settings size={45} />
              </div>
            </>
        }

        
      </div>

      <div className="w-1/2 flex flex-row self-center justify-around p-4">
        <button className={`text-xl font-semibold ${(showContent == 0) ? "text-verde" : "text-azul dark:text-azulsel"}`} onClick={() => setShowContent(0)}>Informações gerais</button>
        <button className={`text-xl font-semibold ${(showContent == 1) ? "text-verde" : "text-azul dark:text-azulsel"}`} onClick={() => setShowContent(1)}>Mentores</button>
      </div>

      <div className="w-1/2 border-2 border-b-4 border-azul rounded-xl flex flex-col self-center overflow-auto scrollbar-thin scrollbar-thumb-azul dark:shadow-neon-azul">
        {
          (showContent == 0) ?
            (student != null) ?
              <div className="p-8 flex flex-col gap-4">
                <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold">{"Código de usuário: "}</span>{student.studentID}</p>
                <hr />
                <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold">{"Nome: "}</span>{student.studentName}</p>
                <hr />
                <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold">{"RA: "}</span>{student.ra}</p>
                <hr />
                <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold">{"Pontos: "}</span>{student.points}</p>
                <hr />
                <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold">{"Data de nascimento: "}</span>{student.birthday}</p>
                <hr />
                <p className="text-azul text-lg dark:text-azulsel"><span className="font-semibold">{"Contato: "}</span>{student.contact}</p>
              </div>
              :
              <ColorRing
                visible={true}
                height="80"
                width="80"
                wrapperStyle={{alignSelf: "center"}}
                wrapperClass="blocks-wrapper"
                colors={['#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6', '#2E34A6']}
              />
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

      {
        openAvatarEditor &&
        <AvatarEditor avatar={student?.avatarURL} openEditor={setOpenAvatarEditor} userType={0} userID={String(student?.studentID)} />
      }

      <SideBar type="aluno" />

    </main>
  )
}
