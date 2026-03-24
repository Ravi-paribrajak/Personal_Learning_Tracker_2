import CreateItemForm from "@/app/dashboard/CreateItemForm";

export default async function LearningItems() {

    // Fetching all the Learning Items from API
    const resItems = await fetch("http://localhost:3000/api/learning-items", { cache: 'no-store' });
    const parseItems = await resItems.json();
    const learningItems = parseItems.data;

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">My Learning Dashboard</h2>
            <CreateItemForm />

            <ul className="mt-8 space-y-3">
                {learningItems.map((item: any) => (
                    <li key={item.id} className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-between hover:border-neutral-700 transition-colors">
                        <div>
                            <span className="font-semibold text-white">{item.title}</span>
                            <span className="text-neutral-500 text-sm ml-2">- {item.type}</span>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-800 rounded-full">
                            {item.status}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}