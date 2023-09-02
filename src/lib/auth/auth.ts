'use server'
import { cookies } from 'next/headers';

export async function setCookie(data: string){
    const cookieExpiresInSeconds = 60 * 60 * 24 * 30
    
    cookies().set("token", data);
    cookies().set("max-age", cookieExpiresInSeconds+"");
}

export async function deleteCookie() {
    cookies().set("token", "");
    cookies().set("max-age", "")
}