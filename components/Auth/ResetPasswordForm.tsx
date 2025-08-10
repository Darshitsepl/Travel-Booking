'use client'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import CustomInput from '../Input'
import { ResetPasswordFormValues } from '@/model/FormModel';
import { useForm } from 'react-hook-form';
import { handleApi } from '@/service/Auth';
import { endPoints } from '@/service/endPoints';
import APIClient from '@/service/interceptor';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type Props = {
    token: string
}
const ResetPasswordForm:FC<Props> = ({token}) => {
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter()

    const {
            watch,
            handleSubmit,
            control,
            formState: { errors },
        } = useForm<ResetPasswordFormValues>();
            useEffect(() => {
                document.body.style.overflow = "hidden";
            }, []);
            const handlerResetPassword = async (FormData: ResetPasswordFormValues) => {
                setIsLoading(true);
                const { data, error } = await handleApi(() =>
                    APIClient.post(endPoints.resetPassword, {
                    ...FormData,
                    token
                    })
                );
                setIsLoading(false);
                if (data && data.status) {
                    toast('Password successfully reset');
                    router.push('/login');
                }
        
                if (error) {
                    toast(error);
                } 
            };
  return (
    <div className="flex flex-col gap-3">
			<div>
				<form className="flex flex-col gap-5">
					<CustomInput
						value={watch('newPassword')}
						control={control}
						errors={errors}
						name="newPassword"
                        type='password'
						placeholder="New Password"
						rules={{
							required: "Please enter password",
						
						}}
					/>
                    <CustomInput
						value={watch('confirmPassword')}
						control={control}
						errors={errors}
                        type='password'
						name="confirmPassword"
						placeholder="Confirm Password"
						rules={{
							required: "Please enter confirm password",
                            validate: (value) => {
                                return watch('newPassword') === value || 'Confirm password match with new password'
                            }
						}}
					/>
					<div className="flex justify-center items-center">
						<Button
							disabled={isLoading}
							onClick={handleSubmit(handlerResetPassword)}
							className="bg-primary-400 w-full sm:w-1/2 justify-center"
							type="submit"
						>
							{isLoading ? "Loading..." : "Reset"}
						</Button>
					</div>
				</form>
			</div>
			<div className="divider">
				<h4>OR</h4>
			</div>
			<div className="flex justify-center items-center flex-col">
				<Link href={"/login"} className="text-[14px] text-slate-400">
					Go To Login
				</Link>
			</div>
		</div>
  )
}

export default ResetPasswordForm