import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isFocused?: boolean;
}

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props }: Props,
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={
        'rounded-none border-[#7C634D] shadow-sm focus:border-[#7C634D] focus:ring-[#7C634D] ' +
        className
      }
      ref={localRef}
    />
  );
});
