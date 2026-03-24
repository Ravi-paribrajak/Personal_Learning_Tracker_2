import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAllDailyLogs, createDailyLog } from "@/lib/services/dailyLogService";
import { dailyLogSchema } from "@/lib/validators/dailyLogValidator";

export async function POST(request: Request) {

    // PHASE 1: Receive the Data from Frontend or Postman
    const body = await request.json();

    // 2. THE NEW BOUNCER: Let Zod do all the hard work
    const validationResult = dailyLogSchema.safeParse(body);

    if(!validationResult.success){
        // Use the custom error mapper you built on Day 11!
        const cleanErrors = validationResult.error.issues.map(issue => ({
            field: issue.path.join("."),
            message: issue.message
        }));

        return NextResponse.json(
            {
                error: "Invalid Data provided",
                details: cleanErrors
            },
            {
                status: 400
            }
        );
    }

    // 3. If it passes, send the safe data to the service
    const cleanData = validationResult.data;
    const newRecord = await createDailyLog(cleanData);

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


