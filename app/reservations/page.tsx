import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";

const ReservationsPage = async() =>{
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
        authorId:currentUser.id
    });
    if(reservations.length === 0){
        return (
            <EmptyState 
              title="هیچ موردی پیدا نشد"
              subtitle="هیچ فردی اقامتگاه شما را رزرو نکرده است"
            />
        )
    }

    return(
        <ReservationClient
          reservations={reservations}
          currentUser={currentUser}
        />
    )
}

export default ReservationsPage