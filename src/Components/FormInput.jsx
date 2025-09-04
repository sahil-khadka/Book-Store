import React from "react";

const FormInput = ({ lable, name, type, defaultvalue }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-700 font-medium">
        <span className="">{lable}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultvalue}
        className="px-3 py-2 border rounded-lg"
      />
    </div>
  );
};

export default FormInput;
