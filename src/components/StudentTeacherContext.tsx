"use client"

import { getUserName } from "@/lib/user/user";
import { useState, useEffect } from "react";
import StudentTeacherContainer from "./StudentTeacherContainer";

enum MateriasProf{
    MATEMATICA,
    PORTUGUES,
    CIENCIAS,
    INGLES,
    GEOGRAFIA,
    HISTORIA
}

export default function StudentTeacherContext(){

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [currentFilter, setCurrentFilter] = useState<string>("-");

    const [studentID, setStudentID] = useState<string>("");

    useEffect(() => {
        getUserName().then(resp => {

            setStudentID(resp.id);
            fetch(`http://localhost:3333/student/${resp.id}/teachers`)
            .then(json => json.json())
            .then(data => {
                setTeachers(data)
            })
        });
    }, [])

    return (
        <div className="overflow-auto">

            <div className="flex flex-col w-1/2">
                <label htmlFor="materia" className="text-lg text-azul">Selecione uma matéria: </label>
                <select name="materia" id="materia" className="text-lg text-verde" onChange={(value) => {setCurrentFilter(value.currentTarget.value)}}>
                    <option value="-">Ver todos</option>
                    <option value="0">Matémática</option>
                    <option value="1">Língua portuguesa</option>
                    <option value="2">Ciências da natureza</option>
                    <option value="3">Língua inglesa</option>
                    <option value="4">Geografia</option>
                    <option value="5">História</option>
                </select>
            </div>

            {
                teachers.map((t, index) => {
                    if(currentFilter != "-"){
                        if(t.subjects+"" == currentFilter){

                            return <StudentTeacherContainer 
                                key={index} 
                                teacherName={t.teacherName} 
                                subject={MateriasProf[Number(t.subjects)]+""} 
                                avatarURL={t.avatarURL} teacherID={t.teacherID+""}
                                studentID={studentID} />
                        }
                    }
                    else{
                        return <StudentTeacherContainer 
                                key={index} 
                                teacherName={t.teacherName} 
                                subject={MateriasProf[Number(t.subjects)]+""} 
                                avatarURL={t.avatarURL} teacherID={t.teacherID+""}
                                studentID={studentID} />
                    }
                })
            }
        </div>
    )
}