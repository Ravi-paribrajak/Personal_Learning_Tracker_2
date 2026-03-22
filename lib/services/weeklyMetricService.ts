import { prisma } from "@/lib/prisma";


// Service to get the latest metric
export async function getLatestWeeklyMetric() {

    const allMetric = await prisma.weekly_Metrics.findMany({
        where: {
            user_id: "ravi-1"
        },
    });
    // Grab the very last item in the array (The absolute newest Calculation!)
    return allMetric[allMetric.length - 1];
}
// Service to calculate and save a new weekly metric
export async function generateWeeklyMetric(week_number: number) {

    // Fetch the logs
    const logs = await prisma.daily_Logs.findMany({
        where: {
            user_id: "ravi-1"
        }
    });
    // 2. Calculate weekly metrics
    let total_reading_hours = 0;
    let total_build_hours = 0;
    let final_independence_score = 0;

    for (const log of logs) {
        const build = log.build_hours || 0;
        const reading = log.reading_hours || 0;
        const confidence = log.confidence_score || 0;
        const aiPenality = log.ai_used ? 5 : 0;

        total_build_hours += build;
        total_reading_hours += reading;
        final_independence_score += (build * 2) + reading + confidence - aiPenality;
    }
    // 3. Save to Database
    const newMetric = await prisma.weekly_Metrics.create({
        data: {
            week_number: week_number,
            total_build_hours: total_build_hours,
            total_reading_hours: total_reading_hours,
            independence_score: final_independence_score,
            user_id: "ravi-1"
        }
    });
    return newMetric;
}







