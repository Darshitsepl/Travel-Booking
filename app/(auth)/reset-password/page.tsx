import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import Link from "next/link";
import React from "react";

const ResetPassword = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const { token } = await searchParams;
	return (
		<div className="flex flex-col gap-3">
			<h2 className="main-header text-primary-400">Reset Password</h2>
			<div>
				<ResetPasswordForm token={token as string} />
			</div>
			
		</div>
	);
};

export default ResetPassword;
