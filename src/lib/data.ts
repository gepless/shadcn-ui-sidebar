"use server";

import { stackServerApp } from "@/stack";
import type { Unit } from "./definitions";

const unitServiceURL = process.env.UNIT_SERVICE_URL;
const crmServiceURL = process.env.CRM_SERVICE_URL;

export async function getTotalCumulativePower() {
	try {
		const res = await fetch(`${unitServiceURL}/total/cumulativepower/all`);
		const power = await res.json();

		return power;
	} catch (error) {
		console.error(error);
	}
}

// POST
export async function getTotalCumulativePowerGroup(imeis: string[]) {
	try {
		const res = await fetch(`${unitServiceURL}/total/cumulativepower/group`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ imeis }),
		});
		const count = await res.json();

		return count.length;
	} catch (error) {
		console.error(error);
	}
}

export async function getAllUnits() {
	try {
		const res = await fetch(`${unitServiceURL}/unit/all`);
		const units = await res.json();

		return units;
	} catch (error) {
		console.error(error);
	}
}

export async function getAllUnitsCount() {
	try {
		const res = await fetch(`${unitServiceURL}/unit/all`);
		const count = await res.json();

		return count.length;
	} catch (error) {
		console.error(error);
	}
}

export async function getUnitCumulativePower(imei: string) {
	try {
		const res = await fetch(`${unitServiceURL}/unit/${imei}/cumulativepower`);
		const power = await res.json();

		return power;
	} catch (error) {
		console.error(error);
	}
}

export async function getUnitEvents(imei: string) {
	try {
		const res = await fetch(`${unitServiceURL}/unit/${imei}/events`);
		const events = await res.json();

		return events;
	} catch (error) {
		console.error(error);
	}
}

export async function getUnitLocations(imei: string) {
	try {
		const res = await fetch(`${unitServiceURL}/unit/${imei}/locations`);
		const locations = await res.json();

		return locations;
	} catch (error) {
		console.error(error);
	}
}

export async function getUnitInfo(imei: string) {
	try {
		const res = await fetch(`${crmServiceURL}/unit/${imei}/info`);
		const info = await res.json();

		return info;
	} catch (error) {
		console.error(error);
	}
}

export async function getCompanyUnits(limit?: number): Promise<Unit[]> {
	try {
		const user = await stackServerApp.getUser();
		if (!user) {
			throw new Error("User not logged in");
		}
		const team = user?.selectedTeam;
		if (!team) {
			throw new Error("User not in a team");
		}
		console.log("team", team.id);
		let companySlug: string;
		switch (team.id) {
			case "1861c5c7-ddf4-46b4-ab43-c96c6edb7383":
				companySlug = "SamatInternational";
				break;
			default:
				companySlug = "greenenergy";
				break;
		}
		const res = await fetch(
			`${crmServiceURL}/company/${companySlug}/units${limit ? `?limit=${limit}` : ""}`,
		);
		if (!res.ok) {
			throw new Error("Failed to fetch company units");
		}
		const units = await res.json();

		return units;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getCompanyCumulativePower() {
	try {
		const units = await getCompanyUnits();
		const imeis = units.map((unit) => unit.imei);
		const power = await getTotalCumulativePowerGroup(imeis);

		return power.json();
	} catch (error) {
		console.error(error);
	}
}

export async function getCompanyUnitCount() {
	try {
		const units = await getCompanyUnits();

		return units.length;
	} catch (error) {
		console.error(error);
	}
}
