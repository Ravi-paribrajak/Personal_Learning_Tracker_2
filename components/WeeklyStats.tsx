import CalculateScoreButton from "@/app/dashboard/CalculateScoreButton";

export default async function Weeklystats() {

    // Fetch weekly metrics
    const resMetrics = await fetch("http://localhost:3000/api/weekly-metrics",
        { cache: "no-store" });
    const parseMetrics = await resMetrics.json();
    const weeklyMetric = parseMetrics.data;

    return (
        <div className="mb-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">
                📊 Weekly Stats <span className="text-neutral-400 text-base font-normal">(Week {weeklyMetric?.week_number || 1})</span>
            </h2>
            
            <div className="space-y-2 text-neutral-300 mb-6">
                <p><strong className="text-white">Independence Score:</strong> <span className="text-blue-400 font-bold">{weeklyMetric?.independence_score || 0}</span></p>
                <p><strong className="text-white">Total Build Hours:</strong> {weeklyMetric?.total_build_hours || 0}h</p>
                <p><strong className="text-white">Total Reading Hours:</strong> {weeklyMetric?.total_reading_hours || 0}h</p>
            </div>
            
            <CalculateScoreButton />
        </div>
    );
    
}