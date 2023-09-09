import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import TripsClient from "./PropertiesClient";

const PropertiesPage= async () =>{
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <EmptyState
              title="اجازه دسترسی ندارید"
              subtitle="لطفا وارد حساب کاربری خود شوید"
            />
        )
    }

    const listings = await getListings({
        userId:currentUser.id
    });

    if(listings.length === 0){
        return (
            <EmptyState 
               title="هیچ اقامتگاهی پیدا نشد"
               subtitle="به نظر می رسد شما هیچ اقامتگاهی ثبت نکرده اید"
            />
        )
    }


    return (
        <PropertiesClient 
          listings={listings}        
          currentUser={currentUser}
        />
    )
}

export default PropertiesPage