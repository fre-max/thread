"use client";
import { sidebarLinks } from "@/contents";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Bottombar() {
  
  const pathname = usePathname(); 

  return (
    
      <section className='bottombar' >
      
      <div className ='bottombar_container'>
      {
      sidebarLinks.map( (links)=>
       {
        const isActive = (pathname.includes(links.route) && links.route.length > 1) || pathname === links.route;
          // console.log(isActive);
        return (
        <Link key={links.label} href={links.route} className={`bottombar_link ${isActive && 'bg-primary-500'} `} >
          <Image src={links.imgURL} alt={links.label} width={24} height={24}/>
  
      <p className="text-light-1 text-subtle-medium max-sm:hidden">
         {links.label.split(/\s+/)[0]}
      </p>
      </Link>
    )
  }
     
     )}
      </div>
  
      </section>
    
  )
}
