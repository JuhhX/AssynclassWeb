"use client"

import { SideBarCompany } from "@/components/SideBarCompany";
import { getUserName } from "@/lib/user/user";
import { FormEvent } from "react";

export default function Coupons(){

    function addCoupons(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        getUserName().then(res => {
            fetch("http://localhost:3333/coupons", {
                method: "POST",
                body: JSON.stringify({
                    title: data.get("title"),
                    description: data.get("description"),
                    value: Number(data.get("value")),   
                    days: Number(data.get("days")),
                    codes: data.get("codes"),
                    companyID: res.id
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then(res => {
                if(res.status == 200){
                    alert("Cadastro realizado com sucesso");
                }
                else{
                    alert("UM ERRO OCORREU!");
                }
            })
        })
    }

    return(
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-20 gap-8 scrollbar-thin scrollbar-thumb-azulsel bg-white-background dark:bg-dark-background">
            
            <form onSubmit={(e) => {addCoupons(e)}} className='flex flex-col w-3/4 self-center gap-4'>
                <label htmlFor="title" className={`font-bold text-xl text-azul`}>Título: </label>
                <input type="text" name="title" id="title" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Título do cupom' />
                
                <label htmlFor="description" className={`font-bold text-xl text-azul`}>Descrição: </label>
                <input type="text" name="description" id="description" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Descrição sobre o cupom' />
                
                <label htmlFor="value" className={`font-bold text-xl text-azul`}>Valor: </label>
                <input type="text" name="value" id="value" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Por quantos pontos os usuários devem trocar? (Ex. 1200)' />

                <label htmlFor="days" className={`font-bold text-xl text-azul`}>Validade: </label>
                <input type="text" name="days" id="days" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Valido por quantos dias? (Ex. 22)' />
                
                <label htmlFor="codes" className={`font-bold text-xl text-azul`}>Códigos: </label>
                <input type="text" name="codes" id="codes" className='border-b-2 border-verde p-2 text-azul placeholder:text-azul/75 focus:ring-0' placeholder='Código dos cupons (Ex. ABCD, EFGH, IJKL, ...)' />
                
                <button type="submit" className='bg-verde rounded-lg p-2 px-4 self-start text-white font-bold text-xl w-1/2 transition-colors hover:bg-verdesel'>Cadastrar</button>
            </form>
            
            <SideBarCompany />
        </main>
    )
}