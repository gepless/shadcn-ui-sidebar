"use server";

import { auth } from "@clerk/nextjs/server";
import type { Unit, UnitEvent, UnitInfo } from "./definitions";

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
export async function getTotalCumulativePowerGroup(imeis: string) {
	try {
		const res = await fetch(`${unitServiceURL}/total/cumulativepower/group`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: imeis,
		});
		const power = await res.json();

		return power;
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

export async function getUnitEvents(
	imei: string,
	limit?: number,
): Promise<UnitEvent[] | undefined> {
	try {
		const res = await fetch(
			`${unitServiceURL}/unit/${imei}/events?limit=${limit ? limit : "100"}`,
		);
		const events = await res.json();

		return events;
	} catch (error) {
		console.error(error);
	}
}

export async function getUnitLatestEvent(
	imei: string,
): Promise<UnitEvent | undefined> {
	try {
		const res = await fetch(`${unitServiceURL}/unit/${imei}/events?limit=1`);
		const events = await res.json();

		return events[0];
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

export async function getUnitInfo(imei: string): Promise<UnitInfo | undefined> {
	try {
		const res = await fetch(`${crmServiceURL}/unit/${imei}/info`);
		const info = await res.json();

		return info;
	} catch (error) {
		console.error(error);

		return undefined;
	}
}

export async function getCompanyUnits(limit?: number): Promise<Unit[]> {
	const { orgId } = auth();
	let companySlug: string;
	switch (orgId) {
		case "org_2ZlXJv5gWfE7eJc4sygFONJCOwc":
			companySlug = "greenenergy";
			break;
		case "org_2lHTFVB4vAnIfJ2a6z1eoVwwmCW":
			companySlug = "SamatInternational";
			break;
		case "org_2hSbvY6VZe82cwEzRx7GY9CQlW2":
			companySlug = "DSV";
			break;
		default:
			companySlug = "";
	}
	try {
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

export async function getCompanyUnitCount() {
	try {
		const units = await getCompanyUnits();

		return units.length;
	} catch (error) {
		console.error(error);
	}
}

export async function getCompanyCumulativePower() {
	try {
		const companyUnits = await getCompanyUnits();
		const imeis = companyUnits.map((unit) => {
			return {
				imei: unit.imei,
			};
		});
		const totalCumulativePower = await getTotalCumulativePowerGroup(
			JSON.stringify(imeis),
		);
		return totalCumulativePower;
	} catch (error) {
		console.error(error);
	}
}
