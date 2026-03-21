"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CalculateScoreButton() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        setLoading(true);

        // Tells the Backend to look at all our logs and Generate a new Score!
        const response = await fetch("/api/weekly-metrics", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                week_number: 1    // Hardcoded for week 1 for now
            })
        });
        if (response.ok) {
            router.refresh();
        } else {
            console.error("Failed to Calculate Metrics!");
        }
        setLoading(false);
    };

    return (
        <button 
        onClick={handleCalculate} 
        disabled={loading} 
        style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer", backgroundColor: "#fff", color: "#000", border: "1px solid #ccc", borderRadius: "4px" }}>
            {loading? "Calculating...": "Calculate Weekly Score"}
        </button>
    );

}