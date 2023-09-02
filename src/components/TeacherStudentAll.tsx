"use client"

import { getUserName } from "@/lib/user/user"
import { useEffect, useState } from "react"
import TeacherStudentContainer from "./TeacherStudentContainer";

export default function TeacherStudentAll(){

    const [id, setID] = useState<string>();
    const [students, setStudents] = useState<student[]>([]);
    const [searchByName, setSearch] = useState<string>("");
    const [materiasNames] = useState<string[]>(["6º ANO (FUNDAMENTAL)", "7º ANO (FUNDAMENTAL)", "8º ANO (FUNDAMENTAL)", "9º ANO (FUNDAMENTAL)", "1º ANO (MÉDIO)", "2º ANO (MÉDIO)", "3º ANO (MÉDIO)"]);

    useEffect(() => {
        getUserName().then(resp => {

            fetch(`http://localhost:3333/teacher/${resp.id}/students`)
            .then(json => json.json())
            .then(data => {
                setStudents(data)
            })
            
            setID(resp.id);
        })
    }, [])

    return(
        <div className="h-fit w-3/4 flex flex-col gap-4">
            <div>
                <label htmlFor="studentName" className={`font-bold text-xl text-azul`}>Nome do aluno: </label>
                <input type="text" onChange={(e) => setSearch(e.currentTarget.value)} value={searchByName} name="studentName" id="studentName" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' />
            </div>

            {
                students.map(aluno => {
                    if(searchByName == "")
                        return <TeacherStudentContainer key={aluno.studentID} studentID={aluno.studentID+""} teacherID={id+""} avatarURL={aluno.avatarURL} nomeAluno={aluno.studentName} serieAluno={materiasNames[Number(aluno.studentGrade)]} />
                    else if(aluno.studentName.toLowerCase().includes(searchByName.toLocaleLowerCase()))
                        return <TeacherStudentContainer key={aluno.studentID} studentID={aluno.studentID+""} teacherID={id+""} avatarURL={aluno.avatarURL} nomeAluno={aluno.studentName} serieAluno={materiasNames[Number(aluno.studentGrade)]} /> 
                })
            }

        </div>
    )
}