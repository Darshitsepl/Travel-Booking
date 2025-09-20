"use client";
import { useAuth } from "@/context/Auth";
import React from "react";
import { Button } from "./ui/button";
import CustomInput from "./Input";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { updatePassword } from "@/lib/graphql/mutation";
import {  PasswordResponseFields } from "@/lib/graphql/type";
import SkelatonLoading from "./SkelatonLoading";
import { GetUserProfile } from "@/lib/graphql/Query";
import { showMutationResult } from "@/lib/utils";

const PasswordAlertPopUp = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth();
	const [password, setPassword] = useState("");
	const [mutation, { loading, error }] = useMutation<PasswordResponseFields>(
		updatePassword,
		{
			refetchQueries: [GetUserProfile],
		}
	);

	const onPasswordSubmit = async () => {
		try {
			const res = await mutation({ variables: { data: password } });

			if (res.data?.setPasswordForGoogleLogin.status) {
				showMutationResult(res.data.setPasswordForGoogleLogin);
			}
		} catch (err: any) {
			showMutationResult(err ?? error);
		}
	};

	if (loading) {
		return <SkelatonLoading />;
	}

	if (user?.loginType === "google" && !user?.password) {
		return (
			<div className="bg-slate-300 w-[100vw] h-[100vh] overflow-hidden p-2 md:p-10 z-50 ">
				<div className="flex flex-col   max-w-3xl m-auto mt-6 shadow-[0_3px_8px_rgba(0,0,0,0.24)] px-4 py-6 rounded-lg bg-white relative">
					<p className="text-xl font-semibold text-gray-800 mb-2">
						Set a Password for Your Account
					</p>
					<p className="text-gray-600 text-sm leading-relaxed">
						You’ve signed in using your Google account. For better
						security and to enable login without Google, we
						recommend setting a password for your profile. This
						ensures you’ll always have an alternative way to access
						your account.
					</p>
					<div className="flex flex-col md:flex-row  gap-5 w-full items-center mt-4">
						<CustomInput
							name="password"
							type="password"
							isLabelRequire={false}
							onChange={(val) => {
								setPassword(val);
							}}
							value={password}
							placeholder={"Enter Password"}
						/>
						<Button
							disabled={!password}
							className="add-form-button"
							onClick={onPasswordSubmit}
						>
							Set Password
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return <div>{children}</div>;
};

export default PasswordAlertPopUp;
