import WeeklyStats from "@/components/WeeklyStats";
import LearningItems from "@/components/LearningItems";
import Projects from "@/components/Projects"; // <-- 1. Import it here
import DailyLogs from "@/components/DailyLogs";

export default async function DashboardPage() {
    return (
        <main className="max-w-3xl mx-auto p-6 md:py-12 min-h-screen text-neutral-100">
            <WeeklyStats />
            
            <hr className="my-10 border-neutral-800" />
            
            <LearningItems />
            
            <hr className="my-10 border-neutral-800" />
            
            <Projects /> {/* <-- 2. Render it here */}
            
            <hr className="my-10 border-neutral-800" />
            
            <DailyLogs />
        </main>
    );
}