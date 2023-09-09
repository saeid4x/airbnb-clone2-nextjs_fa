"use client";
 
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';

import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';


interface UserMenuProps {
  currentUser?: User | null
}
const UserMenu:React.FC<UserMenuProps> = ({
  currentUser
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter()

    const toggleOpen = useCallback(() =>{
        setIsOpen((value) => !value)
    },[])

    // with click on 'Airbnb Your home' button, if user already not login, open login modal
    const onRent = useCallback(() => { 
      if(!currentUser){
        return loginModal.onOpen()
      }
      rentModal.onOpen();
    } , [currentUser, loginModal,rentModal])

    return ( 
        <div className="relative"> 
          <div className="flex flex-row items-center gap-3">
            <div 
              onClick={onRent}              
              className="
               hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100
               transition cursor-pointer                
            "  
            >
                Airbnb خانه دوم شماست

            </div>

            <div
              onClick={toggleOpen}
              className="
                   p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row
                   items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition
             ">
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
          </div>


          {isOpen && (
            <div className='
                   absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden
                    right-0 top-12 text-sm '>
                        <div className='flex flex-col cursor-pointer'>
                          {currentUser ? (
                            <>
                              <MenuItem 
                                onClick={() => router.push('/trips')}
                                label="سفرهای من"
                              />
                            
                              <MenuItem 
                                onClick={() => router.push('/favorites')}
                                label="علاقه مندان های من"
                              />
                            
                              <MenuItem 
                                onClick={() => router.push('/reservations')}
                                label="رزروهای من "
                              />
                            
                              <MenuItem 
                                onClick={() => router.push('/properties')}
                                label="اقامتگاه های من"
                              />
                            
                              <MenuItem 
                                onClick={rentModal.onOpen}
                                label="Airbnb خانه شماست"
                              />
                              <hr />
                            
                              <MenuItem 
                                onClick={() => signOut()}
                                label="خروج"
                              />
                            
                            </>
                          ) : (
                            <>
                              <MenuItem onClick={loginModal.onOpen}  label="لاگین"  />
                              <MenuItem onClick={registerModal.onOpen}  label="عضویت"  />
                            </>

                          )}

                        </div>

            </div>
          )}
        </div>
     );
}
 
export default UserMenu;