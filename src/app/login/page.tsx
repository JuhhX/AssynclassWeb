import Image from 'next/image'
import logo from '../../assest/logo.png'

import LoginForm from '@/components/LoginForm'

export default function Login() {

    return (
      <main className="h-screen w-full flex flex-row justify-center box-border overflow-auto">

        <div className="h-[135%] w-1/2 bg-azul border-r-24 border-verde block absolute rotate-[35deg] -left-1/4 -top-1/2" />

        <Image src={logo} alt='Assynclass logo' width={175} height={175} className='z-10 w-[175px] h-[175px] absolute top-1/2 -translate-y-3/4 left-10' />

        <a href='/' className={`absolute right-8 top-8 pointer text-azul font-semibold text-3xl`}>X</a>
        <a href="/register/teacher" className={`pointer absolute right-8 bottom-8 pointer text-verde border-2 border-b-4 rounded-xl p-2 border-verde font-semibold text-xl dark:shadow-neon-verde`}>CRIAR CONTA</a>

        <div className={`font-princ flex flex-col h-full w-1/2 p-8 justify-center overflow-hidden`}>
            <LoginForm />
        </div>
      </main>
    )
  }
  