'use client'

import React, { FC } from "react";
import { Input } from "./ui/input";
import { InputProps } from "@/model/model";
import { Controller } from "react-hook-form";

const CustomInput: FC<InputProps> = ({
	name,
	control,
	type,
	value,
	onChange: onParentChange,
	errors,
	placeholder,
	rules,
}) => {
	const inputClass =
		"border border-primary-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-md px-3 py-2 text-sm outline-none transition-colors";

	return (
		<div className="flex flex-col gap-1 text-left">
            <label id={name} className="text-[12px]">{placeholder} :</label>
			{control ? (
				<Controller
					name={name}
					control={control}
					rules={rules}
					render={({ field: { onChange, value } }) => (
						<Input
							type={type ?? 'text'}
							placeholder={placeholder}
							value={value}
							className={inputClass}
							onChange={(e) => {
								onChange(e.target.value);
								if (onParentChange) {
									onParentChange(e.target.value);
								}
							}}
						/>
					)}
				/>
			) : (
				<Input
					value={value}
					name={name}
					type={type ?? 'text'}
					placeholder={placeholder}
					className={inputClass}
					onChange={(e) => {
						if (onParentChange) {
							onParentChange(e.target.value);
						}
					}}
				/>
			)}
			{errors?.root?.message && (
				<h2 className="error-message">{errors?.root?.message}</h2>
			)}
		</div>
	);
};

export default CustomInput;
