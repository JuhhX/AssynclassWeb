"use client"

import { ChatBar } from '@/components/ChatBar';
import { getUserName } from '@/lib/user/user';
import { Home, Send, UserCircle2 } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image'
import logo from '../../assest/logo.png'

interface Messages{
    sendedByName: string,
    message: string,
    msgID: string
}

export default function TeacherChat(){

    const chatContentRef = useRef<any>();

    const [ws, setWS] = useState<WebSocket>();
    const [msg, setMsg] = useState<string>("");
    const [id, setID] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [currentChat, setCurrentChat] = useState<string>("");
    const [messages, setMessages] = useState<Messages[]>([])

    const [dataQueue, setDataQueue] = useState<any>()

    useEffect(() => {
        
        getUserName().then(res => {
            setID(res.id);
            setType(res.type)
        })
        
    }, [])
    
    useEffect(() => {
        const _ws = new WebSocket('ws://localhost:8080/')
        
            //Disparado assim que o cliente é conectado
            _ws.addEventListener("open", () => {
                _ws.send(JSON.stringify(
                    {
                        func: "add_user",
                        userID: id
                    }
                ));
            });
              
            //Recebe a mensagem do servidor
            _ws.addEventListener("message", ({ data }) => {    
                const data_decoded = JSON.parse(data);
                setDataQueue(data_decoded);
            });    

        setWS(_ws);
    }, [id])

    function enviarMensagem(e: FormEvent){
        e.preventDefault();

        ws?.send(JSON.stringify(
            {
                func: "message_to",
                firstUser: id,
                secondUser: currentChat,
                msg: msg
            }
        ));
        
        setMessages([...messages, {msgID: Math.random()+"", sendedByName: id, message: msg}])
        setMsg("");
    }

    useEffect(() => {
        if(dataQueue != undefined){
            setMessages([...messages, {msgID: dataQueue.msgID, sendedByName: dataQueue.sendedBy, message: dataQueue.msg}])
        }
    }, [dataQueue])
    
    useEffect(() => {
        if(messages.length != 0){
            chatContentRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages])

    useEffect(() => {

        if(currentChat != ""){
            fetch(`http://localhost:3333/chats/${id}/${type}/${currentChat}`)
            .then(json => json.json())
            .then((data : any) => {

                const msgResponse = data.map((m : any) => {
                    return {
                        sendedByName: m.sendedBy,
                        message: m.msg,
                        msgID: Math.random()+""
                    }
                })

                setMessages(msgResponse);
            })
        }
    }, [currentChat])

    return(
        <div className="flex flex-row w-full h-screen">
            <div className={"fixed h-3/4 flex flex-col py-4 pl-4 gap-8 left-0 w-1/4 box-border border-2 border-b-4 border-azul rounded-xl self-center rounded-tl-none rounded-bl-none"}>
                <div className='flex flex-row justify-start items-center gap-6 h-16 box-border'>
                    <a href='/teacher/home' className={`bg-verde rounded-lg p-2 px-4 text-white font-semibold flex flex-row gap-2 hover:bg-verdesel`}><Home color='white' size={24} /> VOLTAR</a>
                </div>
                {(id) && <ChatBar userID={id} userType={type} selectChat={setCurrentChat} />}
            </div>
            <main className='flex flex-col w-3/4 h-screen ml-1/4 relative pt-8 overflow-hidden'>

                <div className='self-center w-full overflow-auto flex flex-col'>
                    {
                        messages.map(m => {
                            return (
                                <div key={m.msgID} className={`flex flex-row p-8 w-3/4 self-center self-center border-2 border-b-4 rounded-xl ${(m.sendedByName == id) ? "border-verde" : "border-azul"} gap-4`}>
                                    <UserCircle2 size={40} className={`${(m.sendedByName == id) ? "text-verde" : "text-azul"}`} />
                                    <p className={`text-lg ${(m.sendedByName == id) ? "text-verde" : "text-azul"}`}>{m.message}</p>
                                </div>
                            )
                        })
                    }
                    <div ref={chatContentRef} className='h-32 w-full' />
                </div>

                <form onSubmit={(e) => {enviarMensagem(e)}} className='flex flex-row absolute w-full bottom-0 p-4 justify-center items-center gap-2'>
                    <input value={msg} onChange={(e) => setMsg(e.target.value)} type="text" name="message" id="message" placeholder='Digite uma mensagem ...' className={`rounded-xl p-6 h-8 w-3/4 border-2 border-b-4 border-azul placeholder:text-slate-700 focus:ring-0`} />
                    <button type='submit'><Send size={32} className='text-azul' /></button>
                </form>
            </main>
        </div>
    )
}