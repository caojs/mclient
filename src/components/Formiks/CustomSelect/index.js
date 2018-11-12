import React from 'react';
import cn from 'classnames';
import { FastField, getIn } from 'formik';

export default function CustomSelect(props) {
    let {
        label,
        name,
        options
    } = props;

    let nameId = name + "_id";

    return (
        <>
            <label htmlFor={nameId}>{label}</label>
            <FastField name={name}>
                {({ field, form}) => {
                    let error = getIn(form.errors, name);
                    let hasTouched = getIn(form.touched, name);
                    let isInvalid = error && hasTouched;

                    return (
                        <>
                            <select
                                className={cn("custom-select", {"is-invalid" : isInvalid })}
                                id={nameId}
                                {...field}>
                                {options.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {isInvalid && <div className="invalid-feedback">{error}</div>}
                        </>
                    )
                }}
            </FastField>
        </>
    )
}