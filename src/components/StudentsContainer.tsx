// import { ChevronsRight } from "lucide-react";

interface StudentTeacherContainerProps{
    studentID: string,
    studentName: string,
    grade: string,
    avatarURL: string,
}

export default function StudentsContainer(props: StudentTeacherContainerProps){

    return (
        <div className="flex flex-row w-full p-4 gap-8 items-center text-azul border-b-2 border-azul cursor-pointer">
            <img src={props.avatarURL} alt={`Avatar ${props.studentName}`} className="w-10 h-10 rounded-lg" />
            <div className="w-3/5 h-full p-4">
                <h1 className="dark:text-azulsel">{props.studentName}</h1>
                <p className="dark:text-azulsel">{props.grade}</p>
            </div>
            {/* <a href={`/teacher/profile?teacherID=${props.teacherID}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul dark:text-azulsel" /></a> */}
        </div>
    )
}