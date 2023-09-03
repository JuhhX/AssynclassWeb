"use client"

import GroupAll from "@/components/GroupAll";
import { SideBar } from "@/components/SideBar";

export default function StudentGroups() {

    return (
        <main className="h-screen overflow-auto w-full flex flex-col p-8 px-16 gap-4 overflow-hidden">
            <h1 className={`text-azul text-3xl font-semibold`}>Grupos</h1>

            <div className="w-3/4 h-full flex flex-col gap-4 pb-16 p-4 border-2 border-b-4 border-azul rounded-xl overflow-auto scrollbar-thin scrollbar-thumb-blue">
                <GroupAll containerType={0} />
            </div>

            <SideBar type={'aluno'} />
        </main>
    )
}
  