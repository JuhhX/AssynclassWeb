import { deleteCookie } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

//ESTA ROTA DESCONECTA O USUARIO
export async function GET(request: NextRequest) {

    deleteCookie();

    return NextResponse.redirect(new URL("/login", request.url), {})
}