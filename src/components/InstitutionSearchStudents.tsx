
import { useEffect, useState } from "react";
import { getUserName } from "@/lib/user/user";
import StudentsContainer from "./StudentsContainer";
import { resolveGrade } from "@/lib/general";

enum SeriesAlunos{
    ANO_6,
    ANO_7,
    ANO_8,
    ANO_9,
    ANO_1,
    ANO_2,
    ANO_3,
}

export default function InstitutionSearchStudents(){

    const [students, setStudents] = useState<student[]>([]);

    useEffect(() => {
        
        getUserName().then(resp => {
            fetch(`http://localhost:3333/instituition/${resp.id}/students`)
            .then(res => res.json())
            .then(data => {
                setStudents(data);
            })
        })

    }, [])

    return (
        <div className="overflow-auto border-2 border-b-4 border-azul rounded-xl p-4 scrollbar-thin scrollbar-thumb-azul dark:shadow-neon-azul">
            
            {
                (students) &&
                students.map((s) => {
                    return <StudentsContainer avatarURL={s.avatarURL} studentID={String(s.studentID)} key={s.studentID} studentName={s.studentName} grade={resolveGrade(SeriesAlunos[s.studentGrade])} />
                })
            }
        </div>
    )
}