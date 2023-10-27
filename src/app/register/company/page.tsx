"use client"

import Image from 'next/image'
import logo from '../../../assest/logo.png'

import { Building2, GraduationCap, School } from 'lucide-react'
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';


export default function RegisterCompany(){
    const router = useRouter();

    function registerInstituition(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        //TRANSFORMA O QUE VEIO DO FORMULÁRIO EM DADOS.
        const data = new FormData(event.currentTarget);
        
        //CONFIGURAR ROTA PARA EMPRESA
        // fetch("http://localhost:3333/register/instituition", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         nome: data.get("nome"),
        //         cnpj: data.get("cnpj"),
        //         email: data.get("email"),
        //         password: data.get("password"),
        //         confirmpassword: data.get("confirmpassword"),
        //         contato: data.get("contato")
        //     }),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // })
        // .then(data => {

        //     if(data.status == 401)
        //         alert("Os dados do formulário não foram preenchidos corretamente!");
        //     else if(data.status == 200){
        //         alert("Você será redirecionado para a tela de login para se conectar ao sistema.")
        //         router.push("/login")
        //     }
        // })
    }

    return(
        <main className="h-screen w-full flex flex-row">
            <div className="h-full w-1/2 bg-azul border-r-24 border-verde block">
                <div className='flex flex-row items-center justify-center h-1/4'>
                    <Image src={logo} alt='Assynclass logo' width={175} height={175} />
                    <h1 className={`text-white text-4xl `}>Assynclass</h1>
                </div>
                <div className='w-full flex flex-col items-center justify-center h-3/4'>
                    <p className={`text-4xl text-white mt-1/2 -translate-y-3/4 border-b-4 border-verde`}>Cadastre-se</p>
                    <a href="/register/teacher" className='flex flex-row p-4 gap-4 text-white text-xl items-center'><GraduationCap size={52} className='text-white rounded-full p-2 bg-verde text-xl' /> Sou professor</a>
                    <a href="/register/school" className='flex flex-row p-4 gap-4 text-white text-xl items-center'><School size={52} className='text-white rounded-full p-2 bg-verde text-xl' /> Sou uma instituição</a>
                    <a href="/register/company" className='flex flex-row p-4 gap-4 text-white text-xl items-center'><Building2 size={52} className='text-white rounded-full p-2 bg-verde text-xl' /> Sou uma empresa</a>
                </div>
            </div>

            <div className={`flex flex-col h-full w-1/2 p-8 justify-between overflow-auto`}>
                <a href='/' className={`pointer text-azul font-bold self-end text-3xl`}>X</a>
                <form className='flex flex-col w-3/4 self-center gap-4' onSubmit={(e) => registerInstituition(e)}>
                    
                    <label htmlFor="nome" className={`font-bold text-xl text-azul`}>Nome: </label>
                    <input type="text" name="nome" id="nome" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira o nome da sua empresa' />
                    
                    <label htmlFor="cnpj" className={`font-bold text-xl text-azul`}>CNPJ: </label>
                    <input type="text" name="cnpj" id="cnpj" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira o cnpj' />
                    
                    <label htmlFor="email" className={`font-bold text-xl text-azul`}>Email: </label>
                    <input type="email" name="email" id="email" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira seu email' />

                    <label htmlFor="password" className={`font-bold text-xl text-azul`}>Senha: </label>
                    <input type="password" name="password" id="password" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira sua senha' />
                    
                    <label htmlFor="confirmpassword" className={`font-bold text-xl text-azul`}>Confirmar senha: </label>
                    <input type="password" name="confirmpassword" id="confirmpassword" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Confirme sua senha' />

                    <label htmlFor="contato" className={`font-bold text-xl text-azul`}>Contato: </label>
                    <input type="text" name="contato" id="contato" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira um telefone para contato' />

                    <button type="submit" className='bg-verde rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-1/2 transition-colors hover:bg-verdesel'>Cadastrar</button>
                </form>
                <a href="/login" className='self-end text-azul inline-block transition-colors hover:text-verde'>Já possuo uma conta</a>
            </div>
        </main>
    )
}
