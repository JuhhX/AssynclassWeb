"use client"
import StudentTeacherContext from "@/components/StudentTeacherContext";
import { SideBar } from "@/components/SideBar";
import { useState } from "react";
import StudentSearchMentors from "@/components/StudentSearchMentors";

export default function StudentSearchTeacher() {

    const [showContext, setShowContext] = useState<number>(0);

    return (
        <main className="h-screen overflow-auto w-full flex flex-col p-8 px-16 gap-8 overflow-hidden">
            <h1 className={`text-azul text-3xl`}>Professores e mentores</h1>

            <div className="w-full h-full flex flex-row">
                <div className="h-full w-1/5 border-r-2 border-azul">
                    <button onClick={() => {setShowContext(0)}} className="text-lg text-azul transition-colors cursor-pointer hover:text-verde">Meus professores</button>
                    <button onClick={() => {setShowContext(1)}} className="text-lg text-azul transition-colors cursor-pointer hover:text-verde">Procurar mentores</button>
                </div>

                <div className="w-4/5 h-full flex flex-col gap-4 p-4">
                    
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
  