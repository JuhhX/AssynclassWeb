
export interface CommandsInterface{
    [key: string]: Function
}

export interface VariablesInterface{
    [key: string]: number | string | boolean
}

export interface EventsInterface{
    [key: string]: (string)[]
}

const commands : CommandsInterface = {
    "var": variable,
    "print": print,
    "alert": alerta,
    "clear": clear,
    "sum": sum,
    "sub": sub,
    "mult": mult,
    "div": div,
    "random": random,
    "randomf": randomf,
    "set": set,
    "concat": concat,
    "event": events,
    "renderstack": renderStack,
    "loop": loop,
    "if": if_condition,
    "call": call,
    "timeout": timeout,
    "interval": interval,
    "pow": pow,
    "sqrt": sqrt,
    "component": components,
    "style": style,
    "model": model,
    "delete": deleteComponent
}

let globalVariables : VariablesInterface = {};
let globalComponents : EventsInterface = {};
let globalEvents : EventsInterface = {};
let globalStyles : EventsInterface = {};
let globalModels : EventsInterface = {};

let globalRenderStack : EventsInterface | null = null;
let renderStackPointer : number = -1;

export function useVariables(){

    function get(){
        return globalVariables;
    }

    return [get];

}

export function useEvents(){

    function getEvents(){
        return globalEvents;
    }

    function getEventByName(name: string){
        return globalEvents[name];
    }

    return {getEvents, getEventByName};
}

export function useComponents(){

    function getComponents(){
        return globalComponents;
    }

    function getComponentByName(name: string){
        return globalComponents[name];
    }

    return {getComponents, getComponentByName};
}

export function useStyles(){

    function getStyles(){
        return globalStyles;
    }

    function getStyleByName(name: string){
        return globalStyles[name];
    }

    return {getStyles, getStyleByName};
}

export function useRenderStack(){

    function getRenderStack(){
        return globalRenderStack;
    }

    function getRenderStackPointer(){
        return renderStackPointer;
    }

    function nextRender(){
        if(globalRenderStack){
            let key = Object.keys(globalRenderStack)[0];

            if(renderStackPointer < globalRenderStack[key].length)
                renderStackPointer += 1;

            return globalRenderStack[key][renderStackPointer];
        }

        return "";
    }

    function backRender(){
        if(globalRenderStack){
            if(renderStackPointer > -1){
                let key = Object.keys(globalRenderStack)[0];
                renderStackPointer -= 1;
                
                return globalRenderStack[key][renderStackPointer];
            }
        }

        return "";
    }

    function setRenderStackPointer(pointer: number){
        if(globalRenderStack){
            let key = Object.keys(globalRenderStack)[0];
            
            if(pointer < 0 || pointer > globalRenderStack[key].length)
                return globalRenderStack[key][0];
        
            renderStackPointer = pointer;
            return globalRenderStack[key][pointer];
        }

        return "";
    }

    return {getRenderStack, getRenderStackPointer, nextRender, backRender, setRenderStackPointer};
}

export function reset(){
    globalVariables = {};
    globalComponents = {};
    globalEvents = {};
    loaded_code = [];
    current_line = 0;
    error = false;
}

export enum ErrorsList {
    MAX_PARAMETERS_RANDOM = `ERROR: This function allows only two parameters, minimum and maximum:\nrandom: min,max`,
    MAX_PARAMETERS_RANDOMF = `ERROR: This function allows only two parameters, minimum and maximum:\nrandomf: min,max`,
    UNSTOPPABLE_EVENT = `ERROR: Unstoppable event\nAdd end_event`,
    UNSTOPPABLE_RENDER_STACK = `ERROR: Unstoppable render stack\nAdd end_render_stack`,
    IF_MISSING_PARAMETERS = `ERROR: Missing parameters\nif: condition => event`,
    EVENT_NOT_DEFINED = `ERROR: Event not defined`,
    SET_MISSING_PARAMETERS = `ERROR: Missing parameter:\nset: value > variable`,
    VARIABLE_IN_USE = `ERROR: The variable [0] already exists`,
    EVENT_NOT_FOUNDED = `Event [0] not founded`,
    VARIABLE_NOT_FOUNDED = `ERROR: [0] variable not founded`,
    TYPE_DOESNT_MATCH = "ERROR: The type used does not match the operation\nExpected [0] , used [1]",
    BLOCKED_CONDITION = "ERROR: This command was blocked",
    INTERVAL_WRONG_STRUCTURE = "ERROR: Wrong structure.\nTry: interval: seconds,condition => event",
    TIMEOUT_WRONG_STRUCTURE = "ERROR: Wrong structure.\nTry: timeout: seconds => event",
    UNCLOSED_COMPONENT = "ERROR: Endless component\nAdd end_component",
    UNCLOSED_STYLE = "ERROR: Endless style\nAdd end_style",
    UNCLOSED_MODEL = "ERROR: Endless model\nAdd end_model"
}

let error: boolean = false;
let is_importing: boolean = false;

let loaded_code : string[] = [];
export let current_line = 0;

//Imprime uma informação no console
export function print(message: string){

    message = resolveMessage(message).trim();

    console.log(message.slice(1, message.length - 1));
}

//Alerta uma mensagem (APENAS NO NAVEGADOR)
export function alerta(message: string){
    message = resolveMessage(message).trim();

    alert(message.slice(1, message.length - 1));
}

//Limpa o console
export function clear(){
    console.clear();
}

function resolveMessage(message: string){
    message = message.split(" ").map((t) => {
        if(t.includes("var:{")){
            let init = t.indexOf("{")+1;
            let end = t.indexOf("}");
            return t.slice(0, t.indexOf("var:{")) + globalVariables[t.slice(init, end)] + t.slice(end+1, t.length);
        }
        else if(t.includes("func:{")){
            let init = t.indexOf("{")+1;
            let end = t.indexOf("}");
            return t.slice(0, t.indexOf("func:{")) + readReturn(t.slice(init, end)) + t.slice(end+1, t.length);
        }
        return t;
    }).join(" ");

    return message
}

//Realiza a soma de parametros
export function sum(params: string){
    let param_split = params.split(">");
    let numbers = param_split[0].trim().split(",");
    let result = 0;

    numbers.forEach((n) => {
        if(n.includes("var:{"))
            result += resolveVariable(n);
        else
            result += Number(n);
    });

    if(param_split.length >= 2)
        setToVariable(param_split[1].trim(), result);

    return result;
}

//Realiza a subtração de parametros
export function sub(params: string){
    let param_split = params.split(">");
    let numbers = param_split[0].trim().split(",");
    let result = (numbers[0].includes("var:{")) ? resolveVariable(numbers[0]) : Number(numbers[0]);

    numbers.forEach((n, index) => {
        if(index > 0){
            if(n.includes("var:{"))
                result -= resolveVariable(n);
            else
                result -= Number(n);
        }
    });

    if(param_split.length >= 2)
        setToVariable(param_split[1].trim(), result);

    return result;
}

//Realiza a multiplicação de parametros
export function mult(params: string){
    let param_split = params.split(">");
    let numbers = param_split[0].trim().split(",");
    let result = (numbers[0].includes("var:{")) ? resolveVariable(numbers[0]) : Number(numbers[0]);

    numbers.forEach((n, index) => {
        if(index > 0){
            if(n.includes("var:{"))
                result *= resolveVariable(n);
            else
                result *= Number(n);
        }
    });

    if(param_split.length >= 2)
        setToVariable(param_split[1].trim(), result);

    return result;
}

//Realiza a divisão de parametros
export function div(params: string){
    let param_split = params.split(">");
    let numbers = param_split[0].trim().split(",");
    let result = (numbers[0].includes("var:{")) ? resolveVariable(numbers[0]) : Number(numbers[0]);

    numbers.forEach((n, index) => {
        if(index > 0){
            if(n.includes("var:{"))
                result /= resolveVariable(n);
            else
                result /= Number(n);
        }
    });

    if(param_split.length >= 2)
        setToVariable(param_split[1].trim(), result);

    return result;
}

//Gera um numero aletótio no intervalo definido
export function random(params: string){
    let param_split = params.split(">");
    let numbers = param_split[0].trim().split(",");

    if(numbers.length != 2)
        displayError(ErrorsList.MAX_PARAMETERS_RANDOM, current_line, null);
    else{
        let min = (numbers[0].includes("var:{")) ? resolveVariable(numbers[0]) : numbers[0];
        let max = (numbers[1].includes("var:{")) ? resolveVariable(numbers[1]) : numbers[1];

        let result = Math.floor(Math.random() * (max - min) + min);

        if(param_split.length >= 2)
            setToVariable(param_split[1].trim(), result);

        return result;
    }
    return undefined;
}

//Gera um numero aletótio (Decimal) no intervalo definido
export function randomf(params: string){
    let param_split = params.split(">");
    let numbers = param_split[0].trim().split(",");

    if(numbers.length != 2)
        displayError(ErrorsList.MAX_PARAMETERS_RANDOMF, current_line, null);
    else{
        let min = (numbers[0].includes("var:{")) ? resolveVariable(numbers[0]) : numbers[0];
        let max = (numbers[1].includes("var:{")) ? resolveVariable(numbers[1]) : numbers[1];

        let result = (Math.random() * (max - min) + min);

        if(param_split.length >= 2)
            setToVariable(param_split[1].trim(), result);

        return result;
    }
    return undefined;
}

//Retorna a potencia de um número base por um expoente
export function pow(params: string){
    let param_split = params.split(">");
    let numbers = param_split[0].trim().split(",");

    let base = (numbers[0].includes("var:{")) ? resolveVariable(numbers[0]) : numbers[0];
    let expo = (numbers.length < 2) ? 1 : (numbers[1].includes("var:{")) ? resolveVariable(numbers[1]) : numbers[1];

    let result = Math.pow(base, expo);
    if(param_split.length >= 2)
        setToVariable(param_split[1].trim(), result);
    return result;
}

//Realiza a raíz quadrada de um numero
export function sqrt(params: string){
    let number = (params.includes("var:{")) ? resolveVariable(params) : resolveValue(params);

    let result = Math.sqrt(number);

    return result;
}

//Concatena strings
export function concat(params: string){
    let param_split = params.split(">");
    let texts = param_split[0].trim().split(",");

    let result = "";

    texts.forEach((t) => {
        result += t;
    })

    if(param_split.length >= 2)
        setToVariable(param_split[1].trim(), result);

    return result;
}

//Lê o comando de variável e armazena a variável
export function variable(params: string){
    let param_split = params.split("=");
    let var_name = param_split[0].trim();
    let var_value = param_split[1].trim();

    if(!(var_name in globalVariables))
        globalVariables[var_name] = resolveValue(var_value);
    else{
        displayError(ErrorsList.VARIABLE_IN_USE, current_line, [var_name]);    
        error = false;
    }
}

//Adiciona um evento/método
export function events(params: string){
    let event_name = params;
    let functions = [];

    if(!(loaded_code.includes("end_event", current_line)))
        displayError(ErrorsList.UNSTOPPABLE_EVENT, current_line, null);
    else{
        current_line++;
        while(loaded_code[current_line].toLowerCase() != "end_event"){
            functions.push(loaded_code[current_line].trim());
            current_line++;
        }
        globalEvents[event_name] = functions;
    }
}

export function renderStack(params: string){

    if (!globalRenderStack){
        let stack_name = params;
        let renders : string[] = [];

        globalRenderStack = {};
    
        if(!(loaded_code.includes("end_render_stack", current_line)))
            displayError(ErrorsList.UNSTOPPABLE_RENDER_STACK, current_line, null);
        else{
            current_line++;
            while(loaded_code[current_line].toLowerCase() != "end_render_stack"){
                renders.push(loaded_code[current_line].trim());
                current_line++;
            }
            globalRenderStack[stack_name] = renders;
        }
    }

}

export function components(params: string){
    let component_name = params;
    let functions = [];

    if(!(loaded_code.includes("end_component", current_line)))
        displayError(ErrorsList.UNCLOSED_COMPONENT, current_line, null);
    else{
        current_line++;
        while(loaded_code[current_line].toLowerCase() != "end_component"){
            functions.push(loaded_code[current_line].trim());
            current_line++;
        }
        globalComponents[component_name] = functions;
    }
}

export function deleteComponent(params: string){
    if(params in globalComponents)
        delete globalComponents[params];
}

export function render(content: string[]){
    reset();
    executeScript(content);
}

export function new_components(params: string){
    let params_split = params.split(",");
    let component_name = params_split[1].trim();
    let functions = globalModels[params_split[0].trim()].slice(0, globalModels[params_split[0].trim()].length);

    globalComponents[component_name] = functions;
}

function model(params: string){
    let model_name = params;
    let functions = [];

    if(!(loaded_code.includes("end_model", current_line)))
        displayError(ErrorsList.UNCLOSED_MODEL, current_line, null);
    else{
        current_line++;
        while(loaded_code[current_line].toLowerCase() != "end_model"){
            functions.push(loaded_code[current_line].trim());
            current_line++;
        }
        globalModels[model_name] = functions;
    }
}

export function style(params: string){
    let style_name = params;
    let functions = [];

    if(!(loaded_code.includes("end_style", current_line)))
        displayError(ErrorsList.UNCLOSED_STYLE, current_line, null);
    else{
        current_line++;
        while(loaded_code[current_line].toLowerCase() != "end_style"){
            functions.push(loaded_code[current_line].trim());
            current_line++;
        }
        globalStyles[style_name] = functions;
    }
}

//Importa um evento lido
export function import_event(params: string[]){
    let event_name = params[0].replace("event:", "").trim();
    let functions = [];

    if(!params.includes("end_event"))
        displayError(ErrorsList.UNSTOPPABLE_EVENT, current_line, null);
    else{
        for(var x = 1; x < params.length; x++){
            if(params[x] != "end_event")
                functions.push(params[x])
        }

        globalEvents[event_name] = functions;
    }
}

//Executa um evento em loop
export function loop(params:string){
    let param_split = params.split("=>");
    let event = param_split[1].trim();
    
    if(event in globalEvents){
        if(!isNaN(Number(param_split[0].trim()))){
            let count = Number(param_split[0].trim());

            for(var x = 0; x < count; x++){
                executeEvent(event);
            }
                
        }
        else{
            while(verifyCondition(param_split[0])){
                executeEvent(event)
            }
        }
            
    }
    else
        displayError(ErrorsList.EVENT_NOT_FOUNDED, current_line, [event]);
}

//Faz verificações booleanas
export function verifyCondition(condition: string){

    let blocked_words = ["import","require","eval","function","new Function","setTimeout","setInterval","=>"]
    let block = false;

    
    blocked_words.forEach((b) => {
        if(condition.includes(b))
            block = true;
    });

    if(!block){
        let c : string[] = condition.split(" ");
    
        c = c.map(t => {
            if(t.includes("var:{"))
                return resolveVariable(t);
            return t;
        });

        return eval(c.join(" "));
    }

    displayError(ErrorsList.BLOCKED_CONDITION, current_line, null)
    return undefined;

}

//Executa um evento
export function executeEvent(event: string){
    globalEvents[event].forEach((f) => {
        readReturn(f.trim());
    });
}

//Chama um evento diretamente
export function call(params: string){

    let event = params.trim();
    if(event in globalEvents)
        executeEvent(event)
    else if(!(event in globalEvents))
        displayError(ErrorsList.EVENT_NOT_FOUNDED, current_line, [event]);
}

//Executa um evento se condição for igual a true
export function if_condition(params: string){
    let param_split = params.split("=>");
    let condition = param_split[0].trim();
    
    if(param_split.length == 2){
        let event = param_split[1].trim();
        if(event.startsWith("func:{")){
            if(verifyCondition(condition)){
                let init = event.indexOf("{")+1;
                let end = event.indexOf("}");
                readReturn(event.slice(init, end))
            }
        }
        else if(event in globalEvents){
            if(verifyCondition(condition))
                executeEvent(event)
            // else
            //     verifyNextCondition()
        }
        else if(!(event in globalEvents))
            displayError(ErrorsList.EVENT_NOT_FOUNDED, current_line, [event]);
    }
    else
        displayError(ErrorsList.IF_MISSING_PARAMETERS, current_line, null);

}

//Executa um evento caso o if falhe
export function else_condition(params: string){
    let param_split = params.split(":");

    if(param_split.length == 2){
        let event = param_split[1].trim();
        if(event.startsWith("func:{")){
            let init = event.indexOf("{")+1;
            let end = event.indexOf("}");
            readReturn(event.slice(init, end))
        }
        else if(event in globalEvents)
            executeEvent(event)
        else
            displayError(ErrorsList.EVENT_NOT_FOUNDED, current_line, [event]);
    }
    else
        displayError(ErrorsList.EVENT_NOT_DEFINED, current_line, null);
}

//ALTERAR A LOGICA
//Verifica as próximas instruções após o if 
export function verifyNextCondition(){
    current_line++;

    try{
        if(loaded_code[current_line].trim().startsWith("elif:"))
            if_condition(loaded_code[current_line].trim());
        else if(loaded_code[current_line].trim().startsWith("else:"))
            else_condition(loaded_code[current_line].trim());
    }catch{}
}

//Executa evento após tempo
export function timeout(params: string){
    let param_split = params.split("=>");

    if(param_split.length == 2){

        let time = (param_split[0].trim().startsWith("var:{")) ? resolveVariable(param_split[0].trim()) : resolveValue(param_split[0].trim());
        let event = param_split[1].trim();
    
        if(typeof time != "number"){
            displayError(ErrorsList.TYPE_DOESNT_MATCH, current_line, ["number", (typeof time).toString()]);
        }
        else{
            let time_out_event = setTimeout(() => {
                executeEvent(event);
                clearTimeout(time_out_event);
            }, time*1000);
        }
    }
    else{
        displayError(ErrorsList.TIMEOUT_WRONG_STRUCTURE, current_line, null);
    }

}

//Executa evento em um intervalo, sendo parado por uma condição for true
export function interval(params: string){
    let params_split = params.split("=>");
    
    if(params_split.length == 2){
        let params_interval_split = params_split[0].trim().split(",");
        let event = params_split[1].trim();
    
        if(params_interval_split.length == 2){
            let time = (params_interval_split[0].trim().startsWith("var:{")) ? resolveVariable(params_interval_split[0].trim()) : resolveValue(params_interval_split[0].trim());
            if(typeof time != "number")
                displayError(ErrorsList.TYPE_DOESNT_MATCH, current_line, ["number", (typeof time).toString()]);
            else{
                let time_interval_event = setInterval(() => {
                    
                    executeEvent(event);
            
                    if(verifyCondition(params_interval_split[1]))
                        clearInterval(time_interval_event);
                }, time*1000);
            }
        }
        else{
            displayError(ErrorsList.INTERVAL_WRONG_STRUCTURE, current_line, null);
        }
    }
    else
        displayError(ErrorsList.INTERVAL_WRONG_STRUCTURE, current_line, null);

}

//Adiciona o valor a uma variável
export function setToVariable(params: string, result: number | string | boolean){
    if(params in globalVariables)
        globalVariables[params] = result;
    else
        displayError(ErrorsList.VARIABLE_NOT_FOUNDED, current_line, [params]);
}

//Seta um valor a uma variável
export function set(params: string){
    let param_split = params.split(">");

    if(param_split.length == 2){
        let value = (param_split[0].includes("var:{")) ? resolveVariable(param_split[0]) : resolveValue(param_split[0]);
        let variable = (param_split[1].includes("var:{")) ? resolveVariable(param_split[1].trim()) : param_split[1].trim();
    
        globalVariables[variable] = value;
    }
    else{
        displayError(ErrorsList.SET_MISSING_PARAMETERS, current_line, null);
    }
}

//Seta um valor a uma variável (TEXTO)
export function setText(params: string){
    let param_split = params.split("#>");

    if(param_split.length == 2){
        let value = (param_split[0].includes("var:{")) ? resolveVariable(param_split[0]) : resolveValue(param_split[0]);
        let variable = param_split[1].trim();
    
        globalVariables[variable] = value;
    }
    else{
        displayError(ErrorsList.SET_MISSING_PARAMETERS, current_line, null);
    }
}

//Converte o valor string para o tipo adequado
export function resolveValue(value: string){
    if(value == "true")
        return true;
    else if(value == "false")
        return false;
    else if(!isNaN(Number(value)))
        return Number(value);
    return value.slice(0, value.length);
}

//Substitui a variável em formato texto pelo valor da variável
export function resolveVariable(value: string) : any{
    let init = value.indexOf("{")+1;
    let end = value.indexOf("}");

    return globalVariables[value.slice(init, end)];
}

//Lê cada linha do programa
export function read(){
    if(!error){
        let current = loaded_code[current_line].trim();
    
        let command_end = current.indexOf(":");
        let command = current.slice(0, command_end).toLowerCase();
    
        if(!current.startsWith("//")){
            if(command in commands)
                commands[command](current.slice(command_end+1, current.length).trim());
        }
    
        current_line++;
        if(current_line < loaded_code.length && !is_importing)
            read();
    }
}

//Executa o comando o resultado da operação
export function readReturn(params: string){
    let command_end = params.indexOf(":");
    let command = params.slice(0, command_end).toLowerCase();

    if(command in commands)
        return commands[command](params.slice(command_end+1, params.length).trim());
    return undefined;
}

//Executa um script baseado no path
export function executeScript(data: string[]){
    loaded_code = data;
    read();
}

//Mostra um erro no console
export function displayError(message: string, line: number, params: (string | number | boolean)[] | null){

    message = message.split(" ").map((m) => {
        if(m.startsWith("[") && m.endsWith("]") && params != null)
            return `"${String(params[Number(m.slice(1, m.length-1))])}"`;
        return m;
    }).join(" ");

    console.error((`LINE: ${line+1}\n` + message));
    error = true;
}