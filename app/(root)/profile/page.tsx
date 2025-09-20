"use client";
import CustomInput from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/Auth";
import { UpdateProfile } from "@/lib/graphql/mutation";
import { GetUserProfile } from "@/lib/graphql/Query";
import { UpdateProfileResponse, UserUpdateProfile } from "@/lib/graphql/type";
import { useMutation, useQuery } from "@apollo/client/react";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
	const [
		mutation,
		{
			error: mutationError,
			loading: isSumitLoading,
		},
	] = useMutation<UserUpdateProfile>(UpdateProfile, {
		refetchQueries: [GetUserProfile],
	});
	const [isEdit, setIsEdit] = useState(false);
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const { user } = useAuth();

	if (isSumitLoading) {
		return (
			<div className="p-6">
				<div className="space-y-6">
					<div className="flex justify-between items-center">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-10 w-28" />
					</div>
					<div className="bg-white rounded-lg border shadow-sm p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Skeleton className="h-16 w-full" />
							<Skeleton className="h-16 w-full" />
							<Skeleton className="h-16 w-full" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	const userDetails = user;

	const handleEditToggle = () => {
		if (!isEdit) {
			// Initialize form values when entering edit mode
			setUserName(userDetails?.username || "");
			setEmail(userDetails?.email || "");
		}
		setIsEdit(!isEdit);
	};

	const handleSave = async () => {
		mutation({
			variables: {
				data: {
					email,
					username: userName,
				},
			},
		}).then(async (res) => {
			console.log(res, "res");

			const response = res.data as unknown as UpdateProfileResponse;
			const status = response.updateUserProfile.status;

			if (email !== userDetails?.email && status) {
				toast.success(
					"Your Email has updated please login again with new email"
				);

				await signOut({
					redirect: true,
				});
			}
			handleCancel();

			toast.success("Profile updated successfully");
		});
	};

	const handleCancel = () => {
		// Reset form values
		setUserName("");
		setEmail("");
		setIsEdit(false);
	};

	return (
		<div className="p-2 max-w-4xl mx-auto">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4 mb-8">
				{isEdit ? (
					<>
						<Button
							variant="outline"
							onClick={handleCancel}
							className="px-4 py-2"
						>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700"
						>
							Save Changes
						</Button>
					</>
				) : (
					<Button
						onClick={handleEditToggle}
						className="px-4 py-2 bg-slate-700 hover:bg-slate-800"
					>
						Edit Profile
					</Button>
				)}
			</div>

			{/* Profile Card */}
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
				{/* Card Header */}
				<div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
					{mutationError && (
						<h4 className="error-message">
							{mutationError?.message}
						</h4>
					)}
					<h2 className="text-xl font-semibold text-gray-900">
						Profile Information
					</h2>
				</div>

				{/* Card Content */}
				<div className="p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Username Field */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Username (Role: {userDetails?.role})
							</label>
							{isEdit ? (
								<CustomInput
									placeholder="Enter username"
									value={userName}
									name="username"
									onChange={(val) => setUserName(val)}
								/>
							) : (
								<div className="p-3 bg-gray-50 rounded-lg border">
									<span className="text-gray-900 font-medium">
										{userDetails?.username ||
											"Not provided"}
									</span>
								</div>
							)}
						</div>

						{/* Role Field */}

						{/* Email Field */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Email Address
							</label>
							{isEdit ? (
								<CustomInput
									placeholder="Enter email address"
									value={email}
									name="email"
									onChange={(val) => setEmail(val)}
								/>
							) : (
								<div className="p-3 bg-gray-50 rounded-lg border">
									<span className="text-gray-900 font-medium">
										{userDetails?.email || "Not provided"}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Additional Info Section */}
					<div className="mt-8 pt-6 border-t border-gray-200">
						<h3 className="text-lg font-medium text-gray-900 mb-4">
							Account Status
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
								<span className="text-sm font-medium text-green-800">
									Account Status
								</span>
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
									Active
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
								<span className="text-sm font-medium text-blue-800">
									Member Since
								</span>
								<span className="text-sm text-blue-700 font-medium">
									{new Date().toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
									})}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
