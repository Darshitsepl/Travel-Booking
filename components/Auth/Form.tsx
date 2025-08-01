'use client'
import React, { FC } from "react";
import {
	Control,
	FieldErrors,
	RegisterOptions,
	UseFormGetValues,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import CustomInput from "../Input";
import { Button } from "../ui/button";

export interface Props {
	watch: UseFormWatch<any>;
	getValues: UseFormGetValues<any>;
	isSignUpPage?: boolean;
	setValue: UseFormSetValue<any>;
	control: Control<any, any>;
	errors: FieldErrors<any>;
}
const Form: FC<Props> = ({
	watch,
	getValues,
	setValue,
	control,
	errors,
	isSignUpPage = false,
}) => {
	return (
		<div className="flex flex-col gap-3">
			{isSignUpPage && (
				<CustomInput
					rules={{
                        required: true
                    }}
					value=""
					placeholder="User Name"
					name={"username"}
					control={control}
					errors={errors}
				/>
			)}
			<CustomInput
			rules={{
                        required: true
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
                        required: true,
                        min: {
                            value:6,
                            message: "Minimum 6 digit password required"
                        }
                    }}
				value=""
				placeholder="Password"
                type='password'
				name={"password"}
				control={control}
				errors={errors}
			/>
            {!isSignUpPage && <div className="mt-0/5 text-slate-400">
                 <h4 className="text-right text-[12px]">Forgot password</h4>
            </div>}
           <div className="flex justify-center items-center">
             <Button className="bg-primary-400 w-full sm:w-1/2 justify-center" type="submit">
                {!isSignUpPage ? 'Login' : "Sign Up"}
            </Button>
           </div>
		</div>
	);
};

export default Form;
