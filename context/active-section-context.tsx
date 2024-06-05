// this file is used to create a context for the active section of the app.


"use client";

import React, { useState, createContext, useContext } from "react";
import { SectionName } from "@/lib/types"	

type ActiveSectionContextProviderProps = {
	children: React.ReactNode;
};

type ActiveSectionContextType = {
	activeSection: SectionName;
	setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
};

export const ActiveSectionContext =
	createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
	children,
}: ActiveSectionContextProviderProps) {
	const [activeSection, setActiveSection] = useState<SectionName>("Home");

	return (
		<ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
			{children}
		</ActiveSectionContext.Provider>
	);
}

export function useActiveSectionContext() {
	const context = useContext(ActiveSectionContext);

	if (context === null) {
		throw new Error(
			"useActiveSectionContext must be used within an ActiveSectionContextProvider"
		);
	}

	return context;
}

// This is a centralise location for what the page is lookin at either Home | About | Projects etc..
