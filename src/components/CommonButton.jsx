import React from "react";

function CommonButton({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}

export default CommonButton;
