"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useState } from "react";
import {
	Menu,
	X,
	BarChart3,
	MapPin,
	Plus,
	Calendar,
	Star,
	Settings,
	User,
	LogOut,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/Auth";
import { AlertMessage } from "@/lib/utils";
import { MdPassword } from "react-icons/md";
import { path } from "@/lib/paths";
import { useMainWrapper } from "@/context/Main";
import Link from "next/link";

const Header = () => {
	const { onLogOut, isOpen, setIsOpen,setIsLoading} = useAuth();
	const { user } = useMainWrapper();
	const role = user?.role as string;
	const [expandedMenus, setExpandedMenus] = useState<any>({
		tours: false,
		settings: false,
	});

	const toggleDrawer = () => {
		setIsOpen!(!isOpen);
	};

	const toggleSubmenu = (menu: any) => {
		setExpandedMenus((prev: any) => ({
			...prev,
			[menu]: !prev[menu],
		}));
	};

	const handlerLogOut = () => {
		AlertMessage(
			"error",
			"Confrimation",
			"Are you sure want to logout?"
		).then(async (res) => {
         if(res.isConfirmed) {
			if(setIsLoading) {
		     	setIsLoading(true);
				 onLogOut();
			}
		 }
		})
	};

	const menuItems = [
		{
			id: "dashboard",
			label: "Dashboard",
			accessRole: ["User", "Admin"],
			icon: BarChart3,
			href: path.home,
		},
		{
			id: "tours",
			label: "Tours",
			icon: MapPin,
			accessRole: ["User", "Admin"],
			hasSubmenu: true,
			submenu: [
				{
					label: "Tours",
					href: path.tours.list,
					icon: MapPin,
					accessRole: ["User", "Admin"],
				},
				{
					label: "Add Tours",
					href: path.tours.add,
					icon: Plus,
					accessRole: ["Admin"],
				},
			],
		},
		{
			id: "booking",
			label: "My Booking",
			icon: Calendar,
			href: path.booking,
			accessRole: ["User", "Admin"],
		},
		{
			id: "reviews",
			label: "Review & Feedbacks",
			icon: Star,
			accessRole: ["User", "Admin"],
			href: path.reviews,
		},
		{
			id: "settings",
			label: "Settings",
			accessRole: ["User", "Admin"],
			icon: Settings,
			hasSubmenu: true,
			submenu: [
				{
					label: "My Profile",
					href: path.profile,
					icon: User,
					accessRole: ["User", "Admin"],
				},
				{
					label: "Change Password",
					href: path.changePassword,
					icon: MdPassword,
					accessRole: ["User", "Admin"],
				},
				{
					label: "Log out",
					onClick: handlerLogOut,
					accessRole: ["User", "Admin"],
					icon: LogOut,
					isLogout: true,
				},
			],
		},
	];

	return (
		<div className="relative w-[100vw] h-[60px] bg-primary-100 sm:bg-none sm:w-auto sm:h-auto">
			{/* Hamburger Menu Button */}
			{!isOpen && (
				<button
					onClick={toggleDrawer}
					className="m-2 p-2 mt-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors md:hidden"
				>
					{<Menu size={24} />}
				</button>
			)}

			{/* Desktop Sidebar */}
			<div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-primary-50 shadow-xl border-r border-gray-200 z-40">
				<div className="flex flex-col w-full">
					{/* Header */}
					<div className="p-2 pb-3 pt-3 border-b border-gray-200">
						<h1 className="text-2xl font-extrabold text-gray-900 tracking-wide flex items-center gap-2">
							<span className="text-blue-600">✈ TRAVEL</span>
							<span className="text-gray-800">BOOKING</span>
						</h1>
					</div>

					{/* Menu Items */}
					<nav className="flex-1 overflow-y-auto py-4">
						<div className="px-4 pb-3 border-b border-gray-200">
							<div className="flex flex-row gap-2 justify-start items-center">
								<div>
									<Avatar>
										<AvatarImage
											src={user?.image as string}
										/>
										<AvatarFallback>
											{user?.username?.substring(0,1)}
										</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<h4>{user?.username}</h4>
									<span className="text-gray-500 text-[14px]">
										{role}
									</span>
								</div>
							</div>
						</div>
						{menuItems
							.filter(
								(data) =>
									data.accessRole &&
									data.accessRole.includes(role)
							)
							.map((item) => (
								<div key={item.id} className="px-4">
									{item.hasSubmenu ? (
										<div>
											<button
												onClick={() =>
													toggleSubmenu(item.id)
												}
												className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
											>
												<div className="flex items-center space-x-3">
													<item.icon
														size={20}
														className="text-gray-500 group-hover:text-gray-700"
													/>
													<span className="font-medium">
														{item.label}
													</span>
												</div>
												{expandedMenus[item.id] ? (
													<ChevronDown
														size={16}
														className="text-gray-400"
													/>
												) : (
													<ChevronRight
														size={16}
														className="text-gray-400"
													/>
												)}
											</button>
											{expandedMenus[item.id] && (
												<div className="ml-6 mt-1 space-y-1">
													{item.submenu
														.filter((data) =>
															data.accessRole.includes(
																role
															)
														)
														?.map(
															(subItem, index) =>
																subItem.onClick ? (
																	<span
																		onClick={() =>
																			subItem.onClick()
																		}
																		className={`flex cursor-pointer items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
																			subItem.isLogout
																				? "text-red-600 hover:bg-red-50"
																				: "text-gray-600 hover:bg-gray-100"
																		}`}
																	>
																		<subItem.icon
																			size={
																				16
																			}
																		/>
																		<span>
																			{
																				subItem.label
																			}
																		</span>
																	</span>
																) : (
																	<Link
																		key={
																			index
																		}
																		href={
																			subItem.href
																		}
																		className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
																			subItem.isLogout
																				? "text-red-600 hover:bg-red-50"
																				: "text-gray-600 hover:bg-gray-100"
																		}`}
																	>
																		<subItem.icon
																			size={
																				16
																			}
																		/>
																		<span>
																			{
																				subItem.label
																			}
																		</span>
																	</Link>
																)
														)}
												</div>
											)}
										</div>
									) : (
										<Link
											href={item.href as string}
											className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
										>
											<item.icon
												size={20}
												className="text-gray-500 group-hover:text-gray-700"
											/>
											<span className="font-medium">
												{item.label}
											</span>
										</Link>
									)}
								</div>
							))}
					</nav>
				</div>
			</div>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
					onClick={toggleDrawer}
				/>
			)}

			{/* Mobile Drawer */}
			<div
				className={`fixed left-0 top-0 h-full w-80 bg-primary-50 shadow-xl transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="p-3 border-b border-gray-200 flex justify-between items-center">
						<h1 className="text-xl font-extrabold text-gray-900 tracking-wide flex items-center gap-2 flex-row">
							<span className="text-blue-600">✈ TRAVEL</span>
							<span className="text-gray-800">BOOKING</span>
						</h1>
						<div className="text-center">
							<button onClick={toggleDrawer}>
								<X fontSize={20} />
							</button>
						</div>
					</div>

					{/* Menu Items */}
					<nav className="flex-1 overflow-y-auto py-4">
						<div className="px-4 pb-3 border-b border-gray-200">
							<div className="flex flex-row gap-2 justify-start items-center">
								<div>
									<Avatar>
										<AvatarImage
											src={user?.image as string}
										/>
										<AvatarFallback>
											{user?.username?.substring(0,1)}
										</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<h4>{user?.username}</h4>
									<span className="text-gray-500 text-[14px]">
										{role}
									</span>
								</div>
							</div>
						</div>
						{menuItems.map((item) => (
							<div key={item.id} className="px-4">
								{item.hasSubmenu ? (
									<div>
										<button
											onClick={() =>
												toggleSubmenu(item.id)
											}
											className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
										>
											<div className="flex items-center space-x-3">
												<item.icon
													size={20}
													className="text-gray-500 group-hover:text-gray-700"
												/>
												<span className="font-medium">
													{item.label}
												</span>
											</div>
											{expandedMenus[item.id] ? (
												<ChevronDown
													size={16}
													className="text-gray-400"
												/>
											) : (
												<ChevronRight
													size={16}
													className="text-gray-400"
												/>
											)}
										</button>
										{expandedMenus[item.id] && (
											<div className="ml-6 mt-1 space-y-1">
												{item.submenu.map(
													(subItem, index) =>
														subItem.onClick ? (
															<span
																onClick={() =>
																	subItem.onClick()
																}
																className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
																	subItem.isLogout
																		? "text-red-600 hover:bg-red-50"
																		: "text-gray-600 hover:bg-gray-100"
																}`}
															>
																<subItem.icon
																	size={16}
																/>
																<span>
																	{
																		subItem.label
																	}
																</span>
															</span>
														) : (
															<Link
																key={index}
																href={
																	subItem.href
																}
																onClick={
																	toggleDrawer
																}
																className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
																	subItem.isLogout
																		? "text-red-600 hover:bg-red-50"
																		: "text-gray-600 hover:bg-gray-100"
																}`}
															>
																<subItem.icon
																	size={16}
																/>
																<span>
																	{
																		subItem.label
																	}
																</span>
															</Link>
														)
												)}
											</div>
										)}
									</div>
								) : (
									<Link
										href={item.href as string}
										onClick={toggleDrawer}
										className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
									>
										<item.icon
											size={20}
											className="text-gray-500 group-hover:text-gray-700"
										/>
										<span className="font-medium">
											{item.label}
										</span>
									</Link>
								)}
							</div>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Header;
