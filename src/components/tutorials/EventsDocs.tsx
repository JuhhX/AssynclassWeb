import CodeContainer from "../CodeContainer";

export default function EventsDocs(){
    return (
        <div className="flex flex-col w-3/5 h-full p-8 overflow-auto scrollbar-thin scrollbar-thumb-azulsel pb-12">
            <h1 className="text-2xl font-bold" id="Events"> Eventos </h1>
            <p className="text-lg mt-5 text-justify">Os eventos são blocos de código que podem ser disparados por algum comando ou componente.</p>
            <p className="text-lg mt-2 text-justify">Os eventos respeitam uma sintaxe: </p>
            <CodeContainer
                codeLines={
                    [
                        'event: nome_do_evento',
                        '   //código',
                        'end_event',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Vamos criar um evento que calcule a média entre o valor de duas variáveis:</p>
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
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">O código acima cria o evento <span className="text-verde">media</span>. Dentro de média estão algumas operações como vimos anteriormente, uma para somar os números e outra para dividi-los por 2.</p>
            <p className="text-lg mt-2 text-justify">(Obs: Perceba que o código dentro do evento tem um espaço a mais. Ele não é necessário, mas por questões de <span className="text-verde">legibilidade</span> é recomendado utilizá-lo)</p>
            <p className="text-lg mt-2 text-justify">(Obs: O nome dos eventos NÃO deve conter espaços)</p>
            <p className="text-lg mt-2 text-justify">(Obs: Os eventos devem seguir essa estrutura. Caso você esqueça o <span className="text-verde">end_event</span> irá obter um erro)</p>

            <h1 className="text-2xl font-bold mt-8" id="CALL">CALL (Chamando)</h1>
            <p className="text-lg mt-5 text-justify">Para testar o nosso evento, podemos utilizar o comando "call". Adicione essas duas linhas ao final do código que escrevemos anteriormente e execute o programa:</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"call: nome_do_evento"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'call: media',
                        'alert: "A média entre var:{num1} e var:{num2} é igual a var:{resultado}"'
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">O sistema deverá alertar a média entre os números 10 e 8.</p>

            <h1 className="text-2xl font-bold mt-8" id="TIMEOUT">TIMEOUT (Chamar após tempo)</h1>
            <p className="text-lg mt-5 text-justify">Além do comando call, temos também o timeout que faz o mesmo. A diferença é que o evento só irá disparar após um tempo determinado pelo programador.</p>
            <p className="text-lg mt-2 text-justify">Adicione o seguinte código e execute o programa.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"timeout: segundos => nome_do_evento"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'timeout: 2 => media',
                        'alert: "A média entre var:{num1} e var:{num2} é igual a var:{resultado}"'
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Sim, o resultado alertado está errado. Isso porque o evento media será chamado após 2 segundos, então, no momento em que o alert é executado o evento media ainda não foi chamado.</p>
            <p className="text-lg mt-2 text-justify">Para corrigir isso, vamos alterar o código dessa forma:</p>
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
                        '   alert: "A média entre var:{num1} e var:{num2} é igual a var:{resultado}"',
                        'end_event',
                        ' ',
                        'timeout: 2 => media',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">Agora, o alert é chamado dentro do evento media, e traz os valores atualizados.</p>

            <h1 className="text-2xl font-bold mt-8" id="INTERVAL">INTERVAL (Chamar com intervalo)</h1>
            <p className="text-lg mt-5 text-justify">O interval utiliza uma ideia similar ao timeout. Ele irá disparar o evento em seguindo um intervalo em segundos até que seja parado por alguma condição.</p>
            <p className="text-lg mt-2 text-justify">É recomendado ler o tópico de condições antes de utilizar esse comando.</p>
            <p className="text-lg mt-2 text-justify"><span className="text-verde">{"interval: segundos, quando_parar => nome_do_evento"}</span></p>
            <CodeContainer
                codeLines={
                    [
                        'var: num1 = 10',
                        'var: num2 = 8',
                        'var: soma = 0',
                        'var: resultado = 0',
                        'var: contador = 0',
                        ' ',
                        'event: media',
                        '   sum: var:{num1},var:{num2} > soma',
                        '   div: var:{soma},2 > resultado',    
                        '   alert: "A média entre var:{num1} e var:{num2} é igual a var:{resultado}"',
                        '   sum: var:{contador},1 > contador',
                        'end_event',
                        ' ',
                        'interval: 2,var:{contador} == 4 => media',
                    ]
                }
            />
            <p className="text-lg mt-5 text-justify">O evento media será disparado a cada 2 segundos e só irá parar quando o valor de contador for igual a 4.</p>
            <p className="text-lg mt-2 text-justify">Perceba que dentro do evento o valor de contador sempre é somado em 1, caso essa linha não existisse, o valor de contador iria se manter em 0 e então nunca seria igual a 4.</p>
            <p className="text-lg mt-2 text-justify">Desta forma o evento media iria ser chamado infinitamente até que o usuário feche o sistema. Atente-se a isso, em alguns casos esse comando pode causar algum tipo de travamento caso não seja parado adequadamente.</p>

        </div>
    )
}