"use client";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import Form from "@/components/Auth/Form";
import { Button } from "@/components/ui/button";
import { LoginFormValues } from "@/model/FormModel";
import { Icon } from "lucide-react";
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
        <Button  className="bg-red-500 flex gap-2 items-center w-full sm:w-1/2">
           <AiFillGooglePlusCircle />
           <span className="text-white">Continue with Google</span>
        </Button>
        <Link href={'/signup'} className="text-[12px] text-slate-400">
         Don’t have account? Register Now
        </Link>
      </div>
		</div>
	);
};

export default Login;
