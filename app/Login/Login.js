import React, { useContext } from 'react';
import Header from '../../Components/Header/Header';
import { AllContexts } from '../../contexts/hooks/ContextProvider';
import key from './243.svg';
import { Navigate } from "react-router-dom";
import Loader from '../../Components/Loader/Loader';

const Login = () => {
    const { user, signInWithGoogle, checking } = useContext(AllContexts);

    if (user) {
        return <Navigate to='/' replace />
    }


    return (
        <div>
            <Header />
            <div className='h-screen w-full flex justify-center items-center text-center'>

                <div className='w-1/2 text-right'>
                    <h1 className='text-red-700 text-5xl font-serif font-black'>Entry Restricted</h1>
                    <p className='text-3xl my-3'>Authorized Personnel Only</p>
                </div>
                <div className='w-1/2' onClick={signInWithGoogle}>
                    {checking ? <Loader msg='Verifying Your Identity' />
                        :

                        <img src={key} alt="key" className='w-1/3 ml-5 hover:shadow-sm hover:cursor-pointer' />

                    }
                </div>
            </div>
        </div>
    );
};

export default Login;