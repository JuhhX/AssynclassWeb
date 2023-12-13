import CodeContainer from "../CodeContainer";

export default function Introduction() {
    return (
        <div className="flex flex-col w-3/5 h-full p-8 overflow-auto scrollbar-thin scrollbar-thumb-azulsel pb-12">
            <h1 className="text-2xl font-bold" id="Introdução"> O que é o Assynscript? </h1>
            <p className="text-lg mt-5 text-justify">O sistema de minigames do Assynclass é feito utilizando um código chamado <span className="text-verde underline">Assynscript</span>.</p>
            <p className="text-lg mt-2 text-justify">Ele é um conjunto de instruções pré definidas que permite a criação de minigames customizados dentro do sistema. O Assynscript é interpretado e executa o minigame de acordo com o que foi programado.</p>

            <h1 className="text-2xl font-bold mt-8"> O que você precisa saber?</h1>
            <p className="text-lg mt-5 text-justify">Para criar um minigames é bom ter um conhecimento em lógica, mas não é obrigatório.</p>
            <p className="text-lg mt-2 text-justify">Você precisará também de um editor de texto. O bloco de notas serve!</p>
            <p className="text-lg mt-2 text-justify">Você pode também usar o <span className="text-verde underline">editor de minigames</span> (Obs: O editor permite apenas a criação de minigames simples até o momento.)</p>

            <h1 className="text-2xl font-bold mt-8" id="1. Primeiros passos"> 1. Primeiros passos</h1>
            <p className="text-lg mt-5 text-justify">Abra o bloco de notas e digite o seguinte comando:</p>

            <CodeContainer
                codeLines={
                    [
                        'print: "Olá mundo"'
                    ]
                }
            />

            <p className="text-lg mt-5 text-justify">Agora salve o arquivo com o nome que deseja acompanhado de <span className="text-verde underline">.asl</span></p>
            <p className="text-lg mt-2 text-justify">Exemplo: meu_arquivo.asl</p>
            <p className="text-lg mt-2 text-justify">(Obs: Ao salvar com o bloco de notas, certifique-se de que a codificação está como <span className="text-verde underline">UTF-8</span>)</p>

            <p className="text-lg mt-5 text-justify">Navegue até o editor clicando <a href="http://localhost:5173/" className="text-verde underline">aqui</a>.</p>
            <p className="text-lg mt-2 text-justify">No canto inferior esquerdo carregue o arquivo que acabou de salvar, aperte <span className="text-verde underline">F12</span> do teclado e clique em <span className="text-verde underline">console</span> no canto superior da tela.</p>
            <p className="text-lg mt-2 text-justify">(Obs: O seu navegador pode perguntar se deseja abrir o DevTools. Selecione que deseja abrir)</p>

            <p className="text-lg mt-5 text-justify">Se tudo deu certo, você deve ver um Olá mundo escrito no console.</p>
            <p className="text-lg mt-2 text-justify">Substitua o texto entre as aspas no código que escrevemos por qualquer outro texto e faça o procedimento novamente. Você verá que a saída é o texto que você escreveu</p>

            <p className="text-lg mt-5 text-justify">As instruções são executadas em sequência, então, se abaixo você colocar outro print você terá duas saídas: </p>
            <CodeContainer codeLines={
                [
                    'print: "Olá mundo"',
                    'print: "Outro texto"',
                ]
            } />

            <p className="text-lg mt-5 text-justify">Se tudo deu certo, você deve verá dois textos assim como programou no código</p>

            <h1 className="text-2xl font-bold mt-8" id="2. Outros comandos de saída"> 2. Outros comandos de saída</h1>
            <p className="text-lg mt-5 text-justify">Além de mostrar algo no console, existem outros dois comandos úteis: <span className="text-verde underline">alert</span> e <span className="text-verde underline">clear</span></p>

            <p className="text-lg mt-2 text-justify">O clear serve para limpar o console após uma ação no console. Escreva o seguinte código: </p>
            <CodeContainer codeLines={
                [
                    'print: "Olá mundo"',
                    'clear:',
                    'print: "Outro texto"',
                ]
            } />
            <p className="text-lg mt-5 text-justify">Se você olhar no console. Terá a mensagem "O console foi limpo" e abaixo o texto "Outro texto". Isso porque após mostrar "Olá mundo" o comando clear é chamado e então tudo o que foi feito anteriormente no console é apagado.</p>

            <p className="text-lg mt-2 text-justify">O alert funciona como o print, mas ao invés de mostrar a saída no console ele irá criar um alerta no navegador. Substitua o código que fizemos anteriormente por: </p>
            <CodeContainer codeLines={
                [
                    'alert: "Olá mundo"',
                    'alert: "Outro texto"',
                ]
            } />

            <p className="text-lg mt-5 text-justify">Aparecerá duas mensagens, uma com o "Olá mundo" e outra com o "Outro texto". Clique em OK para fechá-los.</p>

            <h1 className="text-2xl font-bold mt-8" id="3. Variáveis"> 3. Variáveis</h1>
            <p className="text-lg mt-5 text-justify">As variáveis servem para guardar uma informação. Elas podem ser textos, números ou booleanos (Verdadeiro/Falso)</p>
            <p className="text-lg mt-2 text-justify">Veja como declarar variáveis para cada tipo: </p>
            <CodeContainer codeLines={
                [
                    'var: texto = "Olá mundo"',
                    'var: numero = 13',
                    'var: numero2 = 22.1',
                    'var: booleano = true',
                    'var: booleano2 = false'
                ]
            } />
            <p className="text-lg mt-5 text-justify">Agora podemos usar o valor que guardamos dentro de cada variável. Veja como podemos alertar seus valores: </p>
            <CodeContainer codeLines={
                [
                    'var: texto = "Olá mundo"',
                    'var: numero = 13',
                    'var: numero2 = 22.1',
                    'var: booleano = true',
                    'var: booleano2 = false',
                    ' ',
                    'alert: "var:{texto}"',
                    'alert: "var:{numero}"',
                    'alert: "var:{numero2}"',
                    'alert: "var:{booleano}"',
                    'alert: "var:{booleano2}"'
                ]
            } />
            <p className="text-lg mt-5 text-justify">Perceba que para usar o valor de uma variável escrevemos <span className="text-verde">var:{"{ }"}</span> e dentro o nome da variável que queremos usar.</p>
            <p className="text-lg mt-5 text-justify">Podemos fazer da mesma forma com o print. Experimente.</p>

            <h1 className="text-2xl font-bold mt-8" id="4. Comentários">4. Comentários</h1>
            <p className="text-lg mt-5 text-justify">Para que você possa se guiar pelo código, você pode adicionar comentários usando as barras "//". As linhas iniciadas com essas barras não serão executadas.</p>
            <p className="text-lg mt-2 text-justify">Veja um exemplo: </p>
            <CodeContainer codeLines={
                [
                    '//Variavel com uma mensagem de boas vindas',
                    'var: texto = "Olá mundo"',
                    ' ',
                    '//Variavel com um numero inicial',
                    'var: numero = 13',
                    ' ',
                    '//Variavel com um numero decimal',
                    'var: numero2 = 22.1',
                    ' ',
                    '//Variaveis de verdadeiro ou falso',
                    'var: booleano = true',
                    ' ',
                    'var: booleano2 = false'
                ]
            } />

        </div>
    );
}