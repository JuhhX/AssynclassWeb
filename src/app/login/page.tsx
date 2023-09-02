import Image from 'next/image'
import logo from '../../assest/logo.png'

import { baiJamjuree } from '../layout'
import LoginForm from '@/components/LoginForm'

export default function Login() {

    return (
      <main className="h-screen w-full flex flex-row">
        <div className="h-full w-1/2 bg-azul border-r-24 border-verde block">
            <div className='flex flex-row items-center justify-center h-1/4'>
                <Image src={logo} alt='Assynclass logo' width={175} height={175} />
                <h1 className={`${baiJamjuree.variable} font-princ text-white text-4xl `}>Assynclass</h1>
            </div>
            <div className='w-full flex items-center justify-center h-3/4'>
                <p className={`${baiJamjuree.variable} font-princ text-4xl text-white mt-1/2 -translate-y-3/4 border-b-4 border-verde`}>Conecte-se</p>
            </div>
        </div>

        <div className={`${baiJamjuree.variable} font-princ flex flex-col h-full w-1/2 p-8 justify-between`}>
            <button className={`pointer text-azul font-bold self-end text-3xl`}>X</button>
            <LoginForm />
            <span className='self-end text-azul'>Não tem uma conta? <a href="/register/teacher" className='transition-colors hover:text-verde'>Clique aqui</a></span>
        </div>
      </main>
    )
  }
  