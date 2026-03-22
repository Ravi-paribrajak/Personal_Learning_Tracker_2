import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getLatestWeeklyMetric, generateWeeklyMetric } from "@/lib/services/weeklyMetricService";


export async function POST(request: Request) {

    // 1: Receive the Data
    const body = await request.json();

    // Quick Bouncer check:
    if (!body.week_number) {
        return NextResponse.json({ error: "Week number is required!" }, { status: 400 });
    }

    // 3. Ask the service to run the math and save to the database 
    const newMetric = await generateWeeklyMetric(body.week_number);

    // 4: Send Response
    return NextResponse.json({ message: "Weekly Metrics Generated !", data: newMetric }, { status: 201 });
};
export async function GET() {

    // 1. Ask the service to get the latest data
    const latestMetrics = await getLatestWeeklyMetric();

    // 2. Send Response
    return NextResponse.json({ message: "Weekly metric Fetched!", data: latestMetrics }, { status: 200 });
};