import CodeContainer from "../CodeContainer";

export default function LoopsCondition(){
    return(
        <div className="flex flex-col w-3/5 h-full p-8 overflow-auto scrollbar-thin scrollbar-thumb-azulsel pb-12">
            <h1 className="text-2xl font-bold" id="LoopsConditions">Laços e condições </h1>
            <p className="text-lg mt-5 text-justify">
                Laços e condições são extremamente úteis quando queremos escrever que um código seja executado apenas em algum momento especifico ou
                várias vezes consecutivas.
            </p>
            <p className="text-lg mt-2 text-justify">Antes de ver estes comandos, vamos entender alguns simbolos: </p>
            <span className="text-verde mt-2 text-lg">{"< (Menor)"}</span>
            <span className="text-verde mt-2 text-lg">{"> (Maior)"}</span>
            <span className="text-verde mt-2 text-lg">{"< (Menor ou igual)"}</span>
            <span className="text-verde mt-2 text-lg">{"> (Maior ou igual)"}</span>
            <span className="text-verde mt-2 text-lg">{"== (Igual)"}</span>
            <span className="text-verde mt-2 text-lg">{"!= (Diferente)"}</span>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"&& (E)"}</span> Essa tecla está em cima do 7 no teclado</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"| | (Ou)"}</span> Essa tecla normalmente está do lado da tecla Z do teclado</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde mt-2">{"! (Não))"}</span> Essa tecla está em cima do 1 no teclado</p>
            
            <h1 className="text-2xl font-bold mt-8" id="IF">Condicional</h1>
            <p className="text-lg mt-5 text-justify">O comando if dispara um evento somente se a condição passada para ele for verdadeira. Vejamos:</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"if: condição => evento"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'var: num1 = 10',
                        'var: num2 = 8',
                        'var: soma = 0',
                        'var: resultado = 0',
                        ' ',
                        'event: media',
                        '   sum: var:{num1},var:{num2} > soma',
                        '   div: var:{soma},2 > resultado',
                        'end_event',
                        ' ',
                        'event: aprovado',
                        '   alert: "Você foi APROVADO"',
                        'end_event',
                        ' ',
                        'event: reprovado',
                        '   alert: "Você foi REPROVADO"',
                        'end_event',
                        ' ',
                        'call: media',
                        'if: var:{resultado} >= 6 => aprovado',
                        'if: var:{resultado} < 6 => reprovado',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Ao executar esse código vemos um alerta "Você foi APROVADO", pois o valor da variável resultado (9) é maior ou igual a 6.</p>
            <p className="text-lg mt-2 text-justify">O evento reprovado não é chamado, pois 9 não é menor do que 6.</p>
            <p className="text-lg mt-2 text-justify">Altere os valores das variáveis num1 e num2 para valores baixos e execute. Desta vez, o evento reprovado será chamado.</p>
            <p className="text-lg mt-2 text-justify">Você pode testar os outros operadores também (Exceto os três últimos que usam outra mecânica):</p>
            <CodeContainer
                codeLines={
                    [
                        'if: var:{resultado} != 6 => nome_do_evento',
                        'if: var:{resultado} == 10 => nome_do_evento',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Os três últimos operadores servem para verificar se expressões são verdadeiras ou falsas.</p>
            <p className="text-lg mt-2 text-justify">Por exemplo: O ! (Não) inverte valores, ou seja, se algo é verdadeiro irá se tornar falso e vice-versa.</p>
            <CodeContainer
                codeLines={
                    [
                        'if: !(var:{resultado} < 6) => reprovado',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">
                No código acima, sabemos que se o resultado for menor do que 6 o evento reprovado deve ser disparado. Mas antes dessa expressão
                temos o ! (Não). Então, se o resultado for menor que 6 (verdadeiro), seu valor será invertido para (falso) e o evento não será disparado.
            </p>
            <p className="text-lg mt-2 text-justify">
                Se ler essa linha ficaria algo como: "Se não resultado menor do que 6".
            </p>
            <p className="text-lg mt-2 text-justify">
                (Obs: Você pode utilizar parenteses para separar expressões igual na matemática. Mas apenas parenteses, colchetes e chaves não)
            </p>

            <p className="text-lg mt-5 text-justify">
                O && (E) dispara o evento apenas se as duas expressões forem verdadeiras:
            </p>
            <CodeContainer
                codeLines={
                    [
                        'if: (var:{resultado} > 3) && (var:{resultado} < 6) => nome_do_evento',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">
                Para que o evento seja disparado, as duas expressões devem ser verdadeiras. O resultado deve ser maior do que 3 e o resultado também deve ser menor do que 6.
            </p>
             <p className="text-lg mt-2 text-justify">
                Se ler essa linha ficaria algo como: "Se resultado maior do que 3 E resultado menor do que 6".
            </p>

            <p className="text-lg mt-5 text-justify">
                O | | (Ou) dispara o evento se ao menos uma das expressões forem verdadeiras:
            </p>
            <CodeContainer
                codeLines={
                    [
                        'if: (var:{resultado} == 3) || (var:{resultado} == 6) => nome_do_evento',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">
                Para que o evento seja disparado, o valor de resultado deve ser igual a 3 ou igual a 6.  
            </p>
            <p className="text-lg mt-2 text-justify">
                (Obs: Se você adicionar uma expressão onde as duas condições forem verdadeiras o evento também disparará. Ele apenas não será
                disparado caso as duas expressões forem falsas)
            </p>
            <p className="text-lg mt-2 text-justify">
                Se ler essa linha ficaria algo como: "Se resultado igual a 3 OU resultado igual a 6".
            </p>

            <h1 className="text-2xl font-bold mt-8" id="LOOPE">Laço com expressão</h1>
            <p className="text-lg mt-5 text-justify">Utilizando a mesma ideia temos a estrutura loop. Ele executará o código até que a expressão seja falsa:</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"loop: condição => evento"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'var: contador = 0',
                        ' ',
                        'event: incrementar_contador',
                        '   print: "var:{contador}"',
                        '   sum: var:{contador},1 > contador',
                        'end_event',
                        ' ',
                        'loop: var:{contador} <= 10 => incrementar_contador',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Este loop vai disparar o evento incrementar_contador enquanto o valor de contador for menor ou igual a 10. O evento mostra o valor atual do contador e depois soma seu valor em um.</p>
            <p className="text-lg mt-2 text-justify">(Obs: Assim como o comando Interval, o loop com uma expressão pode ser executado infinitamente caso não seja parado adequadamente)</p>

            <h1 className="text-2xl font-bold mt-8" id="LOOPN">Laço numérico</h1>
            <p className="text-lg mt-5 text-justify">O loop possui outra variante, esta recebe a quantidade de vezes que o loop deve ser executado.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"loop: quantidade => evento"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'var: contador = 0',
                        ' ',
                        'event: incrementar_contador',
                        '   print: "var:{contador}"',
                        '   sum: var:{contador},1 > contador',
                        'end_event',
                        ' ',
                        'loop: 11 => incrementar_contador',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Este código faz o mesmo que o anterior. Mas perceba que foi usado o 11 ao invés do 10, isso porque o loop sempre irá parar no valor anterior ao que definimos.</p>
            <p className="text-lg mt-2 text-justify">Se o valor fosse por exemplo 914, o loop iria ser executado 913 vezes.</p>
            <p className="text-lg mt-5 text-justify">A principal diferença entre esses dois loops é que o primeiro é recomendado quando não sabemos o fim, já no segundo sabemos.</p>
            <p className="text-lg mt-2 text-justify">Em casos mais especificos onde quero que seja executado exatamente 10 vezes, utilizo o loop numérico.</p>
            
        </div>
    )
}