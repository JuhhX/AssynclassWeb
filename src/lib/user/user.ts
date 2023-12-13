'use server'

import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface UserToken{
    id: string,
    type: string,
    //avatar: string
}

export async function getUserName(){
    const token = cookies().get("token")?.value;
    const user : UserToken = decode(token+"");

    return user;
}