import "@/styles/globals.css"
import type {AppProps} from "next/app"
import Header from "@/components/Header";
import React from "react";

export default function App({Component, pageProps}: AppProps) {
    return (
        <div className='min-h-lvh bg-slate-100 bg-[url(/dust_scratches.webp)]'>
            <Header/>
            <Component {...pageProps} />
            <div className='shadow-md text-center bg-transparent mt-0 pt-0 sm:h-12 max-sm:h-6'>
                <div className='divider mt-0 mb-3 max-sm:hidden'/>
                wwr.icu {new Date().getFullYear()}
            </div>
        </div>
    )
}
