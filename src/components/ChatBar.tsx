'use client'

import {UserCircle2} from 'lucide-react'
import { useEffect, useState } from 'react'

interface ChatBarProps{
    userID: string | null,
    userType: string | null,
    selectChat: Function
}

interface ChatInfo{
    idChat: string,
    secondUser: string,
    secondUserName: string,
    messages: string[]
}

export function ChatBar(props: ChatBarProps){

    const [chats, setChats] = useState<ChatInfo[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3333/chats/${props.userID}/${props.userType}`)
        .then(json => json.json())
        .then(data => {
            setChats(data);
            try{
                props.selectChat(data[0].secondUser)
            }catch{}
        })

    }, [])

    return(
        <nav className='flex flex-col'>
            {
                (props.userID) &&
                chats.map(c => {
                    //Importar o icone do sujeito ainda
                    return <button onClick={() => {props.selectChat(c.secondUser)}} key={c.idChat} className='text-azul text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg cursor-pointer hover:bg-verde'><UserCircle2 color='#2E34A6' size={34} />{c.secondUserName}</button>
                })
            }
        </nav>
        
    )
}