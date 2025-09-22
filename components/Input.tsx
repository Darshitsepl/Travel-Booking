import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input"; // your existing Input component
import { FaEye, FaEyeSlash } from "react-icons/fa"; // eye icons
import { InputProps } from "@/model/model";

const CustomInput: FC<InputProps> = ({
  name,
  control,
  onBlur,
  type,
  isLabelRequire = true,
  value,
  onChange: onParentChange,
  errors,
  placeholder,
  rules,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass =
    "border border-primary-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-md px-3 py-2 text-sm outline-none transition-colors";

  const togglePassword = () => setShowPassword((prev) => !prev);

  // Determine type for input (for password fields)
  const computedType =
    type === "password" ? (showPassword ? "text" : "password") : type ?? "text";

  return (
    <div className="flex flex-col gap-1 text-left w-full">
      {isLabelRequire && <label id={name} className="text-[12px]">
        {placeholder} :
      </label>}

      <div className="relative">
        {control ? (
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  type={computedType}
                  onBlur={() => {
                    if(onBlur) {
                      onBlur()
                    }
                  }}
                  placeholder={placeholder}
                  value={value}
                  className={`${inputClass} pr-10`} // extra padding for icon
                  onChange={(e) => {
                    onChange(e.target.value);
                    if (onParentChange) {
                      onParentChange(e.target.value);
                    }
                  }}
                />
                {type === "password" && (
                  <span
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </>
            )}
          />
        ) : (
          <>
            <Input
              value={value}
              name={name}
              type={computedType}
              placeholder={placeholder}
                 onBlur={() => {
                    if(onBlur) {
                      onBlur()
                    }
                  }}
              className={`${inputClass} pr-10`}
              onChange={(e) => {
                if (onParentChange) {
                  onParentChange(e.target.value);
                }
              }}
            />
            {type === "password" && (
              <span
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
          </>
        )}
      </div>

      {errors && errors[name] && (
        <h2 className="error-message">{errors[name]?.message as string}</h2>
      )}
    </div>
  );
};

export default CustomInput;
