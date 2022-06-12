import React, { useState, useEffect, useCallback } from 'react';
import { BaseInput, withInputWrapper } from '@splunk/dashboard-inputs';
import PropTypes from 'prop-types';

import './customInput.css'


let prefixInternal = "";
let suffixInternal = "";

const RangeSlider = ({onValueChange, options, datasources}) => {

    const {
        value, 
        min, 
        max, 
        step, 
        prefix, 
        suffix, 
        labelPrefix, 
        labelSuffix,
        title,
        id,
        theme
    } = options;

    prefixInternal = prefix;
    suffixInternal = suffix;

    const [valueInternal, setValueInternal] = useState(value || 0);
    console.log(value, min, max, step, labelPrefix, labelSuffix)


    const handleAppy = useCallback(
        (e) => {
            setValueInternal(e.target.value)
            onValueChange(e, parseInt(e.target.value));
        },
        [onValueChange]
    );


    return (
        <div className="range-slider-container">
            {title ? <label>{title}</label> : ''}
            <input type="range" min={min} max={max} value={valueInternal} step={step} className={`range-slider ${theme}`} id={id} onChange={handleAppy} />
            <span className={`range-slider-value ${theme}`}>{labelPrefix} {valueInternal} {labelSuffix}</span>
        </div>
        
    )

}

RangeSlider.valueToTokens = (value, { token }) => {
    if (!token) {
        return {};
    }
    // need to parse 'origin,destination,tripType,priceMax` into 4 variables
    // const { origin, destination, tripType, priceMax } = parseValue(value);
    const valueWithPreSuffix = prefixInternal + value + suffixInternal;

    return {
        [token]: valueWithPreSuffix
    };
};


RangeSlider.tokensToValue = ({ tokens, tokenNamespace, tokenName }) => {
    if (!tokens || !tokenName || !tokenNamespace) {
        return null;
    }

    const regex = new RegExp(`^${prefixInternal}(\d*)${suffixInternal}$`)
    // if token is a string, convert to number
    const tokenValue = tokens?.[tokenNamespace]?.[tokenName];
    const match = tokenValue.match(regex)
    const value = match ? match[1] : tokenValue;
    console.log(value);

    //console.log(valueWithPreSuffix);
    return value;
};

const defaultProps =   {
    min: 0,
    max: 100,
    step:10,
    value: 0,
    defaultValue: 24,
    prefix: '',
    suffix: '',
    labelPrefix: '',
    labelSuffix: '',
    title: '',
    width: 400
}

const propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step:PropTypes.number,
    value: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    labelPrefix: PropTypes.string,
    labelSuffix: PropTypes.string,
    title: PropTypes.string
};

RangeSlider.propTypes = {
    ...BaseInput.propTypes,
    ...propTypes
};

RangeSlider.defaultProps  = {
    ...BaseInput.defaultProps,
    ...defaultProps
}

export default RangeSlider;