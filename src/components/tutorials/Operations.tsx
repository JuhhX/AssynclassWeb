import CodeContainer from "../CodeContainer";

export default function Operations(){
    return (
        <div className="flex flex-col w-3/5 h-full p-8 overflow-auto scrollbar-thin scrollbar-thumb-azulsel pb-12">
            <h1 className="text-2xl font-bold" id="Operations"> Operações </h1>
            <p className="text-lg mt-5 text-justify">Com o Assynscript é possível fazer também operações, como soma, multiplicação, concatenação entre outros.</p>
            <p className="text-lg mt-2 text-justify">As operações respeitam uma sintaxe: <span className="text-verde">{"comando: parametros > variavel"}</span></p>
            <p className="text-lg mt-2 text-justify">Os parâmetros são separados por vírgulas e caso queira guardar o resultado em uma variável basta adicionar <span className="text-verde">{"> variavel"}</span> ao comando.</p>

            <h1 className="text-2xl font-bold mt-8" id="SUM"> SUM (Soma)</h1>
            <p className="text-lg mt-5 text-justify">Este comando permite somar uma lista de números: </p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"sum: parametro1, parametro2, ... > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'sum: 9,3,1'
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Caso queira guardar o resultado em uma variável: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Para atribuir variáveis, basta digitar o nome dela.)</p>
            <CodeContainer
                codeLines={
                    [
                        'var: resultado = 0',
                        'sum: 9,3,1 > resultado'
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Você pode também usar o valor de outra variável: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Para usar o valor é necessario o var:{"{node da variavel}"})</p>
            <CodeContainer
                codeLines={
                    [
                        'var: primeiro_numero = 0.13',
                        'var: resultado = 0',
                        'sum: var:{primeiro_numero},22 > resultado'
                    ]
                }
            />
            <p className="text-lg mt-2 text-justify">(Obs: Números decimais são representados com "." pois utilizam o sistema americano)</p>

            <h1 className="text-2xl font-bold mt-8" id="SUB"> SUB (Subtração)</h1>
            <p className="text-lg mt-5 text-justify">Este comando permite subtrair uma lista de números: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum")</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"sub: parametro1, parametro2, ... > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'sub: 9,3,1,7'
                    ]
                }
            />

            <h1 className="text-2xl font-bold mt-8" id="MULT"> MULT (Multiplicação)</h1>
            <p className="text-lg mt-5 text-justify">Este comando permite multiplicar uma lista de números: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum")</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"mult: parametro1, parametro2, ... > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'mult: 9,7'
                    ]
                }
            />

            <h1 className="text-2xl font-bold mt-8" id="DIV"> DIV (Divisão)</h1>
            <p className="text-lg mt-5 text-justify">Este comando permite dividir uma lista de números: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum")</p>
            <p className="text-lg mt-2 text-justify">(Obs2: Divisão por zero retornarão um erro)</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"div: parametro1, parametro2, ... > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'div: 100,2'
                    ]
                }
            />

            <h1 className="text-2xl font-bold mt-8" id="POW"> POW (Exponenciação)</h1>
            <p className="text-lg mt-5 text-justify">Este comando permite a exponenciação de uma base por um número: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum", mas aceita apenas DOIS parâmetros)</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"pow: base, expoente > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'pow: 7,2'
                    ]
                }
            />

            <h1 className="text-2xl font-bold mt-8" id="SQRT"> SQRT (Radiciação)</h1>
            <p className="text-lg mt-5 text-justify">Este comando encontra a raíz quadrada de um número: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum", mas aceita apenas UM parâmetro)</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"sqrt: numero > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'pow: 7,2'
                    ]
                }
            />

            <h1 className="text-2xl font-bold mt-8" id="RANDOM"> RANDOM (Inteiro aleatório)</h1>
            <p className="text-lg mt-5 text-justify">Este comando gera um número aleatório INTEIRO: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum", mas aceita apenas DOIS parâmetros)</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"random: minimo, maximo > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'random: 0, 150'
                    ]
                }
            />

            <h1 className="text-2xl font-bold mt-8" id="RANDOMF"> RANDOMF (Decimal aleatório)</h1>
            <p className="text-lg mt-5 text-justify">Este comando gera um número aleatório DECIMAL: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum", mas aceita apenas DOIS parâmetros)</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"randomf: minimo, maximo > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'randomf: 0, 150'
                    ]
                }
            />

            <h1 className="text-2xl font-bold mt-8" id="CONCAT"> CONCAT (Concatenar)</h1>
            <p className="text-lg mt-5 text-justify">Este comando permite "somar" uma lista de textos: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum")</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"concat: texto1, texto2, ... > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'concat: "BOM ", "DIA", "!"'
                    ]
                }
            />

            <h1 className="text-2xl font-bold mt-8" id="SET"> SET (Definir)</h1>
            <p className="text-lg mt-5 text-justify">Este comando permite que você altere diretamente o valor de uma variavel: </p>
            <p className="text-lg mt-2 text-justify">(Obs: Funciona da mesma forma como o "sum", mas aceita apenas UM parâmetro)</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"concat: novo valor > variavel"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'var: pontuacao = 0',
                        'set: 100 > pontuacao'
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Ao executar o comando "set", o valor da variável pontuação passará a ser 100.</p>

        </div>
    );
}