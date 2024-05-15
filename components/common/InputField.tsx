import React from 'react';

interface InputFieldProps {
  value?: string;
  className?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Explicit event type
  readOnly?: boolean;
  error?: string | JSX.Element; // Allow custom error rendering
  min?: string;
  max?: string;
  disabled?: boolean;
  autoComplete?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; // Explicit event type
  isLabel?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  className = '',
  name = '',
  placeholder = '',
  type = 'text',
  onChange,
  readOnly = false,
  error,
  min = '',
  max = '',
  disabled = false,
  autoComplete = false,
  onBlur,
  isLabel = false,
}) => (
  <div>
    {isLabel && (
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {placeholder}
      </label>
    )}
    <input
      id={name}
      type={type}
      value={value}
      name={name}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
      min={min}
      max={max}
      autoComplete={autoComplete ? 'on' : 'off'}
      aria-autocomplete='none'
      autoFocus={false}
      autoCorrect='off'
      onBlur={onBlur}
    />

    {error && (
      <small className='text-red-500'>
        {typeof error === 'string' ? error : error}
      </small>
    )}
  </div>
);

export default InputField;
