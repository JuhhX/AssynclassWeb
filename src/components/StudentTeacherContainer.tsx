'use client'
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface StudentTeacherContainerProps{
    teacherName: string,
    subject: string,
    avatarURL: string,
    teacherID: string,
    studentID: string,
}

export default function StudentTeacherContainer(props: StudentTeacherContainerProps){

    const router = useRouter();

    function createChat(){
        fetch("http://localhost:3333/createChat", {
            method: "POST",
            body: JSON.stringify({
                firstUser: props.studentID,
                secondUser: props.teacherID
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        router.push("/chat")
    }

    return (
        <div className="flex flex-row w-full p-4 gap-8 items-center text-azul border-b-2 border-azul cursor-pointer">
            <img src={props.avatarURL} alt={`Avatar ${props.teacherName}`} className="w-10 h-10 rounded-lg" />
            <div className="w-3/5 h-full p-4">
                <h1>{props.teacherName}</h1>
                <p>{props.subject}</p>
            </div>
            <div>
                <button className="cursor-pointer" onClick={() => createChat()}><MessageSquare /></button>
            </div>
        </div>
    )
}