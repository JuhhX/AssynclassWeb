"use client"

import GroupAll from "@/components/GroupAll";
import { SideBar } from "@/components/SideBar";

export default function StudentGroups() {

    return (
        <main className="h-screen overflow-auto w-full flex flex-col p-8 px-16 gap-8 overflow-hidden">
        <h1 className={`text-azul text-3xl`}>Grupos</h1>

        <div className="w-4/5 h-full flex flex-col gap-4 p-4 pb-16 overflow-auto">
            <GroupAll containerType={0} />
        </div>

        <SideBar type={'aluno'} />
        </main>
    )
}
  