import ThreadPost from "@/Components/forms/ThreadPost";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  
    const User = await currentUser();

        if(!User)return null

        const UserInfo = await fetchUser(User.id);
        
        if(!UserInfo?.onboarded) redirect("/Onboarding");
        // const userInfo = await fetchUser(User.id);
        
        return (
    <h1 className=" head-text">
    Create Thread
    <ThreadPost userId ={User.id}></ThreadPost>
    </h1>
  )
}

export default Page