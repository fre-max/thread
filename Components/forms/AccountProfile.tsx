"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { userValidation } from '@/lib/validation/user';
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import UpDate from './UpDate';

interface props{
user:{
    id: string,
    objectId: string,
    name :string,
    username:string,
    bio: string,
    image : string,
} ,
btnTitle:string
}


const AccountProfile = ({user }:props ) => {

    const[file,setfile] = useState <File[]> ([])

    const {startUpload} = useUploadThing("imageUploader");
    //console.log(typeof startUpload);
    

    const pathname = usePathname();
    const router = useRouter();

    const form = useForm(
        {
            resolver:zodResolver(userValidation),
            defaultValues:{
                profile_photo:user?.image || "",
                name: user?.name||"",
                username:user?.username || "",
                bio: user?.bio || ""
            }
        }
    );
    
    
    async function onSubmit  (values: z.infer<typeof userValidation>) {
    
        const blob = values.profile_photo;

        const hasImageChanged = isBase64Image(blob)

        
       await UpDate(values,startUpload,user.id,file,hasImageChanged,pathname);
      
    if(pathname ==='/profile/edit') router.back(); else router.push("/");
    }
    
    function handleImage(e:ChangeEvent<HTMLInputElement> , fieldChange: (value:string)=> void){
        e.preventDefault();
        const fileReader = new FileReader(); 
       
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            setfile(Array.from(e.target.files));
            if(!file.type.includes("image")) return;

            fileReader.onload = async (event) => 
              {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
              }  
            
              fileReader.readAsDataURL(file);
        }
        
      }


    return (
        <Form {...form}
        
        >
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className='flex flex-col gap-10 '
        >
          
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className=' flex items-center gap-4 '>
                
                <FormLabel className="account-from_image-label">
                  {field.value ? ( 
                    <Image src={field.value} alt="Profile photo" width={96} height={96} priority 
                    className='rounded-full object-contain '/>  
                
                ): 
                <Image src="\assets\profile.svg" alt="Profile photo" width={24} height={24}  
                    className='rounded-full object-contain '/>
                }  
                </FormLabel>
                
                <FormControl className='flex-1 text-base-semibold text-gray-200' >
                  <Input accept='image/*' type='file'  placeholder="Upload a photo"
                  className=' account-form_image-input'
                  onChange={ (e)=> handleImage(e,field.onChange)}
                  />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=' flex flex-col gap-3 w-full'>
            
                <FormLabel className="text-base-semibold text-light-2 ">
                Name
                </FormLabel>
                
                <FormControl className='' >
                  <Input className=' account-form_input no-focus'
                  type='text'
                  //onChange= {(e)=> handleImage(e,field.onChange)}
                  {...field}
                  />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className=' flex flex-col gap-3 w-full'>
            
                <FormLabel className="text-base-semibold text-light-2 ">
                Username
                </FormLabel>
                
                <FormControl className='' >
                  <Input className=' account-form_input no-focus'
                  type='text'
                  //onChange= {(e)=> handleImage(e,field.onChange)}
                  {...field}
                  />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className=' flex flex-col gap-3 w-full'>
            
                <FormLabel className="text-base-semibold text-light-2 ">
                Bio
                </FormLabel>
                
                <FormControl className='' >
                  
                  <Textarea className='account-form_input no-focus' rows={10} {...field}/>
                    
                  </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className='bg-primary-500'>Submit</Button>
        </form>
      </Form>
  )
}

export default AccountProfile