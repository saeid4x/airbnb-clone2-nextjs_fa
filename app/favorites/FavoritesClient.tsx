import { Listing, User } from "@prisma/client"
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";

interface FavoriteClientProps {
    FavoriteListings: Listing[];
    currentUser?: User | null 
}

const FavoritesClient :React.FC<FavoriteClientProps> = ({
   FavoriteListings , currentUser
}) =>{
    return(
       <Container>
         <Heading
           title="علاقه مندی"         
           subtitle="لیست مکان هایی که مورد علاقه شماست!"
         />

         <div 
             className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8
                    ">

                        {FavoriteListings.map((listing) =>(
                            <ListingCard 
                               //@ts-ignore
                               currentUser={currentUser}
                               key={listing.id}
                               data={listing}
                            
                            />
                        ))}

         </div>
       </Container>
    )
}

export default FavoritesClient