"use client"

import { getUserName } from "@/lib/user/user"
import { useEffect, useState } from "react"
import TeacherGroupContainer from "./TeacherGroupContainer";

interface GroupAllProps{
    openAtr?: Function
    setGroups?: Function
    containerType: number
}

export default function GroupAll(props: GroupAllProps){

    const [groups, setGroups] = useState<studentsGroups[]>([]);
    const [searchByName, setSearch] = useState<string>("");

    useEffect(() => {
        getUserName().then(resp => {

            const type = (resp.type == "0") ? "student" : "teacher"

            fetch(`http://localhost:3333/${type}/${resp.id}/groups`)
            .then(json => json.json())
            .then(data => {
                setGroups(data)
                if(props.containerType == 1 && props.setGroups != undefined)
                    props.setGroups(data);
            })
        
        })
    }, [])

    return(
        <div className="h-fit w-full flex flex-col gap-4 py-4">
            <div className="flex flex-col w-full">
                <input type="text" placeholder="Nome do grupo" onChange={(e) => setSearch(e.currentTarget.value)} value={searchByName} name="studentName" id="studentName" className='w-3/4 self-center border-2 border-verde p-2 font-semibold rounded-xl text-verde text-lg placeholder:text-verde/75 focus:ring-0' />
            </div>

            {
                groups.map(g => {
                    if(searchByName == "")
                        return <TeacherGroupContainer key={g.groupID} groupID={g.groupID} containerType={props.containerType} openAtr={(props.openAtr != undefined) ? props.openAtr : undefined} groupName={g.groupName} groupDescription={g.groupDescription} groupAvatar={g.groupAvatar} />
                    else if(g.groupName.toLowerCase().includes(searchByName.toLocaleLowerCase()))
                        return <TeacherGroupContainer key={g.groupID} groupID={g.groupID} containerType={props.containerType} openAtr={(props.openAtr != undefined) ? props.openAtr : undefined} groupName={g.groupName} groupDescription={g.groupDescription} groupAvatar={g.groupAvatar} />
                })
            }
        </div>
    )
}