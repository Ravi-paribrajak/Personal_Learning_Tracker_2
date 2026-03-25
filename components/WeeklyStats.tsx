import CalculateScoreButton from "@/app/dashboard/CalculateScoreButton";

export default async function Weeklystats() {

    // Fetch weekly metrics
    const resMetrics = await fetch("http://localhost:3000/api/weekly-metrics",
        { cache: "no-store" });
    const parseMetrics = await resMetrics.json();
    const weeklyMetric = parseMetrics.data;

    return (
        <div className="mb-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg relative overflow-hidden">
            {/* Subtle background glow effect for the stats card */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-600 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

            <h2 className="text-xl font-bold text-white mb-6">
                📊 Weekly Stats 
                <span className="text-neutral-400 text-base font-normal ml-2">
                    (Week {weeklyMetric?.week_number || "Pending"})
                </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm mb-1">Independence Score</p>
                    <p className="text-3xl font-bold text-purple-400">{weeklyMetric?.independence_score || 0}</p>
                </div>
                
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm mb-1">Total Build Hours</p>
                    <p className="text-2xl font-semibold text-white">{weeklyMetric?.total_build_hours || 0}h</p>
                </div>
                
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg">
                    <p className="text-neutral-400 text-sm mb-1">Total Reading</p>
                    <p className="text-2xl font-semibold text-white">{weeklyMetric?.total_reading_hours || 0}h</p>
                </div>
            </div>
            
            <CalculateScoreButton />
        </div>
    );
    
}