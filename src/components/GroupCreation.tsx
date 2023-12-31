"use client"
import { FormEvent, useEffect, useRef, useState } from "react";
import StudentGroupCreateContainer from "./StudentGCC";
import { getUserName } from "@/lib/user/user";

export default function GroupCreation(){

    const [students, setStudents] = useState<student[]>([]);
    const formRef = useRef<any>();
    const [studentsSelected, setStudentsSelected] = useState<(student | undefined)[]>([]);
    const [studentsName, setStudentsName] = useState<string>("");
    const [teacherID, setTeacherID] = useState<string>("");
    const [materiasNames] = useState<string[]>(["6º ANO (FUNDAMENTAL)", "7º ANO (FUNDAMENTAL)", "8º ANO (FUNDAMENTAL)", "9º ANO (FUNDAMENTAL)", "1º ANO (MÉDIO)", "2º ANO (MÉDIO)", "3º ANO (MÉDIO)"]);

    const [groupName, setGroupName] = useState<string>("");
    const [groupDescription, setGroupDescription] = useState<string>("");

    function create(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        fetch("http://localhost:3333/teacher/createGroup", {
            method: "POST",
            body: JSON.stringify({
                groupName: groupName,
                description: groupDescription,
                integrantes: studentsName,
                teacherID: data.get("teacherID")
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(res => {
            if(res.status == 200){
                alert('Grupo criado com sucesso!');
            }
        })

        formRef.current.reset();
        setStudentsName("");
    }

    useEffect(() => {
        getUserName().then(resp => {

            setTeacherID(resp.id);

            fetch(`http://localhost:3333/teacher/${resp.id}/students`)
            .then(json => json.json())
            .then(data => setStudents(data))
        
        }) 
    }, [])

    useEffect(() => {

        const ids = studentsName.toLowerCase().split(",").map(s => {return s.trim()});

        const students_selected : (student | undefined)[] = students.map(s => {
            if(ids.includes(s.studentName.toLowerCase()) || ids.includes(s.studentID+""))
                return s;
        }).filter(s => s !== undefined); 

        setStudentsSelected(students_selected);

    }, [studentsName])

    return (
        <form className="h-fit w-3/4 flex flex-col gap-4" onSubmit={create} ref={formRef}>
            <label htmlFor="groupName" className={`font-bold text-xl text-azul`}>Nome do grupo: </label>
            <input type="text" name="groupName" id="groupName" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira o nome do grupo' value={groupName} onChange={(e) => {setGroupName(e.target.value)}} />
            
            <label htmlFor="description" className={`font-bold text-xl text-azul`}>Descrição do grupo: </label>
            <input type="text" name="description" id="description" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira uma descrição para o grupo' value={groupDescription} onChange={(e) => {setGroupDescription(e.target.value)}} />
            
            <label htmlFor="integrantes" className={`font-bold text-xl text-azul`}>Integrantes (Separado por vírgulas): </label>
            <input type="text" value={studentsName} onChange={(e) => {setStudentsName(e.currentTarget.value)}} name="integrantes" id="integrantes" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira o nome ou código dos participantes' />

            <input type="text" name="teacherID" className="hidden" value={teacherID} onChange={(e) => {setTeacherID(e.currentTarget.value)}}  />

            {
                studentsSelected.map(s => {
                    return <StudentGroupCreateContainer key={s?.studentID} avatarURL={s?.avatarURL} studentName={s?.studentName} serieStudent={materiasNames[Number(s?.studentGrade)]} />
                })
            }

            <div className="flex flex-row gap-4">
                <button type="submit" className='bg-verde rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-fit transition-colors hover:bg-verdesel'>Criar</button>
                <button type="submit" className='bg-vermelho rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-fit transition-colors'>Cancelar</button>
            </div>
        </form>
    )
}