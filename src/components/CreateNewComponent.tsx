import { ChevronsRight } from "lucide-react";


export default function CreateNewComponent(){
    return(
        <div className="flex flex-col gap-4">
            <p className="text-2xl text-azul font-semibold transition-colors cursor-pointerdark:text-azulsel">Criar</p>

            <div className="w-full border-2 border-b-4 border-azul p-4 rounded-xl flex flex-col dark:shadow-neon-azul">
                <h1 className="text-azul text-xl font-semibold dark:text-azulsel">{"Em branco"}</h1>
                <p className="text-azul text-lg dark:text-azulsel">Crie um jogo/atividade do zero.</p>
                <a href={`/game_editor`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul dark:text-azulsel" /></a>
            </div>

            <p className="text-2xl text-azul font-semibold transition-colors cursor-pointerdark:text-azulsel">Templates</p>

            <div className="w-full border-2 border-b-4 border-azul p-4 rounded-xl flex flex-col dark:shadow-neon-azul">
                <h1 className="text-azul text-xl font-semibold dark:text-azulsel">{"Pergunta com resposta"}</h1>
                <p className="text-azul text-lg dark:text-azulsel">Adicione um enunciado e a resposta esperada para a pergunta.</p>
                <a href={`/game_editor?template=answer`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul dark:text-azulsel" /></a>
            </div>

            <div className="w-full border-2 border-b-4 border-azul p-4 rounded-xl flex flex-col dark:shadow-neon-azul">
                <h1 className="text-azul text-xl font-semibold dark:text-azulsel">{"Alternativas"}</h1>
                <p className="text-azul text-lg dark:text-azulsel">Adicione um enunciado e as alternativas.</p>
                <a href={`/game_editor?template=alternatives`} className="self-end inline-block"><ChevronsRight size={32} className="text-azul dark:text-azulsel" /></a>
            </div>

        </div>
    )
}