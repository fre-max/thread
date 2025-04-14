
import { updateUser } from "@/lib/actions/user.action";
import { userValidation } from "@/lib/validation/user";
import { z } from "zod";

async function UpDate  (values: z.infer<typeof userValidation> ,startUpload:Function, Id:string ,file: File[] , hasImageChanged:boolean ,pathname:string) {
    
    // const {startUpload} = useUploadThing("media");
    
try{
    if(hasImageChanged){
        const imageRes = await startUpload(file);
        
       if(imageRes && imageRes[0].ufsUrl) values.profile_photo= imageRes[0].ufsUrl;
    }

   await updateUser({
    userId: Id, 
    name: values.name,
    username:values.username,  
    bio:values.bio,  
    image:values.profile_photo,
    path:pathname 
    });
}
catch (error){
     console.log(error);
}
}

export default UpDate;