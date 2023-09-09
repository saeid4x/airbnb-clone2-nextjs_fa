"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import Modal from "./Modal";
import qs from 'query-string'
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../Inputs/Calender";
import Counter from "../Inputs/Counter";


enum STEPS {
    LOCATION=0,
    DTAE=1,
    INFO=2
}
const SearchModal = () => {
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate:new Date,
        endDate: new Date,
        key:"selection"
    });
    const [location, setLocation] = useState<CountrySelectValue>()

    const Map = useMemo(()=> dynamic(()=> import('../Map'),{ssr:false}),[location]);

    const onBack = useCallback(() =>{
        setStep((value) => value -1 );
    },[]);

    const onNext = useCallback(() =>{
        setStep((value) => value + 1)
    } , [])

    const onSubmit = useCallback(async () => {
        if(step !== STEPS.INFO){
            return onNext()
        }

        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
            // console.log('query string=',currentQuery)
        }

        const updatedQuery:any = {
            ...currentQuery,
            locationValue:location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url:'/',
            query:updatedQuery
        } , {skipNull: true})

        setStep(STEPS.LOCATION);
        searchModal.onClose()
        router.push(url)

    } , [step,searchModal,location,router,guestCount,roomCount,bathroomCount,dateRange,onNext,params])

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO){
            return 'جستجو'
        }
        return 'بعدی'
    } ,[step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION){
            return undefined
        }
        return 'قبلی'
    } , [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
              title="کجا می خواهید بروید؟"
              subtitle="مکان مناسب را پیدا کنید!"
            />
            <CountrySelect 
              value={location}
              onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );

    if(step === STEPS.DTAE) {
        bodyContent= (
            <div className="flex flex-col gap-8">
                <Heading 
                  title="چه زمانی قصد رفتن دارید؟"
                  subtitle="مطمئن شوید که همه تاریخ ها آزاد هستند!"
                />
                <Calender 
                   value={dateRange}
                   onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                  title="اطلاعات بیشتر"
                  subtitle="مکان مناسب خود را پیدا کنید!"
                />

                <Counter
                  title="مهمانان"
                  subtitle="چند مهمان می آیند؟"
                  value={guestCount}
                  onChange={(value) => setGuestCount(value)}
                />

                <Counter
                  title="اتاق ها"
                  subtitle="چند اتاق نیاز دارید؟"
                  value={roomCount}
                  onChange={(value) => setRoomCount(value)}
                />

                <Counter
                  title="حمام ها"
                  subtitle="چند حمام نیاز دارید؟"
                  value={bathroomCount}
                  onChange={(value) => setBathroomCount(value)}
                />


            </div>
        )
    }



    return ( 
         <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="فیلترها"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
         
         />
     );
}
 
export default SearchModal;