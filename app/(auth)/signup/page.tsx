"use client";
import Form from "@/components/Auth/Form";
import { LoginFormValues } from "@/model/FormModel";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const defaultValues: LoginFormValues = {
	name: "",
	email: "",
	password: "",
};
const SignUp = () => {
	const {
		getValues,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useForm<LoginFormValues>();
	useEffect(() => {
		document.body.style.overflow = "hidden";
	}, []);
	// const handlerLogin = async () => {
	// 	await signIn("google", { redirect: true, callbackUrl: "/" });
	// };
	return (
		<div className="flex flex-col gap-3">
			<h2 className="main-header text-primary-400">Sign Up</h2>
			<div>
				<form>
					<Form
						getValues={getValues}
						setValue={setValue}
						isSignUpPage={true}
						watch={watch}
						control={control}
						errors={errors}
					/>
				</form>
			</div>
			<div className="divider">
				<h4>OR</h4>
			</div>
			<div className="flex justify-center items-center flex-col">
				<Link href={"/login"} className="text-[12px] text-slate-400">
					Already have account? Login
				</Link>
			</div>
		</div>
	);
};

export default SignUp;
