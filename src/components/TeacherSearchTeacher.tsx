import { useEffect, useState } from "react";
import TeachersContainer from "./TeachersContainer";

enum MateriasProf{
    MATEMATICA,
    PORTUGUES,
    CIENCIAS,
    INGLES,
    GEOGRAFIA,
    HISTORIA,
    ARTES,
    EDUCACAO_FISICA,
    FILOSOFIA,
    SOCIOLOGIA,
    FISICA,
    QUIMICA,
    BIOLOGIA
}


export default function TeacherSearchTeacher(){

    const [currentFilter, setCurrentFilter] = useState<string>("-");
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {

        const url : string = (currentFilter == "-") ? "teachers" : `teachers/${currentFilter}` 
        
        fetch(`http://localhost:3333/${url}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTeachers(data);
        })

    }, [currentFilter])

    return (
        <div className="overflow-auto border-2 border-b-4 border-azul rounded-xl p-4 scrollbar-thin scrollbar-thumb-azul dark:shadow-neon-azul">
            <div className="flex flex-col w-full">
                <label htmlFor="materia" className="text-xl text-azul font-semibold mb-4 dark:text-azulsel">Filtre por matéria: </label>
                <select name="materia" id="materia" className="text-lg text-verde p-4 border-2 border-b-4 border-verde rounded-xl" onChange={(value) => {setCurrentFilter(value.currentTarget.value)}}>
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
                (teachers) &&
                teachers.map((m) => {
                    return <TeachersContainer 
                        key={m.teacherID} 
                        teacherName={m.teacherName} 
                        subject={MateriasProf[Number(m.subjects)]+""} 
                        avatarURL={m.avatarURL}
                        teacherID={m.teacherID+""} />
                })
            }
        </div>
    )
}