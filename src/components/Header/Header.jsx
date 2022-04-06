import React from 'react';
import money from '/public/images/money.png'
import './styles.less'
import { getExchangeRates } from "../../helpers/helper";

const Header = ({ exchangeRates }) => {
    const exchangeCurrencies = exchangeRates.length === 3 ? exchangeRates.slice(0, -1) : exchangeRates

    return (
        <div className='Header'>
           <div className='Header_Logo'>
               <img alt='money-bag' src={money}/>
               КОНВЕРТЕР ВАЛЮТ
           </div>
            <div className='Header_ExchangeRates'>
                {exchangeCurrencies.map((exchangeRate) => {
                    return (
                     <div className='Header_ExchangeRate'>
                         <div className='Header_ExchangeRate-value'>{`${Math.ceil(exchangeRate?.buy * 100)/100}`}</div>
                         <div className='Header_ExchangeRate-value'>{exchangeRate?.ccy}</div>
                         <div className='Header_ExchangeRate-value'>{`${Math.ceil(exchangeRate?.sale * 100)/100}`}</div>
                     </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Header;
