"use client";
import Form from "@/components/Auth/Form";
import { ForgotPasswordFormValues, LoginFormValues } from "@/model/FormModel";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { handleApi, LoginWithGoogleFields, register } from "@/service/Auth";
import { toast } from "sonner";
import APIClient from "@/service/interceptor";
import { endPoints } from "@/service/endPoints";
import { signIn } from "next-auth/react";
import CustomInput from "@/components/Input";
import { regexOptions } from "@/lib/regex";
import { Button } from "@/components/ui/button";

const SignUp = () => {
	const {
		watch,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ForgotPasswordFormValues>();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		document.body.style.overflow = "hidden";
	}, []);
	const handlerForgotPasswod = async (FormData: ForgotPasswordFormValues) => {
		setIsLoading(true);
		const { data, error } = await handleApi(() =>
			APIClient.post(endPoints.forgotPassword, {
				email:FormData.email,
				redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL
			})
		);
		setIsLoading(false);
		if (data && data.status) {
		 toast('Please check your email for reset password')
		}


		if (error) {
			toast(error);
		} 
	};
	return (
		<div className="flex flex-col gap-3">
			<h2 className="main-header text-primary-400">Forgot Password</h2>
			<div>
				<form className="flex flex-col gap-5">
					
					<CustomInput
						value={watch("email")}
						control={control}
						errors={errors}
						name="email"
						placeholder="Email"
						rules={{
							required: "Please enter email address",
							pattern: {
								value: regexOptions.email,
								message: "Please enter valid email",
							},
						}}
					/>
						<div className="flex justify-center items-center">
				<Button
				    disabled ={isLoading}
					onClick={handleSubmit(handlerForgotPasswod)}
					className="bg-primary-400 w-full sm:w-1/2 justify-center"
					type="submit"
				>
					{isLoading ? 'Loading...' : "Send Reset Link"}
				</Button>
			</div>
				</form>
			</div>
			<div className="divider">
				<h4>OR</h4>
			</div>
			<div className="flex justify-center items-center flex-col">
				<Link href={"/login"} className="text-[14px] text-slate-400">
					Already have account? Login
				</Link>
			</div>
		</div>
	);
};

export default SignUp;
