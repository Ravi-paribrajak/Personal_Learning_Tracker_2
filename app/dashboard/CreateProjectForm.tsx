"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectForm() {

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("Planning")
    const [tutorialUsed, setTutorialUsed] = useState(false)
    const [aiUsageLevel, setAiUsageLevel] = useState("Medium");
    const [deployed, setDeployed] = useState(false);
    const [architectureWritten, setArchitectureWritten] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    status,
                    tutorialUsed,
                    aiUsageLevel,
                    deployed,
                    architectureWritten
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.details && data.details.length > 0) {
                    setError(data.details[0].message);
                } else {
                    setError(data.error || "Failed to save Project!");
                }
                setLoading(false);
                return;
            }
            // Reset form on success
            setTitle("");
            setStatus("Planning");
            setTutorialUsed(false);
            setAiUsageLevel("Medium");
            setDeployed(false);
            setArchitectureWritten(false);

            // Trigger UI refresh
            router.refresh();

        } catch (err) {
            setError("Network Error, Please check your Connection!");
        } finally {
            setLoading(false);
        }

    };
    return (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4">Ship a New Project</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded-md text-sm">
                    ⚠️ {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Project Title (e.g. AI Video Editor)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-white p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-white p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>

                </select>
                <select
                    value={aiUsageLevel}
                    onChange={(e) => setAiUsageLevel(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-white p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="None">AI Usage: None</option>
                    <option value="Low">AI Usage: Low</option>
                    <option value="Medium">AI Usage: Medium</option>
                    <option value="High">AI Usage: High</option>
                </select>
            </div>

            <div className="flex flex-wrap gap-6 mb-6">
                <label className="flex items-center space-x-2 text-neutral-300 cursor-pointer">
                    <input type="checkbox" checked={tutorialUsed} onChange={(e) => setTutorialUsed(e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 text-blue-500 focus:ring-blue-600 focus:ring-offset-neutral-900" />
                    <span>Tutorial Used</span>
                </label>
                
                <label className="flex items-center space-x-2 text-neutral-300 cursor-pointer">
                    <input type="checkbox" checked={architectureWritten} onChange={(e) => setArchitectureWritten(e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 text-blue-500 focus:ring-blue-600 focus:ring-offset-neutral-900" />
                    <span>Architecture Written</span>
                </label>

                <label className="flex items-center space-x-2 text-neutral-300 cursor-pointer">
                    <input type="checkbox" checked={deployed} onChange={(e) => setDeployed(e.target.checked)} className="rounded bg-neutral-800 border-neutral-700 text-blue-500 focus:ring-blue-600 focus:ring-offset-neutral-900" />
                    <span>Deployed</span>
                </label>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className={`w-full md:w-auto px-8 py-2.5 font-medium rounded-md text-white transition-colors ${
                    loading ? "bg-blue-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
                }`}
            >
                {loading ? "Initializing..." : "Add Project"}
            </button>

        </form>
    )


}