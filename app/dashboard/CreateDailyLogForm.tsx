"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateDailyLogForm() {

    // Writing all the containers for data entry
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [buildHours, setBuildHours] = useState("");
    const [readingHours, setReadingHours] = useState("");
    const [aiUsed, setAiUsed] = useState(false);
    const [summary, setSummary] = useState("");
    const [confidence, setConfidence] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("/api/daily-logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: date,
                build_hours: Number(buildHours),
                reading_hours: Number(readingHours),
                ai_used: aiUsed,
                summary: summary,
                confidence_score: Number(confidence)

            }),
        });
        // 3. If successfull clear the response and refresh the page!
        if (response.ok) {
            setDate(new Date().toISOString().split("T")[0]);
            setBuildHours("");
            setReadingHours("");
            setAiUsed(false)
            setSummary("");
            setConfidence("");
            // MAGIC NEXT.JS REFRESH LINE (Add this!)
            router.refresh()
        } else {
            console.error("Failed to Save Daily-log!");
        }
        console.log("Form Submitted");
    }
    return (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h3>Add Daily Log</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>

                    <label>Date: </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Build Hours(eg.,3)"
                        value={buildHours}
                        onChange={(e) => setBuildHours(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Reading Hours(eg.,1)"
                        value={readingHours}
                        onChange={(e) => setReadingHours(e.target.value)}
                        required
                    />
                    <label style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                        <input
                            type="checkbox"
                            checked={aiUsed}
                            onChange={(e) => setAiUsed(e.target.checked)}
                        />
                        Did you used AI today?
                    </label>

                    <input
                        type="number"
                        placeholder="confidence score (1-10)"
                        value={confidence}
                        onChange={(e) => setConfidence(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Quick Summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                    />
                    
                </div>
                <button type="submit" style={{ padding: "5px 15px", cursor: "pointer" }}>Save Log</button>
            </form>

        </div>
    )

}
