import { LabelHTMLAttributes } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  value?: string;
}

export default function InputLabel({ value, className = '', children, ...props }: Props) {
  return (
    <label {...props} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {value ? value : children}
    </label>
  );
}
