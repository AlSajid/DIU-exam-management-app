import React from 'react';
import Header from '../../Components/Header/Header';
import Tab from '../../Components/Tab/Tab';

const Committee = () => {
    return (
        <div>
            <Header />
            <Tab
                header={['Add Teacher', 'All Teachers']}
                content={["Add Member", "View Members"]}
            />
            <div className='container'>
                <h1>Committee</h1>
            </div>
        </div>
    );
};

export default Committee;