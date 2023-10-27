import { SideBar } from "@/components/SideBar";
import {ChevronsRight} from 'lucide-react'

export default function TeacherHome() {
  return (
    <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-16 gap-4 scrollbar-thin scrollbar-thumb-azulsel">
      <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Olá professor</h1>

      <p className="text-verde text-xl font-semibold">Vamos ajudar os alunos?</p>
      <div className="w-full border-2 border-b-4 border-azul p-4 rounded-lg flex flex-col dark:shadow-neon-azul">
          <p className="text-azul text-lg dark:text-azulsel">Poste conteúdos que possam ajudar os alunos com suas dificuldades</p>
          <a href="/teacher/create" className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <p className="text-verde text-xl font-semibold">Jogando e aprendendo</p>
      <div className="w-full border-2 border-b-4 border-azul p-4 rounded-lg flex flex-col dark:shadow-neon-azul">
          <p className="text-azul text-lg dark:text-azulsel">Crie perguntas ou mini-games que possam ajudar os alunos à aprender de uma forma dinâmica</p>
          <a href="" className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <p className="text-verde text-xl font-semibold">Espalhe conhecimento</p>
      <div className="w-full border-2 border-b-4 border-azul p-4 rounded-lg flex flex-col dark:shadow-neon-azul">
          <p className="text-azul text-lg dark:text-azulsel">Veja os alunos que solicitaram sua mentoria</p>
          <a href="/teacher/groups" className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <p className="text-verde text-xl font-semibold">Como estão seus alunos?</p>
      <div className="w-full border-2 border-b-4 border-azul p-4 rounded-lg flex flex-col dark:shadow-neon-azul">
          <p className="text-azul text-lg dark:text-azulsel">Veja os gráficos sobre seus alunos</p>
          <a href="" className="self-end inline-block"><ChevronsRight size={32} className="text-azul" /></a>
      </div>

      <SideBar type="professor" />
    </main>
  )
}
  