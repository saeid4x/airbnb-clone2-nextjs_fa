"use client";

import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import { SafeUser } from "../types";

interface HeartButtonProps {
    listingId: string;
    currentUser?: User | null |undefined
}

const HeartButton:React.FC<HeartButtonProps> = ({listingId,currentUser}) => {
   const {hasFavorited, toggleFavorite} = useFavorite({
    listingId, currentUser
   });
    return ( 
        <div 
          onClick={toggleFavorite}       
          className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart 
              size={28}
              className="fill-white absolute -top-[2px] -right-[2px]"
            />

            /<AiFillHeart
              size={24}
              className={hasFavorited ? 'fill-rose-500 -mt-6 focus:border-blue-700 ' : 'fill-neutral-500/70 -mt-6  focus:border-blue-700'}
              
            />
        </div>
     );
}
 
export default HeartButton;