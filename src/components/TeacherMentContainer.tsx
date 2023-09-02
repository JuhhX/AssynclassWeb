import { PlusCircle, XCircle } from "lucide-react"
import { useState } from "react"

interface TeacherMentContainerProps{
    nomeAluno: string,
    serieAluno: string,
    avatarURL: string,
    requisition: RequestMentor
}

export default function TeacherMentContainer(props : TeacherMentContainerProps){

    const [showReq, setShowReq] = useState<string>("flex");

    function sendDecisionRequest(value: boolean){
        fetch('http://localhost:3333/acceptStudent', {
            method: "POST",
            body: JSON.stringify({
                idStudent: props.requisition.studentID,
                idTeacher: props.requisition.teacherID,
                idRequest: props.requisition.requestID,
                accept: value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        setShowReq("hidden");
        alert((value) ? "Aluno aceito 😃" : "Aluno recusado ☹");
    }

    return (
        <div className={`${showReq} flex-row w-3/5 p-4 gap-8 items-center text-azul border-b-2 border-azul cursor-pointer`}>
            <img src={props.avatarURL} alt={`Avatar ${props.nomeAluno}`} className="w-10 h-10 rounded-lg" />
            <div className="w-3/5 h-full p-4">
                <h1>{props.nomeAluno}</h1>
                <p>{props.serieAluno}</p>
            </div>
            <div className="flex flex-row justify-around gap-4">
                <PlusCircle onClick={() => {sendDecisionRequest(true)}} size={32} color="green" />
                <XCircle onClick={() => {sendDecisionRequest(false)}} size={32} color="red" />
            </div>
        </div>
    )
}