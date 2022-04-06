import * as React from 'react';
import exchange from '/public/images/exchange.png'
import { CURRENT_TYPE, EXPECTED_TYPE } from "/src/constants/constants";
import { countCurrency, getOppositeType, state } from "/src/helpers/helper";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

import './styles.less'

const ContentAndrey = ({ exchangeRates }) => {
    const [currenciesState, setCurrenciesState] = React.useState(state);
    const { inputCurrentValue, inputExpectedValue, selectCurrentValue, selectExpectedValue } = currenciesState;

    const changeValueInput = (value, type) => {
        const oppositeTypeSelect = getOppositeType(type);
        const currencyResult = selectCurrentValue.value !== selectExpectedValue.value
            ? countCurrency(
                value,
                { selectCurrentValue, selectExpectedValue },
                exchangeRates,
                type,
            )
            : value;
        setCurrenciesState(prevState => ({
            ...prevState,
            [`input${type}Value`]: value,
            [`input${oppositeTypeSelect}Value`]: currencyResult,
        }))
    };

    const changeValueSelect = (option, type) => {
        const oppositeTypeSelect = getOppositeType(type);
        const updatedState = { [`select${type}Value`]: option };

        if(option.value === currenciesState[`select${oppositeTypeSelect}Value`].value) {
            updatedState.inputExpectedValue = inputCurrentValue;
        } else {
            updatedState.inputExpectedValue = countCurrency(
                inputCurrentValue,
                {
                    [`select${type}Value`]: option,
                    [`select${oppositeTypeSelect}Value`]: currenciesState[`select${oppositeTypeSelect}Value`]
                },
                exchangeRates,
                CURRENT_TYPE,
            )
        }

        setCurrenciesState(prevState => ({ ...prevState, ...updatedState }));
    };

    const changeCurrencies = () => {
        if (selectCurrentValue.value !== selectExpectedValue.value) {
            const changedSelectsValues = {
                selectExpectedValue: selectCurrentValue,
                selectCurrentValue: selectExpectedValue
            };
            const finalResult = countCurrency(inputCurrentValue, changedSelectsValues, exchangeRates, CURRENT_TYPE);
            setCurrenciesState(prevState => ({ ...prevState, ...changedSelectsValues, inputExpectedValue: finalResult }))
        }
    };

    return (
        <div className='Content'>
            <CurrencyInput
                title='Міняю'
                typeCurrencyInput={CURRENT_TYPE}
                inputValue={inputCurrentValue}
                selectValue={selectCurrentValue}
                handleChangeInput={changeValueInput}
                handleChangeSelect={changeValueSelect}
            />
            <img src={exchange} onClick={changeCurrencies}/>
            <CurrencyInput
                title='Отримую'
                typeCurrencyInput={EXPECTED_TYPE}
                inputValue={inputExpectedValue}
                selectValue={selectExpectedValue}
                handleChangeInput={changeValueInput}
                handleChangeSelect={changeValueSelect}
            />
        </div>
    )
};

export default ContentAndrey;
