import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAllDailyLogs, createDailyLog } from "@/lib/services/dailyLogService";


export async function POST(request: Request) {

    // PHASE 1: Receive the Data from Frontend or Postman
    const body = await request.json();

    // Checking the Bounce Score 
    if (body.confidence_score > 10 || body.confidence_score < 0) {
        return NextResponse.json({ error: "Confidence_score can't be negative or greater than 10" }, { status: 400 });
    }
    if (body.build_hours < 0) {
        return NextResponse.json({ error: "Build hours can't be negative!" }, { status: 400 });
    }
    if (body.reading_hours < 0) {
        return NextResponse.json({ error: "Reading_hours can't be negative!" }, { status: 400 });
    }

    // 3. Ask the service to save it to the database
    const newRecord = await createDailyLog(body);

    // PHASE 4: send the Response Back
    return NextResponse.json({ message: "daily_Logs Created!", data: newRecord }, { status: 201 });


};
// Handling GET request
export async function GET() {

    // 1. Ask the service to get the data
    const allLogs = await getAllDailyLogs();

    // Send the data back to the Postman / Frontend
    return NextResponse.json({ message: "Daily Logs Fetched!", data: allLogs }, { status: 200 });
};


