"use client"

import Image from 'next/image'
import logo from '../../../assest/logo.png'

import { baiJamjuree } from '../../layout'

import { GraduationCap, PlusCircle, School } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RegisterTeacher(){

    const router = useRouter();
    const params = useSearchParams();

    const [instID] = useState<string | null>(params.get("instID"));

    function submitForm(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        fetch("http://localhost:3333/register/teacher", {
            method: "POST",
            body: JSON.stringify({
                nome: data.get("user"),
                cpf: data.get("cpf"),
                email: data.get("email"),
                password: data.get("password"),
                confirmpassword: data.get("confirmpassword"),
                materia: [data.get("materias")],
                serie: [data.get("series")],
                instituicao: (data.get("instituicoes") == "") ? [] : [data.get("instituicoes")] 
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(data => {
            if(data.status == 401)
                alert("Os dados do formulário não foram preenchidos corretamente!");
            else if(data.status == 200){
                alert("Você será redirecionado para a tela de login para se conectar ao sistema.")
                router.push("/login")
            }
        })
    }

    return(
        <main className="h-screen w-full flex flex-row">
            <div className="h-full w-1/2 bg-azul border-r-24 border-verde block">
                <div className='flex flex-row items-center justify-center h-1/4'>
                    <Image src={logo} alt='Assynclass logo' width={175} height={175} />
                    <h1 className={`${baiJamjuree.variable} font-princ text-white text-4xl `}>Assynclass</h1>
                </div>
                <div className='w-full flex flex-col items-center justify-center h-3/4'>
                    <p className={`${baiJamjuree.variable} font-princ text-4xl text-white mt-1/2 -translate-y-3/4 border-b-4 border-verde`}>Cadastre-se</p>
                    <a href="/register/teacher" className='flex flex-row p-4 gap-4 text-white text-xl items-center'><GraduationCap size={52} className='text-white rounded-full p-2 bg-verde text-xl' /> Sou professor</a>
                    <a href="/register/school" className='flex flex-row p-4 gap-4 text-white text-xl items-center'><School size={52} className='text-white rounded-full p-2 bg-verde text-xl' /> Sou uma instituição</a>
                </div>
            </div>

            <div className={`${baiJamjuree.variable} font-princ flex flex-col h-full w-1/2 p-8 justify-between overflow-auto`}>
                <button className={`pointer text-azul font-bold self-end text-3xl`}>X</button>
                <form className='flex flex-col w-3/4 self-center gap-4' onSubmit={submitForm}>
                    
                    <label htmlFor="user" className={`font-bold text-xl text-azul`}>Nome: </label>
                    <input type="text" name="user" id="user" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira seu nome completo' />
                    
                    <label htmlFor="cpf" className={`font-bold text-xl text-azul`}>CPF: </label>
                    <input type="text" name="cpf" id="cpf" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira seu cpf' />
                    
                    <label htmlFor="password" className={`font-bold text-xl text-azul`}>Senha: </label>
                    <input type="password" name="password" id="password" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira sua senha' />
                    
                    <label htmlFor="confirmpassword" className={`font-bold text-xl text-azul`}>Confirmar senha: </label>
                    <input type="password" name="confirmpassword" id="confirmpassword" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Confirme sua senha' />
                    
                    <label htmlFor="email" className={`font-bold text-xl text-azul`}>Email: </label>
                    <input type="email" name="email" id="email" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira seu email' />

                    <label htmlFor="materias" className={`font-bold text-xl text-azul`}>Matéria(s): </label>
                    <div className={`flex flex-row gap-4 w-full`}>
                        <select name="materias" id="materias" className='border-b-2 w-11/12 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Quais matérias você leciona?'>
                            <option value="0">Matémática</option>
                            <option value="1">Língua portuguesa</option>
                            <option value="2">Ciências da natureza</option>
                            <option value="3">Língua inglesa</option>
                            <option value="4">Geografia</option>
                            <option value="5">História</option>
                            <option value="6">Artes</option>
                            <option value="7">Educação física</option>
                            <option value="8">Filosofia</option>
                            <option value="9">Sociologia</option>
                            <option value="10">Física</option>
                            <option value="11">Química</option>
                            <option value="12">Biologia</option>
                        </select>
                        <button className='pointer'><PlusCircle size={32} className='bg-verde rounded-full text-white' /></button>
                    </div>
                    
                    <label htmlFor="series" className={`font-bold text-xl text-azul`}>Série(s): </label>
                    <div className={`flex flex-row gap-4 w-full`}>
                        <select name="series" id="series" className='border-b-2 w-11/12 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Para quais séries você dá aula?'>
                            <option value="0">6º ano (Fundamental)</option>
                            <option value="1">7º ano (Fundamental)</option>
                            <option value="2">8º ano (Fundamental)</option>
                            <option value="3">9º ano (Fundamental)</option>
                            <option value="4">1º ano (Médio)</option>
                            <option value="5">2º ano (Médio)</option>
                            <option value="6">3º ano (Médio)</option>
                        </select>
                        <button className='pointer'><PlusCircle size={32} className='bg-verde rounded-full text-white' /></button>
                    </div>
                    
                    <label htmlFor="instituicoes" className={`font-bold text-xl text-azul`}>Instituição(s): </label>
                    <div className={`flex flex-row gap-4 w-full`}>
                        <input value={(instID != null) ? instID : ""} type="text" name="instituicoes" id="instituicoes" className='border-b-2 w-11/12 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Em qual(is) instituição(s)?' />
                        <button className='pointer'><PlusCircle size={32} className='bg-verde rounded-full text-white' /></button>
                    </div>

                    <button type="submit" className='bg-verde rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-1/2 transition-colors hover:bg-verdesel'>Cadastrar</button>
                </form>
                <a href="/login" className='self-end text-azul inline-block transition-colors hover:text-verde'>Já possuo uma conta</a>
            </div>
        </main>
    )
}