"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";  // Next.js tool for refreshing

export default function CreateItemForm() {

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();   // Stops the page from reloading
        // console.log("Title typed!", title);
        // console.log("Type typed", type);

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
        // 2. If the API returns the success(201 Created)
        if (response.ok) {
            // Clear the response box so the user can type a new one
            setTitle("");
            setType("");

            // Magic: Telling the Next.js to secretly refresh the list
            router.refresh();
        } else {
            console.error("Something went wrong saving the item!");
        }
    }
    // Returning in the visual form to see on the screen
    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", marginTop: "20px" }}>
            <input
                type="text"
                placeholder="Course or Book Title"
                value={title}
                // This updates our states everytime we type a letter
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginRight: "10px", padding: "5px" }}
            />
            <input
                type="text"
                placeholder="Type (ex: Book, video..)"
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ marginRight: "10px", padding: "5px" }}
            />
            <button type="submit" style={{ padding: "5px 10px" }}>Add Item</button>

        </form>
    );
};

