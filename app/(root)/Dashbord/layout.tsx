import React from 'react'
import {currentUser} from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs'; 

 const  layout = async ({children}:{children:React.ReactNode}) => {
  
    const user = await currentUser();
    // console.log(user?.privateMetadata.role);
    

   if(!user) redirect("/") 
 
    return (
    <div>
      {/* <UserButton/> */}
      
        {children}
    </div>
  )
}

export default layout