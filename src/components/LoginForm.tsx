'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

import jwt_Decode from "jwt-decode";
import { setCookie } from "@/lib/auth/auth";

export default function LoginForm(){

    const router = useRouter();
    const [error, setError] = useState<boolean>(false)

    async function connect(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(false);

        //TRANSFORMA O QUE VEIO DO FORMULÁRIO EM DADOS.
        const data = new FormData(event.currentTarget);
        
        fetch("http://localhost:3333/login", {
            method: "POST",
            body: JSON.stringify({
                code: data.get("user"),
                password: data.get("password")
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status == 401)
                setError(true);
            else if(data.status == 201){
                //REDIRECIONA PARA A ROTA QUE ENVIARÁ O USUÁRIO PARA SUA DEVIDA PÁGINA
                const type : any = jwt_Decode(data.token);
                
                setCookie(data.token)

                router.push("/api?type="+type.type)

            }
        })
    }

    return(
        <form className='flex flex-col w-3/4 self-center gap-8' onSubmit={connect}>

            <h1 className="text-azul font-bold text-4xl self-center">CONECTE-SE</h1>

            {
                (error) && 
                <div className="w-full bg-vermelho p-2 rounded-xl">
                    <p className="text-xl text-white text-center">Usuário ou senha incorretos!</p>
                </div>
            }

            <div className="w-3/4 self-center flex flex-col gap-4">
                <input type="text" onClick={() => {setError(false)}} name="user" id="user" className='w-full text-xl border-2 border-verde rounded-lg p-2 text-azul font-fredoka400 placeholder:text-azul/75 focus:ring-0' placeholder='Email ou código de entrada' />

                <input type="password" name="password" id="password" className='w-full text-xl border-2 border-verde rounded-lg p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Senha' />
            </div>

            <button type="submit" className='bg-verde self-center rounded-xl p-2 px-4 self-start text-white font-bold text-xl w-1/4 transition-colors hover:bg-verdesel'>ENTRAR</button>

        </form>
    )
}