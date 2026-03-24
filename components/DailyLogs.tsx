import CreateDailyLogForm from "@/app/dashboard/CreateDailyLogForm";

export default async function DailyLogs(){

    // Fetching data from the daily-logs API
    const resLogs = await fetch("http://localhost:3000/api/daily-logs", {cache: 'no-store'});
    const parseLogs = await resLogs.json();
    const dailyLogs = parseLogs.data;

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">My Daily Log Tracker</h2>
            <CreateDailyLogForm />
            
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-neutral-300 mb-4">Log History</h3>
                <ul className="space-y-4">
                    {dailyLogs.map((log: any) => (
                        <li key={log.id} className="p-5 bg-neutral-900 border border-neutral-800 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                                <strong className="text-blue-400">{new Date(log.date).toLocaleDateString()}</strong>
                                <span className="px-2 py-1 text-xs font-semibold bg-green-900/30 text-green-400 border border-green-800 rounded-md">
                                    Confidence: {log.confidence_score}/10
                                </span>
                            </div>
                            <p className="text-neutral-300 mb-3">
                                Built <span className="text-white font-medium">{log.build_hours}h</span>, 
                                Read <span className="text-white font-medium">{log.reading_hours}h</span>
                            </p>
                            <em className="text-neutral-400 text-sm block border-t border-neutral-800 pt-3">
                                <span className="text-neutral-500 not-italic mr-1">Summary:</span> {log.summary}
                            </em>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}