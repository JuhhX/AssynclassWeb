'use client'
import InstitutionSearchStudents from "@/components/InstitutionSearchStudents";
import { SideBar } from "@/components/SideBar";

export default function InstitutionSearchTeachers() {

    return (
        <main className="h-screen w-full flex flex-col p-8 px-16 gap-8 overflow-hidden">
            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Alunos da instituição</h1>

            <div className="w-full h-full flex flex-row">

                <div className="w-3/4 h-full flex flex-col gap-4 pt-0 pb-16">
                    <InstitutionSearchStudents />    
                </div>
            </div>

            <SideBar type={'-'} />
        </main>
    )
}
  