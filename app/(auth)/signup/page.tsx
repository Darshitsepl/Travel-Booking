"use client";
import Form from "@/components/Auth/Form";
import { LoginFormValues } from "@/model/FormModel";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { handleApi, LoginWithGoogleFields, register } from "@/service/Auth";
import { toast } from "sonner";
import APIClient from "@/service/interceptor";
import { endPoints } from "@/service/endPoints";
import { signIn } from "next-auth/react";

const SignUp = () => {
	const {
		getValues,
		setValue,
		watch,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoginFormValues>();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		document.body.style.overflow = "hidden";
	}, []);
	const handlerRegister = async (FormData: LoginFormValues) => {
		setIsLoading(true)
		const payload: LoginWithGoogleFields = {
			...FormData,
			username: FormData.name,
			loginType: "credentials",
		};
		const { data, error } = await handleApi(() =>
			APIClient.post(endPoints.regiser, payload)
		);
		setIsLoading(false)
		if(data.status) {
			console.log(data, 'data')
			await signIn('credentials', {
				...data.data,
				callbackUrl: "/",
				redirect: true,
				token: data.data.token,
			})
		}

		if (error) {
			toast(error);
		} else {
			console.log("Success:", data);
		}
	};
	return (
		<div className="flex flex-col gap-3">
			<h2 className="main-header text-primary-400">Sign Up</h2>
			<div>
				<form>
					<Form
						getValues={getValues}
						handlerRegister={handlerRegister}
						setValue={setValue}
						handleSubmit={handleSubmit}
						isSignUpPage={true}
						watch={watch}
						isLoading ={isLoading}
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
