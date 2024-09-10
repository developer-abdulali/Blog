import React, { useState } from "react";

const InputBox = ({ name, type, id, value, placholder, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        type={
          type === "password" ? (passwordVisible ? "text" : "password") : type
        }
        name={name}
        placeholder={placholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <i className={`fi ${icon} input-icon`}></i>

      {type == "password" ? (
        <i
          onClick={() => setPasswordVisible((currentVal) => !currentVal)}
          className={
            "fi fi-rr-eye" +
            (!passwordVisible ? "-crossed" : "") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
