import React from 'react';
import Content from '../Content';
import Header from '../Header';
import { getExchangeRates } from "/src/helpers/helper";

import './styles.less'


const App = () => {
    const exchangeRates = getExchangeRates();
    return (
        <div className='Wrapper'>
            <div className='Wrapper_Header'>
                <Header exchangeRates={exchangeRates}/>
            </div>
            <div className='Wrapper_Content'>
                <Content exchangeRates={exchangeRates}/>
            </div>
        </div>
    )
}

export default App
