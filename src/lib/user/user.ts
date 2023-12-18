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
    const user : UserToken = (token) ? decode(token+"") : {id: "-1", type: "-1"};

    return user;
}