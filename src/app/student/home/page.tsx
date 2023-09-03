'use client'

import { SideBar } from "@/components/SideBar";
import { getUserName } from "@/lib/user/user";
import {ChevronsRight} from 'lucide-react'
import { useEffect, useState } from "react";

export default function StudentHome() {

  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    getUserName().then(res => {
      fetch(`http://localhost:3333/studentContents/${res.id}`)
      .then(json => json.json())
      .then(data => {
        setContents(data);
      })
    })
  }, [])

  return (
    <main className="h-screen overflow-auto w-full flex flex-col p-8 px-20 gap-8">
      <h1 className={`text-azul text-3xl font-semibold`}>Olá aluno</h1>

      <div className="flex flex-row gap-8">
        <p className="text-xl text-azul transition-colors cursor-pointer hover:text-verde">Conteúdos novos</p>
        <p className="text-xl text-azul transition-colors cursor-pointer hover:text-verde">Você já viu</p>
      </div>

      {
        contents.map((c) => {
          return (
            <div key={c.contentID} className="w-1/2 border-2 border-b-4 border-azul p-4 rounded-xl flex flex-col">
                <h1 className="text-azul text-xl font-semibold">{c.contentName}</h1>
                <p className="text-azul text-lg">{c.contentDescription}</p>
                <a href={`/teacher/create?teacherID=${c.teacherID}&contentID=${c.contentID}`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
            </div>
          )
        })
      }

      <SideBar type={'aluno'} />
    </main>
  )
}
  