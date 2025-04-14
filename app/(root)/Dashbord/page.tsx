// import React from 'react'
// import layout from '@/app/(root)/Dashbord/layout';
import { currentUser } from '@clerk/nextjs/server'

const  Page = async () => {
   const user = await currentUser(); 
    return (
    <>
        Mr {user?.fullName} Bienvenue ceci est votre Dashbord
    </>
  )
}

export default Page