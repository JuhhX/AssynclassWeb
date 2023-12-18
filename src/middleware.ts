import { NextRequest, NextResponse } from 'next/server'
import jwt_Decode from "jwt-decode";

export function middleware(request: NextRequest) {
    const token : string | undefined = request.cookies.get('token')?.value
    //3 porque ainda terá a instituição que será o 2
    const typeURL = (request.url.includes("student")) ? "0" : 
    (request.url.includes("teacher")) ? "1" : 
    (request.url.includes("instituition")) ? "2" : 
    (request.url.includes("company")) ? "3" : "4";

    if(token){
        const decode : any = jwt_Decode(token);
        if(typeURL == "4"){
            return NextResponse.next()
        }
        else{
            if(decode.type == typeURL || request.url.includes("/create") || request.url.includes("/profile"))
                return NextResponse.next()
            else if (decode.type == "0")
                return NextResponse.redirect("http://localhost:3000/student/home", {})
            else if(decode.type == "1")
                return NextResponse.redirect("http://localhost:3000/teacher/home", {})
            else if(decode.type == "2")
                return NextResponse.redirect("http://localhost:3000/instituition/home", {})
            else if(decode.type == "3")
                return NextResponse.redirect("http://localhost:3000/company/home", {})
        }
    }

    return NextResponse.redirect("http://localhost:3000/login", {})
}

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*', '/instituition/:path*', '/chat/:path*', '/company/:path*'],
}
