"use client"
import StudentTeacherContext from "@/components/StudentTeacherContext";
import { SideBar } from "@/components/SideBar";
import { useState } from "react";
import StudentSearchMentors from "@/components/StudentSearchMentors";

export default function StudentSearchTeacher() {

    const [showContext, setShowContext] = useState<number>(0);

    return (
        <main className="h-screen w-full flex flex-col p-8 px-16 gap-8 overflow-hidden">
            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Professores e mentores</h1>

            <div className="w-full h-full flex flex-row">
                <div className="h-1/4 w-1/5 border-2 border-b-4 border-azul rounded-xl p-4 justify-center flex flex-col items-center dark:shadow-neon-azul">
                    <button onClick={() => {setShowContext(0)}} className="text-lg text-azul transition-colors cursor-pointer hover:text-verde dark:text-azulsel">Meus professores</button>
                    <button onClick={() => {setShowContext(1)}} className="text-lg text-azul transition-colors cursor-pointer hover:text-verde dark:text-azulsel">Procurar mentores</button>
                </div>

                <div className="w-1/2 h-full flex flex-col gap-4 p-4 pt-0 pb-16">
                    
                    {
                        (showContext == 0) ?
                            <StudentTeacherContext />
                        : 
                            <StudentSearchMentors />
                    }
            
                </div>
            </div>

            <SideBar type={'aluno'} />
        </main>
    )
}
  