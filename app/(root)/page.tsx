import ThreadCard from "@/Components/Card/ThreadCard";
import { Threadfetch } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

 export  default async function  Home () {
    
  const User = await currentUser();

  const result = await Threadfetch(1,30);
 
  const userInfo = await fetchUser(User?.id as string);
  return (
    <>
      <h1 className="head-text text-left">Home </h1>
      
      <section>
        {result.posts.length === 0 ? 
        <p className=" no-result"> No Thread Found</p > :
        <div className ="flex flex-col gap-9">
        {result.posts.map((posts) =>
        (
         <ThreadCard 
         key ={posts._id} 
         Id= {posts._id} 
         currentUserId={User?.id as string} 
         parenId ={posts.parentId} 
         content ={posts.text}
         community ={posts.community}
         author = {posts.author}
         createdAt ={posts.createdAt}
         comments = {posts.children}
         /> 
        
      ) )}
        </div>
        }
      </section>

      <Link className="text-left text-light-1 font-bold text-small-semibold" href="/Onboarding">
      Onboarding
      </Link>      
     
     </>
     
  );
}
