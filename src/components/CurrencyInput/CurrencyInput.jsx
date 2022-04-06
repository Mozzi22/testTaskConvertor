import * as React from 'react';
import Select from 'react-select'

import './styles.less'

const CurrencyInput = ({
    title, inputValue, handleChangeInput, selectValue, handleChangeSelect, typeCurrencyInput,
}) => {
    const options = [
        { value: 'USD', label: 'USD' },
        { value: 'UAH', label: 'UAH' },
        { value: 'EUR', label: 'EUR' }
    ]
    const changeSelect = (option) => handleChangeSelect(option, typeCurrencyInput);
    const changeInput = (event) => handleChangeInput(event.target.value, typeCurrencyInput);

    return (
        <div className='Content'>
            <div className='Content_Input'>
                <label>{title}</label>
                <input
                    placeholder="0"
                    type='number'
                    value={inputValue}
                    onChange={changeInput}
                    className='Content_Input-Field'
                />
            </div>
            <Select
                className='Content_Select'
                options={options}
                value={selectValue}
                onChange={changeSelect}
            />
        </div>
    );
};

export default CurrencyInput;
