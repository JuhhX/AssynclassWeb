import CodeContainer from "../CodeContainer";

export default function RenderCommands(){
    return(
        <div className="flex flex-col w-3/5 h-full p-8 overflow-auto scrollbar-thin scrollbar-thumb-azulsel pb-12">
            <h1 className="text-2xl font-bold" id="RENDER_COMMANDS">Chamando outros jogos</h1>
            <p className="text-lg mt-5 text-justify">
                Existem comandos de renderização que permitem uma troca entre jogos, assim, o usuário pode passar para a próxima pergunta ou próxima fase.
            </p>

            <h1 className="text-2xl font-bold mt-8" id="RENDER_STACK">RENDER STACK (PILHA DE RENDERIZAÇÃO)</h1>
            <p className="text-lg mt-5 text-justify">Esta estrutura cria uma lista de itens a serem renderizados.</p>
            <p className="text-lg mt-2 text-justify">Eles respeitam a seguinte sintaxe: </p>
            <CodeContainer
                codeLines={
                    [
                        'renderstack: renderizar',
                        '   //ID de jogos',
                        'end_render_stack',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Quando um jogo é postado por um professor, ele recebe um ID. Esse ID deve ser declarado dentro do renderstack (entre aspas)
            para que possa ser executado na sequência.</p>
            <p className="text-lg mt-2 text-justify">Você pode obter o ID de uma atividade/jogo seguindo os seguintes passos: </p>
            <p className="text-lg mt-2 text-justify">1° Vá ao perfil de um <a href="/teacher/search_teacher" className="text-verde underline">professor</a> e veja seus jogos.</p>
            <p className="text-lg mt-2 text-justify">2° No perfil do professor, clique na aba "Atividade/Jogos".</p>
            <p className="text-lg mt-2 text-justify">3° Clique no botão de copiar.</p>
            <p className="text-lg mt-2 text-justify">4° No seu código, coloque o ID copiado dentro do render stack desta forma:</p>
            <CodeContainer
                codeLines={
                    [
                        'renderstack: renderizar',
                        '   "54321_1702912728916"',
                        'end_render_stack',
                    ]
                }
            />

            <p className="text-lg mt-5 text-justify">O render stack por si só não faz nada, ele depende do comando "render". Ele é como se fosse uma lista de jogos que serão executados</p>

            <h1 className="text-2xl font-bold mt-8" id="RENDER">RENDER (Renderizar)</h1>
            <p className="text-lg mt-5 text-justify">Este comando permite que você chame outras atividades/jogos.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{`render: "parametro"`}</span></p>
            <p className="text-lg mt-5 text-justify">Diferente de outros comandos, o parâmetro a ser passado deve seguir uma das seguintes regras: </p>

            <p className="text-lg mt-2 text-justify"><span className="text-verde">{`render: "id"`}</span></p>
            <p className="text-lg mt-2 text-justify">Caso não queria definir uma lista de renderizações, o comando render funciona sozinho. Basta adicionar o ID do jogo que deseja renderizar em seguida: </p>
            <CodeContainer
                codeLines={
                    [
                        'render: "54321_1702912728916"'
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">(Obs.: Para usar o comando desta forma, você não pode definir uma render stack no código.)</p>

            <p className="text-lg mt-2 text-justify"><span className="text-verde">{`render: "next"`}</span></p>
            <p className="text-lg mt-2 text-justify">Quando você usa o comando render com o parâmetro "next", ele irá renderizar o próximo ID do render stack.</p>
            <CodeContainer
                codeLines={
                    [
                        'renderstack: renderizar',
                        '   "54321_1702912728916"',
                        '   "54321_1702928943855"',
                        'end_render_stack',
                    ]
                }
            />
            <p className="text-lg mt-2 text-justify">Neste exemplo, ao usar o comando, primeiro será renderizado o jogo de ID "54321_1702912728916". Caso você use novamente esse comando, então ele renderizará em seguida o jogo de ID "54321_1702928943855".</p>

            <p className="text-lg mt-2 text-justify"><span className="text-verde">{`render: "back"`}</span></p>
            <p className="text-lg mt-2 text-justify">O parâmetro "back" tem o sentido inverso do "next", logo, ele renderizará o ID anterior ao atual.</p>

            <p className="text-lg mt-2 text-justify"><span className="text-verde">{`render: ">numero"`}</span></p>
            <p className="text-lg mt-2 text-justify">{'Ao utilizar um ">" no inicio do parâmetro seguido de um número, você irá renderizar um item especifico da lista.'}</p>

            <CodeContainer
                codeLines={
                    [
                        'renderstack: renderizar',
                        '   "54321_1702912728916"       //Esse é o 0',
                        '   "54321_1702928943855"       //Esse é o 1',
                        'end_render_stack',
                    ]
                }
            />
            <p className="text-lg mt-2 text-justify">Neste exemplo, se você usar o comando <span className="text-verde">{`render: ">1"`}</span> o ID "54321_1702928943855" será renderizado.</p>
            <p className="text-lg mt-5 text-justify">Este comando funciona também com variáveis desta forma: </p>
            <CodeContainer
                codeLines={
                    [
                        'var: numero = 1',
                        'render: ">var:{numero}"',
                    ]
                }
            />
            
        </div>
    );
}