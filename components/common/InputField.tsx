import React, { FocusEvent } from 'react';
interface InputFieldProps {
    value?: string;
    className?: string;
    name?: string;
    placeholder?: string;
    type?: string;
    onChange?: any;
    readonly?: boolean;
    error?: any;
    min?: string;
    max?: string;
    disabled?: boolean;
    autoComplete?: boolean;
    onBlur: any;
}

const InputField = ({
    value = '',
    className = '',
    name = '',
    placeholder = '',
    type = 'text',
    onChange,
    readonly = false,
    error = null,
    min = '',
    max = '',
    disabled = false,
    autoComplete = false,
    onBlur
}: InputFieldProps) => (
    <>
        <input
            type={type}
            value={value}
            name={name}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readonly}
            disabled={disabled}
            min={min}
            max={max}
            autoComplete={autoComplete ? 'on' : 'off'}
            aria-autocomplete="none"
            autoFocus={false}
            autoCorrect="off"
            onBlur={onBlur}
        />

        {error && <small className="text-red-500">{error}</small>}
    </>
);

export default InputField;