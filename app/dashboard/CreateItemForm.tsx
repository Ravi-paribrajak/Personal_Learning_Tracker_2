"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";  // Next.js tool for refreshing

export default function CreateItemForm() {

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");

    // New State for tracking loading
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();   // Stops the page from reloading
        
        // 2. Start loading and clear any old errors
        setLoading(true);
        setError(null);

        try{
            // 1. Send the POST request to your API
            const response = await fetch('/api/learning-items', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    type: type,
                }),
            });

            const data = await response.json();

            // 3. THE BOUNCER CHECK: Did the API reject it?
            if(!response.ok){
                // Check if the zod send us specific error details
                if(data.details && data.details.length > 0){
                    setError(data.details[0].message);  // Grab the first zod error message
                } else {
                    setError(data.error || "Failed to save item");
                }
                setLoading(false);
                return;   // Stop execution here
            }

            // 4. Success! Clear the form and refresh the page
            setTitle("");
            setType("");
            router.refresh();
        } catch(err) {
            setError("Network Error. Please check your connection!");
        } finally {
            // Always turn off the loading spinner at the very end
            setLoading(false);
        }
    }
    // Returning in the visual form to see on the screen
    return (
        <form onSubmit={handleSubmit} className="mb-8 p-5 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4">Add New Item</h3>
            
            {/* ERROR MESSAGE BOX */}
            {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded-md text-sm">
                    ⚠️ {error}
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
                <input 
                    type="text" 
                    placeholder="Course or Book Title (e.g. The Pragmatic Programmer)" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 bg-neutral-950 border border-neutral-700 text-white p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <input 
                    type="text" 
                    placeholder="Type (e.g. Book, Video)" 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="flex-1 bg-neutral-950 border border-neutral-700 text-white p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button 
                    type="submit" 
                    disabled={loading}
                    className={`px-6 py-2.5 font-medium rounded-md text-white transition-colors ${
                        loading ? "bg-blue-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
                    }`}
                >
                    {loading ? "Saving..." : "Add Item"}
                </button>
            </div>
        </form>
    );
};

