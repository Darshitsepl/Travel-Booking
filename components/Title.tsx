import React from "react";

const Title = ({ title }: { title: string }) => {
	return (
		<div>
			<h2 className="main-header">{title}</h2>
		</div>
	);
};

export default Title;
