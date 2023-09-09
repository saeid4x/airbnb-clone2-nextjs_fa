import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage= async () =>{
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <EmptyState
            title="اجاه دسترسی ندارید"
            subtitle="لطفا وارد حساب  کاربری خود شوید"
            />
        )
    }

    const reservations = await getReservations({
        userId:currentUser.id
    });

    if(reservations.length === 0){
        return (
            <EmptyState 
               title="هیچ آبتمی پیدا نشد"
               subtitle="به نظر می رسد هیچ سفری رزرو نکرده اید!"
            />
        )
    }


    return (
        <TripsClient 
          reservations={reservations}        
          currentUser={currentUser}
        />
    )
}

export default TripsPage