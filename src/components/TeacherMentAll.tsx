"use client"

import { getUserName } from "@/lib/user/user"
import { useEffect, useState } from "react"
import TeacherMentContainer from "./TeacherMentContainer";

interface RequestResponse{
    requisition: RequestMentor,
    student: student
}

export default function TeacherMentAll(){

    const [requests, setRequests] = useState<RequestResponse[]>([]);
    const [materiasNames] = useState<string[]>(["6º ANO (FUNDAMENTAL)", "7º ANO (FUNDAMENTAL)", "8º ANO (FUNDAMENTAL)", "9º ANO (FUNDAMENTAL)", "1º ANO (MÉDIO)", "2º ANO (MÉDIO)", "3º ANO (MÉDIO)"]);

    useEffect(() => {
        getUserName().then(resp => {

            fetch(`http://localhost:3333/requests/${resp.id}`)
            .then(json => json.json())
            .then(data => setRequests(data))
        
        })
    }, [])

    return(
        <div className="h-fit w-3/4 flex flex-col gap-4">

            {
                requests.map(r => {
                    return <TeacherMentContainer key={r.student.studentID} requisition={r.requisition} avatarURL={r.student.avatarURL} nomeAluno={r.student.studentName} serieAluno={materiasNames[Number(r.student.studentGrade)]} />
                })
            }

        </div>
    )
}