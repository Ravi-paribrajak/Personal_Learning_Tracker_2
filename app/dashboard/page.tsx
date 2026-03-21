import CreateDailyLogForm from './CreateDailyLogForm';
import CreateItemForm from './CreateItemForm';
import CalculateScoreButton from './CalculateScoreButton';


export default async function DashboardPage() {

    // --- FETCH LEARNING ITEMS ---
    // cache: 'no-store' --> forces the next.js to always get the fresh data instead of storing the old snap-shot
    const resItems = await fetch("http://localhost:3000/api/learning-items", {
        cache: 'no-store'
    });
    // Unpack the JSON
    const parseItems = await resItems.json();
    const learningItems = parseItems.data;

    // --- FETCH DAILY LOGS ---
    const resLogs = await fetch("http://localhost:3000/api/daily-logs", {
        cache: 'no-store'
    });
    const parseLogs = await resLogs.json();
    const dailyLogs = parseLogs.data;
    
    // --- FETCH WEEKLY METRICS ---
    const resMetrics = await fetch("http://localhost:3000/api/weekly-metrics", {
        cache: 'no-store'
    });
    const parseMetrics = await resMetrics.json();
    const weeklyMetric = parseMetrics.data;

    // Rendering the UI
    return (
        <main>

            <div>
                {/* 3. NEW: The Weekly Stats UI (Placed at the very top!) */}
            <div style={{ marginBottom: "30px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
                {/* We use ?. and || 0 just in case there is no data yet! */}
                <h2>📊 Weekly Stats (Week {weeklyMetric?.week_number || 1})</h2>
                <p><strong>Independence Score:</strong> {weeklyMetric?.independence_score || 0}</p>
                <p><strong>Total Build Hours:</strong> {weeklyMetric?.total_build_hours || 0}</p>
                <p><strong>Total Reading Hours:</strong> {weeklyMetric?.total_reading_hours || 0}</p>
                
                <CalculateScoreButton />
            </div>

            <hr style={{ marginBottom: "30px" }} />
                <h1>My Learning Dashboard</h1>
                <CreateItemForm />
                {/* LEARNING ITEMS LIST */}
                <ul style={{ marginBottom: "40px" }}>
                    {learningItems.map((item: any) => (
                        <li key={item.id}>
                            {item.title} - {item.type} ({item.status})
                        </li>
                    ))}
                </ul>
                <h1>My Daily Log Tracker</h1>
                <CreateDailyLogForm />
                {/*  The Daily Log list */}
                <div style={{ marginTop: "40px" }}>
                    <h3>Log History</h3>
                    <ul>
                        {dailyLogs.map((log: any) => (
                            <li key={log.id} style={{ marginBottom: "10px" }}>
                                <strong>{new Date(log.date).toLocaleDateString()}</strong>:
                                Built {log.build_hours}h, Read {log.reading_hours}h
                                (Confidence: {log.confidence_score}/10)
                                <br />
                                <em>Summary: {log.summary}</em>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </main>
    )



}