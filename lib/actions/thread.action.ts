"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { ConnecteToDB } from "../mongose";
import { fetchUser } from "./user.action";

interface Params {
text:string,
author :string,
communityId:string | null,
path:string
}

export default async function ThreadCreate ({text,author,communityId,path}:Params)
{
    
    try {
        ConnecteToDB();
        const Id= await fetchUser(author);
        // const ExistingUser= await User.findOne({id:author});
        // if(!ExistingUser) throw new Error("User not found");
        // if(ExistingUser)  console.log("c'est");;
 
        const create = await Thread.create ({
            text,author:Id._id
        })
        //update User Model 
        await User.findByIdAndUpdate(Id._id ,{$push:{threads:create._id}})
        revalidatePath(path);
    } 
    catch (error:any) {
        throw new Error(  `Error create Thread: ${error.message} `  )
        
    }
}

export async function ThreadfetchById(id :string) {
ConnecteToDB();



try {
    const thread = Thread.findById(id)
    .populate({
        path: "author",
        model: User,
        select:"_id id name parentId image"
    })
    
    .populate({
        path: "children",
        populate:[
            {
        path: "author",
        model: User,
        select:"_id id name parentId image"
            },{
                
                path: "children",
                populate:
                    {
                path: "author",
                model: User,
                select:"_id id name parentId image"
                    }

            }
        ]
    });
    

 const send= await  thread;

   return send ;
    

} catch (error:any) {
    throw new Error ( `Error fecthing  thread: ${error.message} ` )
}
}


export  async function Threadfetch(pageNumber=1,pageSize=10) {

    ConnecteToDB();

    const skipAmount = (pageNumber - 1) * pageSize ;

    const postsQuery = await Thread.find({parentId:{$in:[null,undefined]}})
    .sort({createdAt:'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({path:'author',model:User})
    .populate({
        path:"children",
        populate:{
            path:"author",
            model:User,
            select:"_id name parentId image"
        }
    })

    const totalPostCount= await Thread.countDocuments({parentId:{$in:[null,undefined]}})
    
    const posts = await postsQuery;

    const isNext= totalPostCount > skipAmount + posts.length ;
    
    return {posts , isNext} 
}

export async function addCommentThread (
    threadId:string, 
    commentText: string,
    userId:string,
    path:string
){
   await ConnecteToDB();

   try {
    //Find the orriginal thread by Id
    const originalThread = await Thread.findById(threadId);

    if(!originalThread) throw new Error("Thread Not Found");

    const commentThread = new Thread(
        {
            text:commentText,
            author:userId,
            parentId:path,           
        }
    );

    const savedCommentThread = await commentThread.save();
    //  console.log(savedCommentThread);
    //  if(originalThread.children === null)  
    //    console.log(originalThread.children);
    
    const Id = savedCommentThread._id;

     const childUpdate= await originalThread.children.push(Id);
    
     await originalThread.save();
     

    revalidatePath(path);

   } catch (error:any) {
    // console.log(error.message)
    throw new Error( `Error to Post Comment ${error.message} ` )
   }

}
