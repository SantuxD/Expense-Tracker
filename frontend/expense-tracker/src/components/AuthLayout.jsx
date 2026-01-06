import React from 'react'
import Expense_Tracker from '../assets/Images/Expense_Tracker.jpeg';
import { LuTrendingUpDown } from 'react-icons/lu';
//import StatsInfoCard from './StatsInfoCard';

const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
                {children}
            </div>

            <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative

 '>             <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -top-7 -left-5'/>
                <div className='w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-400 absolute top-[30%] -right-10 ' />
                <div className='w-48 h-56 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5' />

                <div className='grid grid-cols-1 z-20'>
                    <StatsInfoCard
                        icon={< LuTrendingUpDown />}
                        label="Track Your Income & Expense"
                        value="5,000000"
                        color="bg-primary"

                    />

                </div>

                <img src={Expense_Tracker} className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg rounded-xl shadow-blue-400/15' />

            </div>
        </div>
    )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className={`w-full p-4 mb-6 rounded-lg flex items-center gap-4 shadow-lg ${color} bg-white/60 backdrop-blur-sm`}>
            <div className='w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl text-purple-600 shadow-md'>
                {icon}
            </div>
            <div>
                <p className='text-sm text-gray-600'>{label}</p>
                <h4 className='text-lg font-semibold text-black mt-1'>{value}</h4>
            </div>
        </div>
    )
}