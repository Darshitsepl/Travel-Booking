"use client";
import CustomInput from "@/components/Input";
import SkelatonLoading from "@/components/SkelatonLoading";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/lib/graphql/mutation";
import { ChangePasswordResponse } from "@/lib/graphql/type";
import { useMutation } from "@apollo/client/react";
import { signOut } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormFields {
	oldPassword: string;
	newPassword: string;
}
const ChangePassword = () => {
	const {
		control,
		watch,
    handleSubmit,
		formState: { errors },
	} = useForm<FormFields>();

  const [mutate, {loading}] = useMutation<ChangePasswordResponse>(changePassword)


  const onSubmt = (data:FormFields) => {
    mutate({
      variables: {
        type: {
          oldPassword: data?.oldPassword,
          newPassword: data?.newPassword
        }
      }
    }).then(async (res) => {
      if(res.data?.changePassword.status) {
        await signOut({
          redirect:true,
          
        })
      } 
      toast.success(res.data?.changePassword?.message)
    })
  }

  if(loading) {
    return <SkelatonLoading/>
  }

	return (
		<div className="p-2 max-w-full  md:max-w-4xl mx-auto flex flex-col gap-5">
      <div className="header">
        <Title title="Change Password"/>
      </div>
			<div className="flex gap-5 justify-between w-full items-end flex-wrap">
				<CustomInput
					type="text"
					value={""}
					errors={errors}
					rules={{
						required: "Please enter old password",
					}}
					placeholder="Old Password"
					control={control}
					name={"oldPassword"}
				/>
				<CustomInput
					type="text"
					value={""}
					errors={errors}
					rules={{
						min: 6,
						validate: (value) => {
							if (!value) return true;
							if (value.length < 6) {
								return "Minimu six digit required";
							}

							if (value == watch("oldPassword")) {
								return "New Password not match with old password";
							}

							return true;
						},
						required: "Please enter new password",
					}}
					placeholder="New Password"
					control={control}
					name={"newPassword"}
				/>
				<div className="">
					<Button onClick={handleSubmit(onSubmt)} className="add-form-button">Change Password</Button>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
