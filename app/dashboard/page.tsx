import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {

    // Fetch the Data directly from our API
    // cache: 'no-store' --> forces the next.js to always get the fresh data instead of storing the old snap-shot
    const res = await fetch("http://localhost:3000/api/learning-items", {
        cache: 'no-store'
    });

    // Unpack the JSON
    const parseData = await res.json();
    const learningItems = parseData.data;

    // Rendering the UI
    return (
        <main>

            <div>
                <h1>My Learning Dashboard</h1>
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

            </div>

        </main>
    )



}