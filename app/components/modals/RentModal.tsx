"use client";

import useRentModal from "@/app/hooks/useRentModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import CategoryInput from "../Inputs/CategoryInput";
import Counter from "../Inputs/Counter";
import CountrySelect from "../Inputs/CountrySelect";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/input";
 
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEPS {
  CATEGORY=0,
  LOCATION=1,
  INFO=2,
  IMAGES=3,
  DESCRIPTION=4,
  PRICE=5
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step,setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
      register, handleSubmit, setValue, watch, formState:{errors},reset
    } = useForm<FieldValues>({
      defaultValues:{
        category: '',
        location: null,
        guestCount: 1,
        roomCount:1,
        bathroomCount:1,
        imageSrc:'',
        price:1,
        title:'',
        description:''
      }
    })

    const category=watch('category');
    const location= watch('location');
    const guestCount = watch('guestCount');
    const roomCount= watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import ('../Map'),{ssr:false})
    ,[location])

    
    
    const setCustomValue = (id:string, value:any) => { 
      setValue(id,value, {
        shouldValidate:true,
        shouldDirty:true,
        shouldTouch:true
      })
    }

    const onBack= () => {
      setStep((value) => value - 1 )
    }

    const onNext = () =>{
      setStep((value) => value + 1 )
    }

    const actionLabel = useMemo(() => {
      if(step === STEPS.PRICE){
        return 'ایجاد'
      }
      return 'بعدی'
    } , [step]);

    const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.CATEGORY){
        return undefined
      }
      return 'قبلی'
    } , [step]);



    const onSubmit:SubmitHandler<FieldValues> = (data) => {
      if(step !== STEPS.PRICE){
        return onNext()
      }
      setIsLoading(true);
      axios.post('/api/listings', data)
        .then(() =>{
          toast.success('با موفقیت  ایجاد شد');
          router.refresh();

          //reset form (react-hook-form)
          reset();
          setStep(STEPS.CATEGORY);
          rentModal.onClose()
        })
        .catch(() => {
          toast.error('عملیات ناموفق');
        })
        .finally(()=>{
          setIsLoading(false);
        })
    }




    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
           title= "آگهی شما جزو کدام یک از دسته بندی های زیر قرار می گیرد؟"
           subtitle="انتخاب دسته بندی"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
           {categories.map((item) => (
            <div key={item.label} className="col-span-1">
               <CategoryInput
                 onClick={(category) => setCustomValue('category' , category)}
                 selected={category === item.label}               
                 label={item.label}
                 icon={item.icon}
                 
               />
            </div>
           ))}
        </div>
      </div>
    );


    if(step ===STEPS.LOCATION){
      bodyContent=(
        <div className="flex flex-col gap-8">
          <Heading
             title="آدرس اقامتگاه را وارد کنید"
             subtitle="به مهمانان کمک کنید تا راحت تر شما را پیدا کنند"
          />  

          <CountrySelect 
            value={location}
            onChange={(value) => setCustomValue('location' , value)}
          />  

          <Map
            center={location?.latlng}                      
          />       
        </div>
      )
    }



    if(step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
            title= "اطلاعات مختصری درباره اقامتگاه وارد کنید"
            subtitle="اقامتگاه چه امکاناتی داررد؟?"
          />

          <Counter
             title="مهمانان" 
             subtitle="چند نفر مهممان اجاره دارند وارد اقامتگاه شوند؟" 
             value={guestCount}  
             onChange={(value) => setCustomValue('guestCount', value)}      
          />
          <hr />
          <Counter
             title="اتاق ها" 
             subtitle="اقامتگاه شما چند اتاق دارد؟" 
             value={roomCount}  
             onChange={(value) => setCustomValue('roomCount', value)}      
          />
          <hr />
          <Counter
             title="حمام" 
             subtitle="اقامتگاه شما چند حمام دارد؟" 
             value={bathroomCount}  
             onChange={(value) => setCustomValue('bathroomCount', value)}      
          />

        </div>
      )
    }

    if(step === STEPS.IMAGES){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
            title="یک تصویر از اقامتگاه را آپلود کنید"
            subtitle="به مهمانان نشان دهید که مکان شما چگونه است!"
          />

          <ImageUpload
            value={imageSrc}           
            onChange={(value) => setCustomValue('imageSrc',value)}          
          />
        </div>
      )
    }


    if(step === STEPS.DESCRIPTION){
      bodyContent=(
        <div className="flex flex-col gap-8">

          <Heading
            title="توضیحات تکمیلی درباره اقامتگاه "
            subtitle="جزئیات بیشتری از اقامتگاه تان را وارد کنید"
          />

          <Input
            id="title"
            label="عنوان"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />           
          <Input
            id="description"
            label="توضیحات"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            
          />
        </div>
      )
    }


    if(step === STEPS.PRICE){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="قیمت"
            subtitle="اقامتگاه تان را شبی چند اجاره می دهید؟"
          />

          <Input 
            id="price"
            label="قیمت"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required

          />
        </div>
      )
    }


    return ( 
        <Modal 
          isOpen={rentModal.isOpen}
          onClose={rentModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          actionLabel={actionLabel}
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
          title="Airbnb خانه دوم شماست"
          body={bodyContent}
        />
     );
}
 
export default RentModal;