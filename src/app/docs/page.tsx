"use client"

import HomeHeader from "@/components/HomeHeader";
import ComponentsDocs from "@/components/tutorials/ComponentsDocs";
import EventsDocs from "@/components/tutorials/EventsDocs";
import Introduction from "@/components/tutorials/Introduction";
import LoopsCondition from "@/components/tutorials/LoopsConditions";
import Operations from "@/components/tutorials/Operations";
import RenderCommands from "@/components/tutorials/RenderCommands";
import { ReactNode, useState } from "react";

export default function Docs(){

    const [currentSection, setCurrentSection] = useState<number>(0);
    const [sections] = useState<ReactNode[]>(
        [
            <Introduction />,
            <Operations />,
            <EventsDocs />,
            <LoopsCondition />,
            <ComponentsDocs />,
            <RenderCommands />
        ]
    );

    return (
        <main className="w-screen h-screen overflow-hidden flex flex-col">
            <HomeHeader />

            <section className="overflow-auto w-full h-full flex flex-row scrollbar-thin scrollbar-thumb-azulsel text-azul dark:text-azulsel">
                <div className="flex flex-col w-1/4 h-full p-8 border-r-2 border-azul overflow-auto scrollbar-thin scrollbar-thumb-azulsel dark:border-azulsel">
                    <details className="text-xl">
                        <summary><a href="#Introdução" onClick={() => setCurrentSection(0)}>Introdução</a></summary>
                        <ul className="list-decimal p-2">
                            <li><a href="#1. Primeiros passos" onClick={() => setCurrentSection(0)}>Primeiros passos</a></li>
                            <li><a href="#2. Outros comandos de saída" onClick={() => setCurrentSection(0)}>Outros comandos de saída</a></li>
                            <li><a href="#3. Variáveis" onClick={() => setCurrentSection(0)}>Variáveis</a></li>
                            <li><a href="#4. Comentários" onClick={() => setCurrentSection(0)}>Comentários</a></li>
                        </ul>
                    </details>
                    <details className="text-xl">
                        <summary><a href="#Operations" onClick={() => setCurrentSection(1)}>Operações</a></summary>
                        <ul className="list-decimal p-2">
                            <li><a href="#SUM" onClick={() => setCurrentSection(1)}>SUM (Soma)</a></li>
                            <li><a href="#SUB" onClick={() => setCurrentSection(1)}>SUB (Subtração)</a></li>
                            <li><a href="#MULT" onClick={() => setCurrentSection(1)}>MULT (Multiplicação)</a></li>
                            <li><a href="#DIV" onClick={() => setCurrentSection(1)}>DIV (Divisão)</a></li>
                            <li><a href="#POW" onClick={() => setCurrentSection(1)}>POW (Exponenciação)</a></li>
                            <li><a href="#SQRT" onClick={() => setCurrentSection(1)}>SQRT (Radiciação)</a></li>
                            <li><a href="#RANDOM" onClick={() => setCurrentSection(1)}>RANDOM (Inteiro aleatório)</a></li>
                            <li><a href="#RANDOMF" onClick={() => setCurrentSection(1)}>RANDOMF (Decimal aleatório)</a></li>
                            <li><a href="#CONCAT" onClick={() => setCurrentSection(1)}>CONCAT (Concatenar)</a></li>
                            <li><a href="#SET" onClick={() => setCurrentSection(1)}>SET (Definir)</a></li>
                            <li><a href="#POINTS" onClick={() => setCurrentSection(1)}>POINTS (Pontos)</a></li>
                        </ul>
                    </details>
                    <details className="text-xl">
                        <summary><a href="#Events" onClick={() => setCurrentSection(2)}>Eventos</a></summary>
                        <ul className="list-decimal p-2">
                            <li><a href="#CALL" onClick={() => setCurrentSection(2)}>CALL (Chamando)</a></li>
                            <li><a href="#TIMEOUT" onClick={() => setCurrentSection(2)}>TIMEOUT (Chamar após tempo)</a></li>
                            <li><a href="#INTERVAL" onClick={() => setCurrentSection(2)}>INTERVAL (Chamar com intervalo)</a></li>
                        </ul>
                    </details>
                    <details className="text-xl">
                        <summary><a href="#LoopsConditions" onClick={() => setCurrentSection(3)}>Laços e condições</a></summary>
                        <ul className="list-decimal p-2">
                            <li><a href="#IF" onClick={() => setCurrentSection(3)}>Condicional</a></li>
                            <li><a href="#LOOPE" onClick={() => setCurrentSection(3)}>Laço com expressão</a></li>
                            <li><a href="#LOOPN" onClick={() => setCurrentSection(3)}>Laço númerico</a></li>
                        </ul>
                    </details>
                    <details className="text-xl">
                        <summary><a href="#GraphicComponents" onClick={() => setCurrentSection(4)}>Componentes gráficos</a></summary>
                        <ul className="list-decimal p-2">
                            <li><a href="#COMPONENTS" onClick={() => setCurrentSection(4)}>COMPONENT (Componente)</a></li>
                            <li><a href="#STYLE" onClick={() => setCurrentSection(4)}>STYLE (Estilo)</a></li>
                            <li><a href="#DELETE" onClick={() => setCurrentSection(4)}>DELETE (Deletar)</a></li>
                        </ul>
                    </details>
                    <details className="text-xl">
                        <summary><a href="#RENDER_COMMANDS" onClick={() => setCurrentSection(5)}>Chamando outros jogos</a></summary>
                        <ul className="list-decimal p-2">
                            <li><a href="#RENDER_STACK" onClick={() => setCurrentSection(5)}>RENDER STACK (Pilha de renderização)</a></li>
                            <li><a href="#RENDER" onClick={() => setCurrentSection(5)}>RENDER (Renderizar)</a></li>
                        </ul>
                    </details>
                </div>

                {
                    (sections[currentSection])
                }
                
            </section>
        </main>
    );
}