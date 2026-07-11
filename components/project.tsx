"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
	title,
	description,
	tags,
	imageUrl,
	liveUrl,
	repoUrl,
}: ProjectProps) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["0 1", "1.33 1"],
	});
	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

	return (
		<motion.div
			ref={ref}
			style={{
				scale: scaleProgress,
				opacity: opacityProgress,
			}}
			className=" group mb-3 sm:mb-8 last:mb-0"
		>
			<section className="bg-gray-100 max-w-[42rem] border border-black/5 overflow-hidden rounded-lg sm:pr-8 relative sm:h-[20rem] group-even:pl-8 hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
				<div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
					<h3 className="text-2xl font-semibold">{title}</h3>
					<p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
						{description}
					</p>
					{(liveUrl || repoUrl) && (
						<div className="flex flex-wrap gap-3 mt-4">
							{liveUrl && (
								<Link
									href={liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 text-sm font-medium underline underline-offset-2 hover:text-gray-950 dark:hover:text-white"
								>
									Live demo <HiOutlineExternalLink />
								</Link>
							)}
							{repoUrl && (
								<Link
									href={repoUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 text-sm font-medium underline underline-offset-2 hover:text-gray-950 dark:hover:text-white"
								>
									Code <FaGithub />
								</Link>
							)}
						</div>
					)}
					<ul className="flex flex-wrap gap-2 mt-4 sm:mt-auto">
						{tags.map((tag, index) => (
							<li
								className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full"
								key={index}
							>
								{tag}
							</li>
						))}
					</ul>
				</div>
				<Image
					src={imageUrl}
					alt={`${title} project screenshot`}
					quality={95}
					className="absolute hidden sm:block top-8 -right-40 w-[28.25rem]
					transition
					group-hover:scale-[1.04]

					group-hover:-translate-x-3 
					group-hover:translate-y-3 
					group-hover:-rotate-2 

					group-even:group-hover:translate-x-3 
					group-even:group-hover:translate-y-3 
					group-even:group-hover:rotate-2 

					rounded-t-lg shadow-2xl group-even:right-0
					group-even:-left-40"
				/>
			</section>
		</motion.div>
	);
}
