// import React from 'react'
"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import ThreadCreate from '@/lib/actions/thread.action';
import { ThreadValidation } from '@/lib/validation/thread';
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

function ThreadPost ({userId}:{userId:string} )  {
 
    const pathname = usePathname();
    const router = useRouter();

    // const   form = useForm({ resolver:zodResolver(ThreadValidation)});

    const form = useForm(
        {
            resolver:zodResolver(ThreadValidation),
            defaultValues:{
            Thread:"",
            AccountID:""
            }
          
        }
    );
    

    async function onSubmit (value: z.infer<typeof ThreadValidation>)  
    {
     try {
      await ThreadCreate({text:value.Thread ,author:userId,communityId:null,path:pathname})
      router.push("/")
     } catch (error:any) {
      throw new Error( ` ${error.message} ` )
     }
  }
     
    
    return (
        <Form {...form} 
        >
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className='flex flex-col gap-10'
        >

        <FormField
            control={form.control}
            name="Thread"
            render={({ field }) => (
              <FormItem className=' flex flex-col w-full gap-3 '>
                
                <FormLabel className="text-base-semibold text-light-2">
                  Content 
                </FormLabel>
                
                <FormControl className='no-focus border-dark-3  bg-dark-3 text-light-1' >
                  <Textarea rows ={15} {...field} />

                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
        
        <Button type='submit'  className='bg-primary-500'>
            Post Thread         
        </Button>

      </form>
      </Form>
  )
}

export default ThreadPost