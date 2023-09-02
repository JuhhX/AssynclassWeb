import { SideBar } from "@/components/SideBar";
import {ChevronsRight} from 'lucide-react'

export default function TeacherHome() {
  return (
    <main className="h-screen overflow-auto w-full flex flex-col p-8 px-16 gap-8">
      <h1 className={`text-azul text-3xl`}>Olá professor</h1>

      <p className="text-verde text-xl">Vamos ajudar os alunos?</p>
      <div className="w-1/2 bg-cinza p-4 rounded-lg flex flex-col">
          <p className="text-azul text-lg">Poste exercícios que possam auxiliar seus alunos no aprendizado utilizando nossas ferramentas</p>
          <a href="/teacher/create" className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <p className="text-verde text-xl">Espalhe conhecimento</p>
      <div className="w-1/2 bg-cinza p-4 rounded-lg flex flex-col">
          <p className="text-azul text-lg">Veja os alunos que solicitaram sua mentoria</p>
          <a href="/teacher/groups" className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <SideBar type="professor" />
    </main>
  )
}
  