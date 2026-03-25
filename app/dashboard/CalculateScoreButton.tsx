"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CalculateScoreButton() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleCalculate = async () => {
        setLoading(true);
        setError(null);

        try {
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

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to calculate Stats");
                setLoading(false);
                return;
            }
            // 4. SUCCESS! Tell Next.js to re-fetch the Server Components
            router.refresh();
        } catch (err) {
            setError("Network error check your connection!");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="mt-6 border-t border-neutral-800 pt-4">
            {/* ERROR MESSAGE BOX */}
            {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded-md text-sm">
                    ⚠️ {error}
                </div>
            )}

            <button 
                onClick={handleCalculate}
                disabled={loading}
                className={`px-6 py-2.5 font-medium rounded-md text-white shadow-sm transition-all ${
                    loading 
                        ? "bg-purple-900 cursor-not-allowed border border-purple-800 text-purple-300" 
                        : "bg-purple-600 hover:bg-purple-500 border border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                }`}
            >
                {loading ? "Calculating Math..." : "Calculate Weekly Score"}
            </button>
        </div>
    );

}