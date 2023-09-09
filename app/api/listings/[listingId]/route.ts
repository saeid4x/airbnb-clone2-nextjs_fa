import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string
}

export async function DELETE(
     requets:Request,
     {params}:{params:IParams}
     ){
        const currnetUser= await getCurrentUser();

        if(!currnetUser){
            return NextResponse.error();
        }
        const {listingId} = params;

        if(!listingId || typeof listingId !== 'string'){
            throw new Error('Invalid ID');
        }

        const listing = await prisma.listing.deleteMany({
            where:{
                id: listingId,
                userId: currnetUser.id
            }
       });

       return NextResponse.json(listing)
    
}