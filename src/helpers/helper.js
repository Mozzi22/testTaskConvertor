import React from 'react';
import { CURRENT_TYPE, EXPECTED_TYPE } from "../constants/constants";

export const getExchangeRates = () => {
    const [exchangeRates, setExchangeRates] = React.useState([])
    React.useEffect(() => {
        fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
            .then(res => res.json())
            .then(result => setExchangeRates(result.slice(0, -1)))
    }, [])
    return exchangeRates
};

export const state = {
    inputCurrentValue: '',
    inputExpectedValue: '',
    selectCurrentValue: { value: 'UAH', label: 'UAH' },
    selectExpectedValue: { value: 'USD', label: 'USD' },
};

export const countCurrency = (value, { selectCurrentValue, selectExpectedValue }, exchangeRates, type) => {
    const expectedCurrency = exchangeRates.find(item => item.ccy === selectExpectedValue.value);
    const currentCurrency = exchangeRates.find(item => item.ccy === selectCurrentValue.value);
    const isChangeCurrentInput = type === CURRENT_TYPE;
    let finalValue = 0;

    if (selectCurrentValue.value === 'UAH') {
        finalValue = isChangeCurrentInput ? (+value / expectedCurrency.buy) : (+value * expectedCurrency.buy);
    } else if (selectExpectedValue.value === 'UAH') {
        finalValue = isChangeCurrentInput ? (+value * currentCurrency.sale) : (+value / currentCurrency.sale);
    } else {
        finalValue = isChangeCurrentInput
            ? ((+value * currentCurrency.buy) / expectedCurrency.sale)
            : ((+value * expectedCurrency.sale) / currentCurrency.buy);
    }

    return Math.ceil(finalValue * 100)/100;
};

export const getOppositeType = (type) => {
    const isExpectedType = type === EXPECTED_TYPE;
    return isExpectedType ? CURRENT_TYPE : EXPECTED_TYPE;
};
