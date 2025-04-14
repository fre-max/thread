import { ClerkProvider } from '@clerk/nextjs'
// import { Children } from 'react'
import {Inter} from 'next/font/google'
import "../globals.css"
import {ReactNode} from "react"

export const metadata = {
    title:"Threads",
    description:"A Next/js 13 Meta Threads Application"
}

interface Props {
    children :React.ReactNode
}

const inter = Inter({subsets:["latin"]})

const Layout = ({children}:Props) => {
  return (
    <ClerkProvider >
        <html lang='en'>
            <body className={ ` ${inter.className} bg-dark-1 h-screen flex justify-center items-center` }>
                {children}
            </body>
        </html>
    </ClerkProvider>
  )
}

export default Layout