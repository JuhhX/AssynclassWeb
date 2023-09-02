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
      <h1 className={`text-azul text-3xl`}>Olá instituição</h1>

      <p className="text-verde text-xl">Novos alunos? Que tal cadastrá-los?</p>
      <div className="w-1/2 bg-cinza p-4 rounded-lg flex flex-col">
          <p className="text-azul text-lg">Cadastre seus alunos para que os professores possam auxiliá-los</p>
          <a href={`/register/student?instID=${(instituition != null) ? instituition.instituitionID : ""}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <p className="text-verde text-xl">Cadastre seus professores 😃</p>
      <div className="w-1/2 bg-cinza p-4 rounded-lg flex flex-col">
          <p className="text-azul text-lg">Cadastrar professores</p>
          <a href={`/register/teacher?instID=${(instituition != null) ? instituition.instituitionID : ""}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <SideBar type={'instituition'} />
    </main>
  )
}
  