import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    const parseDate = new Date(body.date);

    // PHASE 2: Save to Database
    const newRecord = await prisma.daily_Logs.create({
        data: {
            date: parseDate,
            build_hours: body.build_hours,
            reading_hours: body.reading_hours,
            ai_used: body.ai_used,
            summary: body.summary,
            confidence_score: body.confidence_score,
            user_id: "ravi-1"
        }
    });
    // PHASE 3: send the Response Back
    return NextResponse.json({ message: "daily_Logs Created!", data: newRecord }, { status: 201 });


};
// Handling GET request
export async function GET() {

    // Fetch all logs from our Database for our user
    const allLogs = await prisma.daily_Logs.findMany({
        where: {
            user_id: "ravi-1"
        },
        orderBy: {
            date: "desc"   // This set them to show the newest logs first!
        }
    });
    // Send the data back to the Postman / Frontend
    return NextResponse.json({ message: "Daily Logs Fetched!", data: allLogs }, { status: 200 });
}


