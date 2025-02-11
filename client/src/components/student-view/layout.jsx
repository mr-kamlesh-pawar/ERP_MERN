import React  from 'react'
import { Outlet } from 'react-router-dom'
import './styles.css'; // Import your CSS file
import Header from './header';
import WhiteHeader from './WhiteHeader';
import Footer from './studentFooter';
import MarqueeNotice from './MarqueeNotice';

const StudentLayout = () => {
   


  return (
    <div className='flex flex-col min-h-screen w-full'>
       
       
            {/* Header */}
            <Header />
            <WhiteHeader />
            <MarqueeNotice/>
           

            <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>

            <Footer/>
      
    </div>
  )
}

export default StudentLayout
