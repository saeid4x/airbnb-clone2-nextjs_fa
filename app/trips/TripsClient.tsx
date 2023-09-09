"use client";

import { Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface TripsClientProps {
    reservations: Reservation[];
    currentUser: User | null;
}



const TripsClient:React.FC<TripsClientProps> = ({
    reservations,currentUser
}) =>{
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
             .then(() =>{
                toast.success('رزرو با موفقیت لغو شد');
                router.refresh()                
             })
             .catch((error) =>{
                toast.error('عملیات ناموفق'+'\n' + error?.response?.data?.error);
             })
             .finally(() =>{
                setDeletingId('')
             })
    } , [router])


    return(
        <Container>
            <Heading
               title="سفرها"
               subtitle="مکان هایی که اقامت داشتید یا می خواهید بروید"
            />

             <div 
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                           lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8                               
                          "
              >
                {reservations.map((reservation) => ( 
                    <ListingCard
                      key={reservation.id}
                      //@ts-ignore
                      data={reservation.listing}
                      reservation={reservation}
                      actionId={reservation.id}
                      onAction={onCancel}
                      disabled={deletingId === reservation.id}
                      actionLabel="لغو رزرو اقامتگاه "
                      currentUser={currentUser}
                    />
                ))}

                                
             </div>
        </Container>
    )
}

export default TripsClient;