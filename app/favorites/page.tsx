import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListing"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient";



const  ListingPage = async () => {
    const FavoriteListing = await getFavoriteListing();
    const currentUser = await getCurrentUser();

    if(FavoriteListing.length === 0 ){
        
        return (
            <EmptyState 
              title="لیست علاقه مندی شما خالی است!"
              subtitle="به نظر می رسد هیچ لیست مورد علاقه ای ندارید"
            />
        )    
    }

    return (
        <FavoritesClient
          FavoriteListings={FavoriteListing}
          currentUser={currentUser}
        />
    )
}

export default ListingPage