'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import logo from '../assest/logo.png'

import {AlignJustify, LogOut, BookOpenCheck, CircleDollarSign, ListChecks, BarChart, Building2} from 'lucide-react'
import { getUserName } from '@/lib/user/user'

interface SideBarCompanyProps{
    style?: string
    closeable?: boolean
}

export function SideBarCompany(props: SideBarCompanyProps){

    const [isOpen, setOpen] = useState<boolean>((!props.closeable) ? true : false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {

        getUserName().then(resp => {

            fetch(`http://localhost:3333/company/${resp.id}`)
            .then(json => json.json())
            .then(data => {setUsername(data.companyName); console.log(data);})

        });

    }, [])

    return(
        <div className={(props.style == undefined) ? `fixed w-1/4 bg-azul right-0 ${!isOpen && 'translate-x-3/4'} top-0 h-screen flex flex-col py-4 px-4 gap-8 transition duration-500` : props.style}>
            {
                isOpen ?
                <div className='flex flex-row justify-center items-center gap-6 h-16'>
                    <Image src={logo} alt="logo" width={100} height={100} />
                    <p className={`text-white text-2xl font-princ`}>Assynclass</p>
                    <button onClick={() => {(props.closeable == true || props.closeable == undefined) && setOpen(!isOpen)}} className={`bg-verde rounded-lg p-2 px-4 text-white hover:bg-verdesel font-princ`}>X</button>
                </div>
                : 
                <div className='flex flex-col justify-center pl-2 h-16'>
                    <button onClick={() => {(props.closeable == true || props.closeable == undefined) && setOpen(!isOpen)}} className={`bg-verde flex flex-col items-center rounded-lg w-12 p-2 px-4 text-white hover:bg-verdesel font-princ`}><AlignJustify size={28} color='white' /></button>
                </div>
            }
            <nav className='flex flex-col'>
                {
                    <>
                        <a href="" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><Building2 color="white" size={34} />{(username) ? username : "Carregando ..."}</a>
                        <a href="/company/coupons" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><CircleDollarSign color="white" size={34} />Cupons</a>
                        <a href="" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><BookOpenCheck color="white" size={34} />Plano</a>
                        <a href="/company/home" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><BarChart color="white" size={34} />Gráficos</a>
                        <a href="" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><ListChecks color="white" size={34} />Doações</a>
                        <a href="/api/disconnect" className='text-white text-lg flex flex-row gap-6 p-2 px-4 transition-colors rounded-l-lg hover:bg-verde'><LogOut color="white" size={34} />Sair</a>
                    </>
                }
            </nav>
        </div>
    )
}