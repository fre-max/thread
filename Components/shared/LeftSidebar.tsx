"use client";
import { sidebarLinks } from "@/contents/index.js";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


export default function LeftSidebar() {
  const pathname= usePathname();
  const Router = useRouter();

  

  return (

    <section className='custom-scrollbar leftsidebar' >
      
    <div className ="flex w-full flex-1 flex-col gap-6 px-6">
    {
    sidebarLinks.map( (links)=>
     {
      const isActive = (pathname.includes(links.route) && links.route.length > 1) || pathname === links.route;
        // console.log(isActive);
      return (
      <Link key={links.label} href={links.route} className={`leftsidebar_link ${isActive && 'bg-primary-500'} `} >
      <Image src={links.imgURL} alt={links.label} width={24} height={24}/>

    <p className="text-light-1 max-lg:hidden">
       {links.label}
    </p>
    </Link>
  )
}
   
   )}


    </div>

    <div className="  mx-auto items-center justify-center block max-md:hidden">

<SignedIn>

  <SignOutButton>
  <div className=" flex cursor-pointer max-md:hidden">
    <Image src="\assets\logout.svg" alt="LogOut" width={24} height={24}/>
  </div>
  </SignOutButton>

</SignedIn>
  </div>

    </section>
  )
  
}
