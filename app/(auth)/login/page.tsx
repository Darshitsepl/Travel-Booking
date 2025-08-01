"use client";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import Form from "@/components/Auth/Form";
import { Button } from "@/components/ui/button";
import { LoginFormValues } from "@/model/FormModel";
import { FaGoogle } from "react-icons/fa";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const defaultValues: LoginFormValues = {
	name: "",
	email: "",
	password: "",
};
const Login = () => {
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
			<h2 className="main-header text-primary-400">Welcome Back</h2>
			<div>
				<form>
					<Form
						getValues={getValues}
						setValue={setValue}
						watch={watch}
						control={control}
						errors={errors}
					/>
				</form>
			</div>
			<div className="divider">
				<h4>OR</h4>
			</div>
			<div className="flex justify-center items-center flex-col gap-2">
				<Button className="flex items-center gap-2 w-full sm:w-1/2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 rounded-md shadow-sm transition-all duration-200">
					<FaGoogle className="text-[#4285F4]" />
					<span className="text-sm text-gray-700 font-medium">
						Continue with Google
					</span>
				</Button>

				<Link href={"/signup"} className="text-[12px] text-slate-400">
					Don’t have account? Register Now
				</Link>
			</div>
		</div>
	);
};

export default Login;
