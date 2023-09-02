'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import logo from '../assest/logo.png'

import { baiJamjuree } from '@/app/layout'

import {UserCircle2, AppWindow, MessagesSquare, BookOpen, AlignJustify, LogOut, Home, GraduationCap, Users2} from 'lucide-react'
import { getUserName } from '@/lib/user/user'

interface SideBarProps{
    style?: string
    closeable?: boolean,
    type: string
}

export function SideBar(props: SideBarProps){

    const [isOpen, setOpen] = useState<boolean>((!props.closeable) ? true : false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {

        getUserName().then(resp => {

            const type = (resp.type == "0") ? "student" : (resp.type == "1") ? "teacher" : "instituition";

            fetch(`http://localhost:3333/${type}/${resp.id}`)
            .then(json => json.json())
            .then(data => {setUsername(data.avatarURL)})

        });

    }, [])

    return(
        <div className={(props.style == undefined) ? `fixed w-1/4 bg-azul right-0 ${!isOpen && 'translate-x-3/4'} top-0 h-screen flex flex-col py-4 px-4 gap-8 transition duration-500` : props.style}>
            {
                isOpen ?
                <div className='flex flex-row justify-center items-center gap-6 h-16'>
                    <Image src={logo} alt="logo" width={100} height={100} />
                    <p className={`text-white text-2xl ${baiJamjuree.variable} font-princ`}>Assynclass</p>
                    <button onClick={() => {(props.closeable == true || props.closeable == undefined) && setOpen(!isOpen)}} className={`bg-verde rounded-lg p-2 px-4 text-white hover:bg-verdesel ${baiJamjuree.variable} font-princ`}>X</button>
                </div>
                : 
                <div className='flex flex-col justify-center pl-2 h-16'>
                    <button onClick={() => {(props.closeable == true || props.closeable == undefined) && setOpen(!isOpen)}} className={`bg-verde flex flex-col items-center rounded-lg w-12 p-2 px-4 text-white hover:bg-verdesel ${baiJamjuree.variable} font-princ`}><AlignJustify size={28} color='white' /></button>
                </div>
            }
            <nav className='flex flex-col'>
                {
                    props.type == "professor" ?
                    // ALTERAR A ROTA DO CHAT
                    <>
                        <a href="/teacher/profile" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'>{(username == null) ? <UserCircle2 color="white" size={34} /> : <img src={username} alt="avatar" className='w-8 h-8 rounded-lg' />} Perfil</a>
                        <a href="/teacher/home" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Home color='white' size={34} /> Home</a>
                        <a href="/teacher/groups" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Users2 color='white' size={34} /> Grupos</a>
                        <a href="/teacher/whiteboard" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><AppWindow color='white' size={34} /> Lousa</a>
                        <a href="/chat" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><MessagesSquare color='white' size={34} /> Chat</a>
                        <a href="/teacher/create" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><BookOpen color='white' size={34} /> Conteúdos</a>
                        <a href="/api/disconnect" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><LogOut color='white' size={34} /> Sair</a>
                    </>
                    : props.type == "aluno" ?
                    <>
                        <a href="" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'>{(username == null) ? <UserCircle2 color="white" size={34} /> : <img src={username} alt="avatar" className='w-8 h-8 rounded-lg' />} Perfil</a>
                        <a href="/student/home" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Home color='white' size={34} /> Home</a>
                        <a href="/student/groups" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Users2 color='white' size={34} /> Grupos</a>
                        <a href="/student/mentors" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><GraduationCap color='white' size={34} /> Mentores</a>
                        <a href="/chat" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><MessagesSquare color='white' size={34} /> Chat</a>
                        <a href="/api/disconnect" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><LogOut color='white' size={34} /> Sair</a>
                    </>
                    :
                    <>
                        <a href="/instituition/profile" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'>{(username == null) ? <UserCircle2 color="white" size={34} /> : <img src={username} alt="avatar" className='w-8 h-8 rounded-lg' />} Perfil</a>
                        <a href="/instituition/home" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Home color='white' size={34} /> Home</a>
                        <a href="/api/disconnect" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><LogOut color='white' size={34} /> Sair</a>
                    
                    </>
                }
            </nav>
        </div>
    )
}