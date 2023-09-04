"use client"

import { SideBar } from "@/components/SideBar";
import { getUserName } from "@/lib/user/user";
import {ChevronsRight} from 'lucide-react'
import { useEffect, useState } from "react";

export default function InstituitionHome() {

  const [instituition, setInstituition] = useState<Institution | null>(null);

  useEffect(() => {
    getUserName().then(res => {
      fetch(`http://localhost:3333/instituition/${res.id}`)
      .then(json => json.json())
      .then(data => {
        setInstituition(data);
      })
    })
  }, [])

  return (
    <main className="h-screen overflow-auto w-full flex flex-col p-8 px-16 gap-8">
      <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Olá instituição</h1>

      <p className="text-verde text-xl font-semibold">Novos alunos? Que tal cadastrá-los?</p>
      <div className="w-1/2 p-4 rounded-lg flex flex-col border-2 border-b-4 bg-transparent border-azul">
          <p className="text-azul text-lg dark:text-azulsel">Cadastre seus alunos para que os professores possam auxiliá-los</p>
          <a href={`/register/student?instID=${(instituition != null) ? instituition.instituitionID : ""}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <p className="text-verde text-xl font-semibold">Cadastre seus professores 😃</p>
      <div className="w-1/2 p-4 rounded-lg flex flex-col border-2 border-b-4 bg-transparent border-azul">
          <p className="text-azul text-lg dark:text-azulsel">Cadastrar professores</p>
          <a href={`/register/teacher?instID=${(instituition != null) ? instituition.instituitionID : ""}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <SideBar type={'instituition'} />
    </main>
  )
}
  