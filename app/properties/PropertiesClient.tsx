"use client";

import { Listing, Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface PropertiesClientProps {
    listings: Listing[];
    currentUser: User | null;
}



const PropertiesClient:React.FC<PropertiesClientProps> = ({
    listings,currentUser
}) =>{
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
             .then(() =>{
                toast.success('آیتم با موفقیت حذف شد');
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
               title="اقامتگاه ها"
               subtitle="لیست تمام اقامتگاه های شما"
            />

             <div 
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                           lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8                               
                          "
              >
                {listings.map((listing) => ( 
                    <ListingCard
                      key={listing.id}                   
                      data={listing}                    
                      actionId={listing.id}
                      onAction={onCancel}
                      disabled={deletingId === listing.id}
                      actionLabel="حذف اقامتگاه"
                      currentUser={currentUser}
                    />
                ))}

                                
             </div>
        </Container>
    )
}

export default PropertiesClient;