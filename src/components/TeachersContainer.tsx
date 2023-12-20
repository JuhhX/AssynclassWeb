import { ChevronsRight } from "lucide-react";

interface StudentTeacherContainerProps{
    teacherID: string,
    teacherName: string,
    subject: string,
    avatarURL: string,
}

export default function TeachersContainer(props: StudentTeacherContainerProps){

    return (
        <div className="flex flex-row w-full p-4 gap-8 items-center text-azul border-b-2 border-azul cursor-pointer">
            <img src={props.avatarURL} alt={`Avatar ${props.teacherName}`} className="w-10 h-10 rounded-lg" />
            <div className="w-3/5 h-full p-4">
                <h1 className="dark:text-azulsel">{props.teacherName}</h1>
                <p className="dark:text-azulsel">{props.subject}</p>
            </div>
            <a href={`/teacher/profile?teacherID=${props.teacherID}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul dark:text-azulsel" /></a>
        </div>
    )
}