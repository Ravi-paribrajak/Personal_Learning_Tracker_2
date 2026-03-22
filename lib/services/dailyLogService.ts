import { prisma } from "@/lib/prisma";

export async function getAllDailyLogs(){

    const allLogs = await prisma.daily_Logs.findMany({
        where: {
            user_id: "ravi-1"
        },
        orderBy: {
            date: "desc"
        }
    });
    return allLogs;
}
// Service to create a new daily log
export async function createDailyLog(body: any){

    const parseDate = new Date(body.date);

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
    return newRecord;
}