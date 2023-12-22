'use client'

import { useEffect, useState } from 'react'

import {UserCircle2, AppWindow, MessagesSquare, BookOpen, AlignJustify, LogOut, Home, GraduationCap, Users2, BarChart, Gamepad2, Moon, SunDim, ListChecks, CircleDollarSign, BrainCircuit} from 'lucide-react'
import { getUserName } from '@/lib/user/user'

import { useTheme } from "next-themes";

interface SideBarProps{
    style?: string
    closeable?: boolean,
    type: string
}

export function SideBar(props: SideBarProps){

    const [isOpen, setOpen] = useState<boolean>((!props.closeable) ? true : false);
    const [username, setUsername] = useState<string | null>(null);

    const {theme, setTheme} = useTheme();
    const [themeType, setThemeType] = useState<boolean>(true)

    const [userType, setUserType] = useState<string>("");

    useEffect(() => {

        getUserName().then(resp => {

            const type = (resp.type == "0") ? "student" : (resp.type == "1") ? "teacher" : "instituition";
            setUserType(type);

            fetch(`http://localhost:3333/${type}/${resp.id}`)
            .then(json => json.json())
            .then(data => {setUsername(data.avatarURL)})

        });

    }, [])

    useEffect(() => {
        if(theme == "light")
            setThemeType(true);
        else
            setThemeType(false);
    }, [theme])

    return(
        <div className={(props.style == undefined) ? `fixed w-1/4 rounded-3xl rounded-tr-none rounded-br-none border-2 border-b-4 border-azul right-0 ${!isOpen && 'translate-x-3/4'} top-1/2 -translate-y-1/2 h-3/4 flex flex-col py-4 px-4 gap-8 transition duration-500 dark:shadow-neon-azul` : props.style}>
            {
                isOpen ?
                <div className='flex flex-row justify-end items-center h-16 px-4'>
                    <button onClick={() => {(props.closeable == true || props.closeable == undefined) && setOpen(!isOpen)}} className={`text-verde text-3xl font-bold hover:text-verdesel`}>X</button>
                </div>
                : 
                <div className='flex flex-col justify-center pl-2 h-16'>
                    <button onClick={() => {(props.closeable == true || props.closeable == undefined) && setOpen(!isOpen)}} className={`bg-verde flex flex-col items-center rounded-lg w-12 p-2 px-4 text-white hover:bg-verdesel`}><AlignJustify size={28} color='white' /></button>
                </div>
            }
            <nav className='flex flex-col pr-2 overflow-auto scrollbar-thin scrollbar-thumb-verde'>
                {
                    userType == "teacher" ?
                    // ALTERAR A ROTA DO CHAT
                    <>
                        <a href="/teacher/profile" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'>{(username == null) ? <UserCircle2 color="white" size={34} /> : <img src={username} alt="avatar" className='w-8 h-8 rounded-lg' />} Perfil</a>
                        <a href="/teacher/home" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Home color='#5B61CE' size={34} /> Home</a>
                        <a href="/teacher/groups" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Users2 color='#5B61CE' size={34} /> Grupos</a>
                        <a href="/teacher/search_teacher" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><GraduationCap color='#5B61CE' size={34} /> Procurar professores</a>
                        <a href="" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><BarChart color='#5B61CE' size={34} /> Gráficos</a>
                        <a href="/teacher/create" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><BookOpen color='#5B61CE' size={34} /> Conteúdos</a>
                        <a href="/teacher/activities" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Gamepad2 color='#5B61CE' size={34} /> Atividades</a>
                        <a href="/teacher/whiteboard" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><AppWindow color='#5B61CE' size={34} /> Lousa</a>
                        <a href="/mind_map" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><BrainCircuit color='#5B61CE' size={34} /> Mapas Mentais</a>
                        <a href="/coupons" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><CircleDollarSign color='#5B61CE' size={34} /> Cupons</a>
                        <a href="/chat" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><MessagesSquare color='#5B61CE' size={34} /> Chat</a>
                        <a href="/api/disconnect" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><LogOut color='#5B61CE' size={34} /> Sair</a>
                    </>
                    : userType == "student" ?
                    <>
                        <a href="/student/profile" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'>{(username == null) ? <UserCircle2 color="#5B61CE" size={34} /> : <img src={username} alt="avatar" className='w-8 h-8 rounded-lg' />} Perfil</a>
                        <a href="/student/home" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Home color='#5B61CE' size={34} /> Home</a>
                        <a href="/student/groups" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Users2 color='#5B61CE' size={34} /> Grupos</a>
                        <a href="/student/mentors" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><GraduationCap color='#5B61CE' size={34} /> Mentores</a>
                        <a href="/mind_map" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><BrainCircuit color='#5B61CE' size={34} /> Mapas Mentais</a>
                        <a href="/coupons" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><CircleDollarSign color='#5B61CE' size={34} /> Cupons</a>
                        <a href="/chat" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><MessagesSquare color='#5B61CE' size={34} /> Chat</a>
                        <a href="/api/disconnect" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><LogOut color='#5B61CE' size={34} /> Sair</a>
                    </>
                    :
                    <>
                        <a href="/instituition/profile" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'>{(username == null) ? <UserCircle2 color="white" size={34} /> : <img src={username} alt="avatar" className='w-8 h-8 rounded-lg' />} Perfil</a>
                        <a href="/instituition/home" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Home color='#5B61CE' size={34} /> Home</a>
                        <a href="" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><BarChart color='#5B61CE' size={34} /> Gráficos</a>
                        <a href="" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><GraduationCap color='#5B61CE' size={34} /> Alunos</a>
                        <a href="" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Users2 color='#5B61CE' size={34} /> Professores</a>
                        <a href="/coupons" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><CircleDollarSign color='#5B61CE' size={34} /> Cupons</a>
                        <a href="" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><ListChecks color='#5B61CE' size={34} /> Doações</a>
                        <a href="/api/disconnect" className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><LogOut color='#5B61CE' size={34} /> Sair</a>
                    </>
                }
                {
                    (themeType) ?
                        <button className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde' onClick={() => {theme == "light" ? setTheme("dark") : setTheme("light")}}><Moon color='#5B61CE' size={34} /> Modo escuro</button>
                    :
                        <button className='text-azulsel font-semibold text-xl flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde' onClick={() => {theme == "light" ? setTheme("dark") : setTheme("light")}}><SunDim color='#5B61CE' size={34} /> Modo claro</button>
                }
            </nav>
        </div>
    )
}