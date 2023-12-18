import { SideBar } from "@/components/SideBar";

export default function Activities(){
    return(
        <main className="h-screen overflow-auto w-[70%] flex flex-col p-8 px-16 gap-4 scrollbar-thin scrollbar-thumb-azulsel">
            <h1 className={`text-azul text-3xl font-semibold dark:text-azulsel`}>Atividades e jogos</h1>

            <div className="flex flex-row gap-8">
                <p className="text-xl text-azul font-semibold transition-colors cursor-pointer hover:text-verde dark:text-azulsel">Meus jogos</p>
                <p className="text-xl text-azul font-semibold transition-colors cursor-pointer hover:text-verde dark:text-azulsel">Pesquisar jogos</p>
                <a className="text-xl text-azul font-semibold transition-colors cursor-pointer hover:text-verde dark:text-azulsel" href="/game_editor">Criar novo jogo</a>
            </div>

            <SideBar type="professor" />
        </main>
    )
}