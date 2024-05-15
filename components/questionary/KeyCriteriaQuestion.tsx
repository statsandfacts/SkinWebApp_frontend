import { Radio, RadioGroup, cn } from '@nextui-org/react';
import React from 'react';

export const CustomRadio = (props: any) => {
  const { children, value, ...otherProps } = props;

  return (
    <Radio
      value={value} // Set the value prop here
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        ),
      }}>
      {children}
    </Radio>
  );
};

const KeyCriteriaQuestion = ({
  question,
  options,
  onSelect,
  defaultSelected,
}: any) => {
  const combinedValue = defaultSelected?.[question] || ''; // Use optional chaining
  return (
    <div className='w-full'>
      {question && question.length > 0 && (
        <div className='w-full flex flex-col items-center justify-center'>
          <p className='w-full text-start pb-2 pl-1'>
            <span className='text-xl font-semibold text-start'>{question}</span>
          </p>
          <RadioGroup
            name={question}
            className='w-full text-black mb-3'
            value={combinedValue}
            onChange={(e) => onSelect(e)}>
            {options &&
              options.length > 0 &&
              options.split(',').map((option: string, index: string) => (
                <CustomRadio key={option + '_' + index} value={option}>
                  {option}
                </CustomRadio>
              ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default KeyCriteriaQuestion;
