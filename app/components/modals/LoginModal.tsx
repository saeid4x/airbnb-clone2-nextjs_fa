"use client";

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler,useForm } from 'react-hook-form';

import {signIn} from 'next-auth/react'

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/input';
import {toast} from 'react-hot-toast'
import Button from '../Button';
import { useRouter } from 'next/navigation';


const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
          
            email:'',
            password:''
        }
    });


    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
         signIn('credentials' , {
            ...data,
            redirect:false
         })
          .then((callback) =>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
             
            }

            if(callback?.error){
                toast.error(callback.error)
            }
          })
          
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    } , [loginModal, registerModal])

    const bodyContent= (
        <div className='flex flex-col gap-4'>
           <Heading 
              title='خوش آمدید'
              subtitle='وارد حساب کاربری خود شوید'               
           />
           <Input 
             id="email"
             label='ایمیل'
             disabled={isLoading}
             register={register}
             errors={errors}
             required
           />
            
           <Input 
             id="password"
             label='کلمه عبور '
             type='password'
             disabled={isLoading}
             register={register}
             errors={errors}
             required
           />

        </div>
    )


    const footerContent = (
        <div className='flex flex-col gap-3 mt-3'>
            <Button 
                outline 
                label='ادامه با گوگل'
                 icon={FcGoogle} 
                 onClick={() => signIn('google')}
             />
            <Button 
                outline 
                label='ادامه با گیت هاب '
                 icon={AiFillGithub} 
                 onClick={() =>{}}
             />

             <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>
                        اولین بار است که از airbnb استفاده می کنید؟
                    </div>

                    <div
                      onClick={toggle}                    
                      className='text-neutral-800 cursor-pointer hover:underline '>
                        ساخت حساب کاربری
                    </div>
                </div>
             </div>
        </div>
    )


    return ( 
        <Modal
           disabled={isLoading}
           isOpen={loginModal.isOpen}
           title="ورود به حساب کاربری"
           actionLabel='ادامه'
           onClose={loginModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           body={bodyContent}
           footer={footerContent}
        />
     );
}
 
export default LoginModal;