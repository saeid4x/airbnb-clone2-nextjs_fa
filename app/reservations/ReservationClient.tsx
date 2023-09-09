"use client";

import { Reservation, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";


interface ReservationsClientProps {
    reservations: Reservation[],
    currentUser?: User | null
}


const ReservationClient:React.FC<ReservationsClientProps> = ({
    reservations, currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    

    const onCancel = useCallback((id:string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservations cancelled');
                router.refresh();
            } )
            .catch((error) =>{
                toast.error('Somethng went wrong\n'+ error)
            })
            .finally(()=>{
                setDeletingId('')
            })
    } ,  [router])
    return ( 
        <Container>
        <Heading
           title="Reservations" 
           subtitle="Booking on your properties"
        />

        <div 
           className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8
           ">
            {reservations.map((reservation) =>  (
                <ListingCard 
                  key={reservation.id}
                  // @ts-ignore
                  data={reservation.listing}
                  reservation={reservation}
                  actionId={reservation.id}
                  onAction={onCancel}
                  disabled={deletingId === reservation.id}
                  actionLabel="Cancel guest reservation"
                  // @ts-ignore
                  currentUser={currentUser}
                />
            ))}
            
        </div>

        </Container>
     );
}
 
export default ReservationClient;