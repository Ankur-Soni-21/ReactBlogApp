import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
  //! Ref is passed down using forward ref becuase it cannot be passed using normal props
) {
  const id = useId();

  // using the input ref
  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="w-full">
      // label
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      // input
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        //! => ref
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
