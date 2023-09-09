"use client";

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler,useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/input';
import {toast} from 'react-hot-toast'
import Button from '../Button';
import { signIn } from 'next-auth/react';
 
import useLoginModal from '@/app/hooks/useLoginModal';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    });


    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        axios.post('/api/register', data)
            .then(() =>{
                toast.success('عملیات موفقیت آمیز بود')
                loginModal.onOpen()
                registerModal.onClose();
            })
            .catch((error) =>{
                toast.error('عملیات ناموفق'+ '\n' +error)
            })
            .finally(() =>{
                setIsLoading(false);
            });

          
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    } , [loginModal, registerModal])

    const bodyContent= (
        <div className='flex flex-col gap-4'>
           <Heading 
              title='به Airbnb خوش آمدید'
              subtitle='ساخت حساب کاربری جدید'               
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
             id="name"
             label='نام'
             disabled={isLoading}
             register={register}
             errors={errors}
             required
           />
           <Input 
             id="password"
             label='کلمه عبور'
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
                 onClick={() => signIn('github')}
             />

             <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>
                      حساب کاربری دارید؟
                    </div>

                    <div
                      onClick={toggle}                    
                      className='text-neutral-800 cursor-pointer hover:underline '>
                        به حساب کاربری خود وارد شوید
                    </div>
                </div>
             </div>
        </div>
    )


    return ( 
        <Modal
           disabled={isLoading}
           isOpen={registerModal.isOpen}
           title="ثبت نام"
           actionLabel='ادامه '
           onClose={registerModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           body={bodyContent}
           footer={footerContent}
        />
     );
}
 
export default RegisterModal;