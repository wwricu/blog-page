import { NextResponse } from "next/server"

export const proxy = async () => {
    const response = NextResponse.next();

    response.headers.set('x-api-key-id', process.env.NEXT_API_KEY_ID || '');
    response.headers.set('x-api-key', process.env.NEXT_API_KEY || '');
    return response
}
