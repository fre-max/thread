
const  page = async () => {

    // const {id} = await params; 

    // // if(!id) return null

    // const user = await currentUser();
    // if(!user) return null;
    
    
    // const userInfo = await fetchUser(user.id);
    // if(!userInfo.onboarded) redirect ('/Onboarding')

    // const thread = await ThreadfetchById(userInfo.id);
    // // const  image = 

    return (
    <section className="text-light-2">
        Hello 
{/*         
        <p className="bg-red-400">{id}</p>
        <p className= "bg-blue">{user.id} </p>

        <div className="relative">

        <ThreadCard 
        key = {thread._id} 
        Id = {thread._id} 
        currentUserId = {user?.id as string} 
        parenId = {thread.parentId} 
        content = {thread.text}
        community = {thread.community}
        author = {thread.author}
        createdAt = {thread.createdAt}
        comments = {thread.children}
        /> 

        </div>

            < div className="mt-7">
                <Comment
                threadId = {thread.id}
                currentUserImg = {user.imageUrl}
                currentUserId = {JSON.stringify (userInfo._id)}
                />

            </div>
            <div className="mt-10 ">
                
                {thread.children.map((child:any)=> 
                        <ThreadCard 
                        key ={child._id} 
                        Id= {child._id} 
                        currentUserId={child?.id} 
                        parenId ={child.parentId} 
                        content ={child.text}
                        community ={child.community}
                        author = {child.author}
                        createdAt ={child.createdAt}
                        comments = {child.children}
                         isComment 
                        /> 
                )}

            </div>
 */}
    </section>
  )
}

export default page
