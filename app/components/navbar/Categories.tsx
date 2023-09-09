"use client";

import {TbBeach,TbMountain,TbPool} from 'react-icons/tb';
import {GiWindmill,GiIsland,GiBoatFishing, GiCastle,GiForestCamp,GiCaveEntrance, GiCactus,GiBarn} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md';
import {FaSkiing} from 'react-icons/fa';
import {BsSnow} from 'react-icons/bs';
import {IoDiamond} from 'react-icons/io5';
import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    {
        label:'ساحلی',
        icon:TbBeach,
        description: 'اقامتگاه نزدیک ساحل است'
    },
    {
        label:'آسیاب های بادی ',
        icon:GiWindmill,
        description: 'اقامتگاه آسایاب بادی اسست'
    },
    {
        label:'مدرن',
        icon:MdOutlineVilla,
        description: 'اقامتگاه های مدرن '
    },
    {
        label:'حومه شهر',
        icon: TbMountain,
        description: 'لیست اقامتگاه های حومه شهر '
    },
    {
        label:'استخردار',
        icon: TbPool,
        description: 'اقامتگاه استخردار است '
    },
    {
        label:'جزیره',
        icon: GiIsland,
        description: 'اقامتگاه در جزیره واقع شده است '
    },
    {
        label:'رودخانه',
        icon: GiBoatFishing,
        description: 'اقامتگاه نزدیک رودخانه است '
    },
    {
        label:'اسکی',
        icon: FaSkiing,
        description: 'اقامتگاه به امککانات اسکی کردن مجحهز شده است '
    },
    {
        label:'قلعه',
        icon: GiCastle,
        description: 'اقامتگاه قلعه است '
    },
    {
        label:'کمپینگ',
        icon: GiForestCamp,
        description: 'اقامتگاه به فعالیت های کمپینگ مجهز شده است '
    },
    {
        label:'قطبی',
        icon: BsSnow,
        description: 'This property has Camping activity '
    },
    {
        label:'غار',
        icon: GiCaveEntrance,
        description: 'This property is in a Cave '
    },
  
    {
        label:'کویری',
        icon: GiCactus,
        description: 'This property is in the Desert '
    },
    {
        label:'بومگردی',
        icon: GiBarn,
        description: 'This property is in the barn '
    },
    {
        label:'لوکس',
        icon: IoDiamond,
        description: 'This property is Luxurious '
    },

]


const Categories = () =>{

    const params= useSearchParams();
    const category= params?.get('category');
    const pathname= usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage){
        return null;
    }



    return (
         <Container>
             <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {categories.map((item) => (
                    <CategoryBox
                      key={item.label}
                      label={item.label}
                      selected={category === item.label}
                      icon={item.icon}
                    
                    />
                ))}
             </div>
         </Container>
    )
    
}


export default Categories