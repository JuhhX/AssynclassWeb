import CodeContainer from "../CodeContainer"

export default function ComponentsDocs(){
    return(
        <div className="flex flex-col w-3/5 h-full p-8 overflow-auto scrollbar-thin scrollbar-thumb-azulsel pb-12">
            <h1 className="text-2xl font-bold" id="GraphicComponents">Componentes gráficos</h1>
            <p className="text-lg mt-5 text-justify">
                Agora vamos a parte mais legal! Os componentes gráficos. O que vimos até aqui é algo funcional, mas não muito interativo. 
                Por isso agora vamos dar vida aos jogos.
            </p>

            <h1 className="text-2xl font-bold mt-8" id="COMPONENTS">COMPONENTS (Componentes)</h1>
            <p className="text-lg mt-5 text-justify">Os componentes são tudo o que aparecerá na tela. Imagens, botões, textos e etc.</p>
            <p className="text-lg mt-2 text-justify">Os componentes respeitam uma sintaxe similar ao dos eventos: </p>
            <CodeContainer
                codeLines={
                    [
                        'component: nome_do_componente',
                        '   //código',
                        'end_component',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Dentro dos componentes podemos colocar os seguintes comandos:</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"text: "}</span> Insere um texto no componente.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"imageURL: "}</span> Isere uma imagem no componente usando uma URL.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"input: "}</span> Define se o componente será um espaço para escrita de texto.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"placeholder: "}</span> Define um texto dica para um componente que permita a escrita de texto.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"storeTextIn: "}</span> Define a variável onde será guardado o texto que está sendo escrito.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"canMove: "}</span> Define se o usuário pode ou não arrastar o componente com o mouse.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"onClick: "}</span> Dispara um evento ao clicar no componente.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"onMouseOver: "}</span> Dispara um evento quando o mouse esta sobre o componente.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"onMouseOut: "}</span> Dispara um evento quando o mouse sai de cima do componente.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"visible: "}</span> Define se o componente deve ou não aparecer na tela.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"posx: "}</span> Define a posição x do componente na tela.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"posy: "}</span> Defina a posição y do componente na tela.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"call: "}</span> Chama um evento assim que o componente aparecer na tela.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"interval: "}</span> Chama um evento com intervalos assim que o componente aparecer na tela.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"timeout: "}</span> Chama um evento após um tempo assim que o componente aparecer na tela.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"connect: "}</span> Conecta um componente a outro usando uma seta.</p>

            <p className="text-lg mt-5 text-justify">Abaixo a implementação de cada comando:</p>
            <CodeContainer
                codeLines={
                    [
                        'component: meu_componente',
                        '   text: "algum texto"             //Você pode usar também uma variavel',
                        '   imageURL: "URL para a imagem"   //Você pode usar também uma variavel',
                        '   input: true                     //false ou também uma variável booleana',
                        '   placeholder: "algum texto"      //Você pode usar também uma variavel',
                        '   storeTextIn: nome_da_variavel',
                        '   canMove: true                   //false ou também uma variável booleana',
                        '   onClick: nome_do_evento',
                        '   onMouseOver: nome_do_evento',
                        '   onMouseOut: nome_do_evento',
                        '   visible: true                   //false ou também uma variável booleana',
                        '   posx: numero                    //Você pode usar também uma variavel',
                        '   posy: numero                    //Você pode usar também uma variavel',
                        '   call: nome_do_evento',
                        '   interval: segundos, condição => nome_do_evento',
                        '   timeout: segundos => nome_do_evento',
                        ' ',
                        '   //Direção de conexão e saída podem ser right, left, up ou down',
                        '   //A cor deve ser em Hexadecimal. Confira em:',
                        '   //https://celke.com.br/artigo/tabela-de-cores-html-nome-hexadecimal-rgb',
                        '   //O nome do componente e texto podem ser substituidos por variaveis',
                        '   connect: "nome_do_componente", direção_conexao, direção_saida, cor, "texto"',
                        'end_component',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Não é obrigatório usar todos eles, apenas o que você precisar.</p>
            <p className="text-lg mt-2 text-justify">(Obs: Todos os componentes devem ter um nome ÚNICO. O nome deste é meu_componente)</p>

            <p className="text-lg mt-5 text-justify">Vamos criar um exemplo de uma imagem que ao ser clicada dispare algum evento:</p>
            <CodeContainer
                codeLines={
                    [
                        'event: alertar',
                        '   alert: "REACT"',
                        'end_event',
                        ' ',
                        'component: minha_imagem',
                        '   imageURL: "https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png"',
                        '   posx: 210',
                        '   posy: 150',
                        '   canMove: false',
                        '   onClick: alertar',
                        'end_component',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Ao executar, você verá uma imagem no centro da tela (similar a um atomo). Clique nela e veja que irá alertar "React"</p>
            <p className="text-lg mt-2 text-justify">Isso porque o comando alertar foi definido em onClick.</p>
            <p className="text-lg mt-2 text-justify">Teste outros comandos e valores, por exemplo alterar o canMove para true e veja que agora você pode arrastar a imagem com o mouse.</p>

            <p className="text-lg mt-5 text-justify">Veja um código com uma pergunta e que leia a resposta do usuário: </p>
            <CodeContainer
                codeLines={
                    [
                        'var: resposta = ""',
                        ' ',
                        'event: verificar',
                        '    if: var:{resposta} == \'mel\' => certo',
                        'end_event',
                        ' ',
                        'component: enunciado',
                        '    text: "O que as abelhas são conhecidas por fabricar?"',
                        '    posx: 450',
                        '    posy: 150',
                        '    style: enunciado',
                        'end_component',
                        ' ',
                        'event: certo',
                        '   alert: "Resposta correta!"',
                        'end_event',
                        ' ',
                        'component: resposta_aluno',
                        '    input: true',
                        '    placeholder: "Insira sua resposta aqui ..."',
                        '    storeTextIn: resposta',
                        '    posx: 450',
                        '    posy: 280',
                        '    style: input_style',
                        '    interval: 1.5,var:{resposta} == \'mel\' => verificar',
                        'end_component',
                    ]
                }
            />

            <p className="text-lg mt-5 text-justify">O código acima cria dois componentes, o enunciado e o resposta_aluno, onde fazermos a pergunta e onde o aluno irá inserir a resposta.</p>
            <p className="text-lg mt-2 text-justify">Temos dois eventos, verificar e certo. O primeiro é chamado em um intervalo de 1.5 segundos até que o valor da variável resposta seja igual a 'mel'. 
                                                    O segundo é chamado apenas se a resposta for igual a esperada.</p>
            <p className="text-lg mt-2 text-justify">Atualmente, o jogo parecerá simples, pois não adicionamos um estilo. Isso é o que veremos no próximo tópico.</p>

            <h1 className="text-2xl font-bold mt-8" id="STYLE">STYLE (Estilo)</h1>
            <p className="text-lg mt-5 text-justify">Os estilos são a aparência dos componentes, como a cor de um texto, a cor de fundo, tamanho entre outras propriedades.</p>
            <p className="text-lg mt-2 text-justify">Assim como todas as outras estruturas, os styles seguem uma sintaxe: </p>
            <CodeContainer
                codeLines={
                    [
                        'style: nome_do_estilo',
                        '   //código',
                        'end_style',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Alguns comandos comuns que você pode utilizar para estilizar: </p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"backgroundColor: (cor)"}</span> Define a cor de fundo do componente (Coloque o nome da cor em inglês).</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"color: (cor)"}</span> Define a cor da letra do componente (Coloque o nome da cor em inglês).</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"top: (numero)"}</span> Define a posição do componente em relação ao topo da página.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"bottom: (numero)"}</span> Define a posição do componente em relação ao fundo da página.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"left: (numero)"}</span> Define a posição do componente em relação ao lado esquerdo da página.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"right: (numero)"}</span> Define a posição do componente em relação ao lado direito da página.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"width: (numero)"}</span> Define o tamanho do componente em largura.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"height: (numero)"}</span> Define o tamanho do componente em altura.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"borderColor: (cor)"}</span> Define a cor da borda em volta do componente.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"borderWidth: (numero)"}</span> Define o tamanho da borda ao redor do componente.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"borderRadius: (numero)"}</span> Define um arredondamento da borda.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"fontSize: (numero)"}</span> Define o tamanho da letra.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"fontWeight: bold"}</span> Define se a letra estará em negrito.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"padding: (numero)"}</span> Faz com que textos dentro de um componente se afastem da borda.</p>
            <p className="text-lg mt-5 text-justify">Veja o exemplo anterior agora com estilos: </p>
            <CodeContainer
                codeLines={
                    [
                        'var: resposta = ""',
                        ' ',
                        'event: verificar',
                        '    if: var:{resposta} == \'mel\' => certo',
                        'end_event',
                        ' ',
                        'style: enunciado',
                        '   fontSize: "24px"',
                        'end_style',
                        ' ',
                        'style: input_style',
                        '   fontSize: "20px"',
                        '   borderColor: "#c0c0c0"',
                        '   borderWidth: "1px"',
                        '   borderRadius: "10px"',
                        '   padding: "8px"',
                        '   width: "500px"',
                        'end_style',
                        ' ',
                        'component: enunciado',
                        '    text: "O que as abelhas são conhecidas por fabricar?"',
                        '    posx: 450',
                        '    posy: 150',
                        '    style: enunciado',
                        'end_component',
                        ' ',
                        'event: certo',
                        '   alert: "Resposta correta!"',
                        'end_event',
                        ' ',
                        'component: resposta_aluno',
                        '    input: true',
                        '    placeholder: "Insira sua resposta aqui ..."',
                        '    storeTextIn: resposta',
                        '    posx: 450',
                        '    posy: 280',
                        '    style: input_style',
                        '    interval: 1.5,var:{resposta} == \'mel\' => verificar',
                        'end_component',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Ao carregar o jogo, você perceberá que o visual dos componentes mudou. Agora o resposta_aluno tem uma borda, assim como programado no estilo input_style. </p>

            <h1 className="text-2xl font-bold mt-8" id="DELETE">DELETE (Deletar)</h1>
            <p className="text-lg mt-5 text-justify">Caso precise, você pode usar o comando "delete" para apagar um componente quando um evento for disparado. Veja a sintaxe: </p>
            <CodeContainer
                codeLines={
                    [
                        'delete: "nome_do_componente"'
                    ]
                }
            />
        </div>
    )
}