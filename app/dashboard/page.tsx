import CreateDailyLogForm from './CreateDailyLogForm';
import CreateItemForm from './CreateItemForm';


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
    })
    const parseLogs = await resLogs.json();
    const dailyLogs = parseLogs.data;
    ;
    // Rendering the UI
    return (
        <main>

            <div>
                <h1>My Learning Dashboard</h1>
                <CreateItemForm />
                {/* LEARNING ITEMS LIST */}
                <ul>
                    {learningItems.map((learningItem: any) => (
                        <div key={learningItem.id}>
                            <li>{learningItem.title}</li>
                            <li>{learningItem.type}</li>
                            <li>{learningItem.progress_percent}</li>
                            <li>{learningItem.status}</li>
                            <li>{learningItem.user_id}</li>
                        </div>

                    ))

                    }
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