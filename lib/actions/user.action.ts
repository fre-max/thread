"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { ConnecteToDB } from "../mongose";
// import { error } from "console";
interface Props {
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string
}

export const updateUser = async (
    {userId,
    username,
    name,
    bio,
    image,
    path}
:Props):Promise <void> => {
 
    ConnecteToDB();
    try{
    
    await User.findOneAndUpdate({id:userId},{userName :username.toLowerCase(),
     name,
     bio,
     image,
     onboarded:true,
    },
    {upsert:true});

    if(path === "/profile/edit") revalidatePath(path);
}
 catch (error:any){
    throw new Error(  `Failed to create/update user: ${error.message} `  );
 }
 

}

export const fetchUser = async (userId:string) => {
 try {
    ConnecteToDB();
    return await User 
    .findOne({id:userId})
    // .populate({
    //     path:"communities"
    //     model: communities
    // })    
 } catch (error:any) {
    throw new Error(`Failed to fetch user: ${error.message}`)
 }   
}