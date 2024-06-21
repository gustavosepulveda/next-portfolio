import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";

export default function Skills() {
	return (
		<section>
			<SectionHeading>My skills</SectionHeading>
			<ul>
				{skillsData.map((skills, index) => (
					<li key={index}>{skills}</li>
				))}
			</ul>
		</section>
	);
}
