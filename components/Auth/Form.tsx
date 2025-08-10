"use client";
import React, { FC } from "react";
import {
	Control,
	FieldErrors,
	RegisterOptions,
	UseFormGetValues,
	UseFormHandleSubmit,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import CustomInput from "../Input";
import { Button } from "../ui/button";
import Link from "next/link";

export interface Props {
	watch: UseFormWatch<any>;
	getValues: UseFormGetValues<any>;
	isSignUpPage?: boolean;
	setValue: UseFormSetValue<any>;
	control: Control<any, any>;
	isLoading: boolean
	handlerRegister: (data: any) => void;
	handleSubmit: UseFormHandleSubmit<any>;
	errors: FieldErrors<any>;
}
const Form: FC<Props> = ({
	watch,
	handleSubmit,
	isLoading,
	handlerRegister,
	control,
	errors,
	isSignUpPage = false,
}) => {
	return (
		<div className="flex flex-col gap-3">
			{isSignUpPage && (
				<CustomInput
					rules={{
						required: "Please enter name",
					}}
					value=""
					placeholder="User Name"
					name={"name"}
					control={control}
					errors={errors}
				/>
			)}
			<CustomInput
				rules={{
					required: "Please enter email",
				}}
				value=""
				placeholder="Email"
				type="email"
				name={"email"}
				control={control}
				errors={errors}
			/>
			<CustomInput
				rules={{
					required: "Please enter password",
					min: {
						value: 6,
						message: "Minimum 6 digit password required",
					},
				}}
				value=""
				placeholder="Password"
				type="password"
				name={"password"}
				control={control}
				errors={errors}
			/>
			{!isSignUpPage && (
				<div className="mt-0/5 text-slate-400 text-end">
					<Link href={'/forgot-password'}  className="text-right text-[16px]">Forgot password</Link>
				</div>
			)}
			<div className="flex justify-center items-center">
				<Button
				    disabled ={isLoading}
					onClick={handleSubmit(handlerRegister)}
					className="bg-primary-400 w-full sm:w-1/2 justify-center"
					type="submit"
				>
					{isLoading ? 'Loading...' :  !isSignUpPage ? "Login" : "Sign Up"}
				</Button>
			</div>
		</div>
	);
};

export default Form;
