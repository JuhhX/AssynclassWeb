'use client'

import CreateNewComponent from "@/components/CreateNewComponent";
import { SideBar } from "@/components/SideBar";
import TeacherGames from "@/components/TeacherGames";
import { useState } from "react";

export default function Activities(){

    const [showView, setView] = useState<number>(0);
    const [views] = useState([<TeacherGames />, null, <CreateNewComponent />])

    return(
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-16 gap-4 scrollbar-thin scrollbar-thumb-azulsel">
            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Atividades e jogos</h1>

            <div className="flex flex-row gap-8">
                <button className="text-xl text-azul font-semibold transition-colors cursor-pointer hover:text-verde dark:text-azulsel" onClick={() => setView(0)}>Meus jogos</button>
                <button className="text-xl text-azul font-semibold transition-colors cursor-pointer hover:text-verde dark:text-azulsel" onClick={() => setView(1)}>Pesquisar jogos</button>
                <button className="text-xl text-azul font-semibold transition-colors cursor-pointer hover:text-verde dark:text-azulsel" onClick={() => setView(2)}>Criar novo jogo</button>
            </div>

            {
                views[showView]
            }

            <SideBar type="professor" />
        </main>
    )
}