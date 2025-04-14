"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/Components/ui/form';
// import ThreadCreate from '@/lib/actions/thread.action';
import { addCommentThread } from '@/lib/actions/thread.action';
import { CommentValidation } from '@/lib/validation/thread';
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { Button } from '../ui/button';
import { Input } from '../ui/input';


interface props {threadId : string
currentUserImg :string,
currentUserId :string
}

const Comment = ({threadId,currentUserImg ,currentUserId}: props) => {

  const pathName = usePathname();
    
  const form = useForm({
      resolver: zodResolver(CommentValidation),
      defaultValues :{
        Thread:"",
        AccountID:"",
      }
    })

    async function onSubmit ( value : z.infer<typeof CommentValidation> ){

      await addCommentThread(
        threadId , 
        value?.Thread,
        JSON.parse(currentUserId),
        pathName
      );

      form.reset();
    }
    

  return (
    
    <Form {...form} 
    >
    <form onSubmit={form.handleSubmit(onSubmit)} 
    className='comment-form'
    >

    <FormField
        control={form.control}
        name="Thread"
        render={({ field }) => (
          <FormItem className=' flex items-center w-full gap-3 '>
            
            <FormLabel className="text-base-semibold text-light-2">
             
            <Image src={currentUserImg} alt ="Account Profile"  width={48} height ={48}  className = "rounded-full object-cover" />

            </FormLabel>
            

            <FormControl className='border-none bg-transparent' >
            
            <Input type="text"  placeholder ="Comment..." className="no-focus text-dark-2 outline-none" {...field} />

            </FormControl>
           
          </FormItem>
        )}
      />
    
    <Button type='submit'  className='comment-form_btn'>
        Reply         
    </Button>

  </form>
  </Form>

  )
}

export default Comment