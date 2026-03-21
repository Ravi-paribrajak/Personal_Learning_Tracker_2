import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    // 1: Receive the Data
    const body = await request.json();

    // Quick Bouncer check:
    if (!body.week_number) {
        return NextResponse.json({ error: "Week number is required!" }, { status: 400 });
    }

    // 2: Fetch the Logs: 
    // Grab all logs from the dummy user
    const logs = await prisma.daily_Logs.findMany({
        where: {
            user_id: "ravi-1"
        }
    });

    // 3: Calculate weekly metrics 
    let total_build_hours = 0;
    let total_reading_hours = 0;
    let final_independence_score = 0;

    // 4: Loop over every single log we found in the database
    for (const log of logs) {
        // we use 0 || just in case any field is null in the databse
        const build = log.build_hours || 0;
        const reading = log.reading_hours || 0;
        const confidence = log.confidence_score || 0;

        // Translating the AI Penality
        const aiPenality = log.ai_used ? 5 : 0;

        // Add to the Weekly Totals:
        total_build_hours += build;
        total_reading_hours += reading;

        // My Exact Formula:
        final_independence_score += (build * 2) + reading + confidence - aiPenality;
    };
    // 5: Save to Database:
    const newMetric = await prisma.weekly_Metrics.create({
        data: {
            week_number: body.week_number,
            total_build_hours: total_build_hours,
            total_reading_hours: total_reading_hours,
            independence_score: final_independence_score,
            user_id: "ravi-1"
        }
    });
    // 6: Send Response
    return NextResponse.json({ message: "Weekly Metrics Generated !", data: newMetric }, { status: 201 });
}
export async function GET() {

    // Fetch all Metrics for our dummy User
    const allMetrics = await prisma.weekly_Metrics.findMany({
        where: {
            user_id: "ravi-1"
        }
    });
    // Grab the very last item in the array(The absolute newest Calculation!)
    const latestMetrics = allMetrics[allMetrics.length - 1];

    return NextResponse.json({ message: "Weekly metric Fetched!", data: latestMetrics }, { status: 200 });
}