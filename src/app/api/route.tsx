import { NextRequest, NextResponse } from "next/server";

//ESTA ROTA É CHAMADA QUANDO O USUÁRIO FAZ LOGIN E REDIRECIONA
//DE ACORDO COM O SEU TIPO DE CONTA (ALUNO, PROFESSOR)
export async function GET(request: NextRequest) {

    const {searchParams} = new URL(request.url);
    const type = searchParams.get("type")

    if(type == "0")
        return NextResponse.redirect(new URL("/student/home", request.url), {})
    else if(type == "1")
        return NextResponse.redirect(new URL("/teacher/home", request.url), {})
    else
        return NextResponse.redirect(new URL("/instituition/home", request.url), {})
}