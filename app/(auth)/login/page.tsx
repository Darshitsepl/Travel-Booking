"use client";
import Form from "@/components/Auth/Form";
import { Button } from "@/components/ui/button";
import { LoginFormValues } from "@/model/FormModel";
import { FaGoogle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { handleApi, LoginWithGoogleFields } from "@/service/Auth";
import APIClient from "@/service/interceptor";
import { endPoints } from "@/service/endPoints";
import { toast } from "sonner";

const Login = () => {
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

	const handlerLogin = async (FormData: LoginFormValues) => {
		const payload: LoginWithGoogleFields = {
			...FormData,
			username: FormData.name,
			loginType: "credentials",
		};
		setIsLoading(true)
		const { data, error } = await handleApi(() =>
			APIClient.post(endPoints.login, payload)
		);
		if (data && data.status) {
			await signIn("credentials", {
				...data.data,
				callbackUrl: "/",
				redirect: true,
				token: data.data.token,
			});
		setIsLoading(false)

		}else {
		setIsLoading(false)

		}

		if (error) {
			toast(error);
		} 
	};

	const handlerLoginWithGoogle = async () => {
		setIsLoading(true);
		await signIn("google", { redirect: true, callbackUrl: "/" });
		setIsLoading(false);
	};
	return (
		<div className="flex flex-col gap-3">
			<h2 className="main-header text-primary-400">Welcome Back</h2>
			<div>
				<form>
					<Form
						getValues={getValues}
						setValue={setValue}
						watch={watch}
						isLoading={isLoading}
						control={control}
						errors={errors}
						handleSubmit={handleSubmit}
						handlerRegister={handlerLogin}
					/>
				</form>
			</div>
			<div className="divider">
				<h4>OR</h4>
			</div>
			<div className="flex justify-center items-center flex-col gap-2">
				<Button
					disabled={isLoading}
					onClick={handlerLoginWithGoogle}
					className="flex items-center gap-2 w-full md:w-1/2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 rounded-md shadow-sm transition-all duration-200"
				>
					{isLoading ? (
						<span className="text-gray-700">Loading...</span>
					) : (
						<>
							<FaGoogle className="text-[#4285F4]" />
							<span className="text-sm text-gray-700 font-medium">
								Continue with Google
							</span>
						</>
					)}
				</Button>

				<Link href={"/signup"} className="text-[12px] text-slate-400">
					Don’t have account? Register Now
				</Link>
			</div>
		</div>
	);
};

export default Login;
