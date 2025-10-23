'use client'
import React from "react";
import { Button } from "@mui/material";

import { useRouter } from "next/navigation";

const Title = ({ title,path, btnTitle }: { title: string,path?:string,btnTitle?:string }) => {
	const router = useRouter();

	return (
		<div className="flex justify-between">
			<h2 className="main-header">{title}</h2>
			{path && <Button variant="contained" className="add-form-button" onClick={() => {
				router.push(path)
			}}>
				{btnTitle}
				</Button>}
		</div>
	);
};

export default Title;
