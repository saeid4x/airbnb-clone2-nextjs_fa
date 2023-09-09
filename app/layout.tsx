import './globals.css'
import type { Metadata } from 'next'
 
import { Nunito } from 'next/font/google'
import localFont from '@next/font/local'
import Navbar from './components/navbar/Navbar'
 
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'

import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

 

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font = Nunito({
  subsets:["latin"]
})

const iranSans = localFont({
  src:'../public/fonts/IRANSans_Medium/IRANSans_Medium.ttf',
  variable: '--font-iranSans',
  display:'swap'
})

 
//***Increase timeout for google provider ****/
import { custom } from 'openid-client';
import SearchModal from './components/modals/SearchModal'
custom.setHttpOptionsDefaults({
  timeout: 16000,
});
//****


export default async  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={iranSans.className}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />

        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}

