import { useEffect, useState } from "react";
import StudentMentorContainer from "./StudentMentorContainer";

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


export default function StudentSearchMentors(){

    const [currentFilter, setCurrentFilter] = useState<string>("-");
    const [mentors, setMentors] = useState<Teacher[]>([]);

    useEffect(() => {

        const url : string = (currentFilter == "-") ? "teachers/mentors" : `teachers/mentors/${currentFilter}` 
        
        //CORRIGIR, POIS CAUSA O ERRO DE MOSTRAR A SOLICITAÇÂO PARA ENVIAR MESMO DEPOIS DE ENVIADA
        fetch(`http://localhost:3333/${url}`)
        .then(res => res.json())
        .then(data => {
            setMentors(data);
        })

    }, [currentFilter])

    return (
        <div className="overflow-auto">
            <div className="flex flex-col w-1/2">
                <label htmlFor="materia" className="text-lg text-azul">Selecione uma matéria em que precise de mentoria: </label>
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
                mentors.map((m) => {
                    return <StudentMentorContainer 
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