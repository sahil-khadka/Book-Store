import React from "react";

const FormInput = ({ lable, name, type, defaultvalue }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-black font-medium">
        <span className="">{lable}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultvalue}
        className="px-3 py-2 border rounded-lg text-black"
      />
    </div>
  );
};

export default FormInput;
