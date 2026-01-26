import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
	{ type = "text", className = "", isFocused = false, ...props },
	ref
) {
	const localRef = useRef(null);

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
				"rounded-none border-[#7C634D] shadow-sm focus:border-[#7C634D] focus:ring-[#7C634D] " +
				className
			}
			ref={localRef}
		/>
	);
});
