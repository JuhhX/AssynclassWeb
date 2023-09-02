"use client"

import Image from 'next/image'
import logo from '../../../assest/logo.png'

import { baiJamjuree } from '../../layout'
import { useSearchParams } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';

export default function RegisterStudent(){

    const formRef = useRef<any>(null); 
    const params = useSearchParams();
    const [instID] = useState<string | null>(params.get("instID"));

    function submitForm(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(instID != null){

            const data = new FormData(event.currentTarget);
    
            fetch("http://localhost:3333/register/student", {
                method: "POST",
                body: JSON.stringify({
                    nome: data.get("nome"),
                    ra: data.get("ra"),
                    nascimento: data.get("nascimento"),
                    serie: data.get("serie"),
                    email: data.get("email"),
                    contato: data.get("contato")
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(data => {
                if(data.status == 401)
                    alert("Os dados do formulário não foram preenchidos corretamente!");
                else if(data.status == 200){
                    alert("Aluno cadastrado. \nPara se conectar ele deve usar o email do responsável e o RA como senha")
                    formRef.current.reset();
                }
            })
        }
    }

    return(
        <main className="h-screen w-full flex flex-row">
            <div className="h-full w-1/2 bg-azul border-r-24 border-verde block">
                <div className='flex flex-row items-center justify-center h-1/4'>
                    <Image src={logo} alt='Assynclass logo' width={175} height={175} />
                    <h1 className={`${baiJamjuree.variable} font-princ text-white text-4xl `}>Assynclass</h1>
                </div>
                <div className='w-full flex flex-col items-center justify-center h-3/4'>
                    <p className={`${baiJamjuree.variable} font-princ text-4xl text-white mt-1/2 -translate-y-3/4 border-b-4 border-verde`}>Cadastrar aluno</p>
                </div>
            </div>

            <div className={`${baiJamjuree.variable} font-princ flex flex-col h-full w-1/2 p-8 justify-between overflow-auto`}>
                <button className={`pointer text-azul font-bold self-end text-3xl`}>X</button>
                <form ref={formRef} className='flex flex-col w-3/4 self-center gap-4' onSubmit={submitForm}>

                    <label htmlFor="nome" className={`font-bold text-xl text-azul`}>Nome: </label>
                    <input type="text" name="nome" id="nome" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira o nome do(a) aluno(a)' />
                    
                    <label htmlFor="ra" className={`font-bold text-xl text-azul`}>RA: </label>
                    <input type="text" name="ra" id="ra" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira o RA do aluno(a)' />
                    
                    <label htmlFor="nascimento" className={`font-bold text-xl text-azul`}>Data de nascimento: </label>
                    <input type="date" name="nascimento" id="nascimento" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira a data de nascimento do aluno(a)' />
                    
                    <label htmlFor="serie" className={`font-bold text-xl text-azul`}>Série: </label>
                    <select name="serie" id="serie" className='border-b-2 w-full border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Em qual série o aluno estuda?'>
                        <option value="0">6º ano (Fundamental)</option>
                        <option value="1">7º ano (Fundamental)</option>
                        <option value="2">8º ano (Fundamental)</option>
                        <option value="3">9º ano (Fundamental)</option>
                        <option value="4">1º ano (Médio)</option>
                        <option value="5">2º ano (Médio)</option>
                        <option value="6">3º ano (Médio)</option>
                    </select>
                    
                    <label htmlFor="email" className={`font-bold text-xl text-azul`}>Email do responsável: </label>
                    <input type="text" name="email" id="email" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira o email do(a) responsável' />                    
                    
                    <label htmlFor="contato" className={`font-bold text-xl text-azul`}>Contato do responsável: </label>
                    <input type="text" name="contato" id="contato" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Insira o telefone do(a) responsável' />

                    <button type="submit" className='bg-verde rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-1/2 transition-colors hover:bg-verdesel'>Cadastrar</button>
                </form>
            </div>
        </main>
    )
}