export {default} from 'next-auth/middleware';

export const config = {

    // list of all url that should be protected from Unauthorized users
    matcher:[
        "/trips",
        "/reservations",
        "/properties",
        "/favorites",
        
    ]
}