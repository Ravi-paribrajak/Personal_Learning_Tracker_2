import CreateProjectForm from "@/app/dashboard/CreateProjectForm";

export default async function Projects() {
    // 1. Fetch the projects securely on the server
    const res = await fetch("http://localhost:3000/api/projects", { cache: 'no-store' });
    const parseData = await res.json();
    const projects = parseData.data || [];

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">My Projects Portfolio</h2>
            
            {/* The Smart Form goes here */}
            <CreateProjectForm />
            
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-neutral-300 mb-4">Shipped Projects</h3>
                
                {projects.length === 0 ? (
                    <p className="text-neutral-500 italic p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                        No projects shipped yet. Start building!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((project: any) => (
                            <div key={project.id} className="p-5 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-bold text-lg text-white">{project.title}</h4>
                                        
                                        {/* Dynamic Status Pill */}
                                        <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md border ${
                                            project.status === 'Completed' ? 'bg-green-900/30 text-green-400 border-green-800' :
                                            project.status === 'In Progress' ? 'bg-blue-900/30 text-blue-400 border-blue-800' :
                                            'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                                        }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Project Metadata Tags */}
                                <div className="flex flex-wrap gap-2 mt-4 text-xs">
                                    <span className="bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
                                        AI: {project.aiUsageLevel}
                                    </span>
                                    {project.tutorialUsed && (
                                        <span className="bg-neutral-800 text-neutral-400 px-2 py-1 rounded">Tutorial</span>
                                    )}
                                    {project.architectureWritten && (
                                        <span className="bg-neutral-800 text-neutral-400 px-2 py-1 rounded">Architecture</span>
                                    )}
                                    {project.deployed && (
                                        <span className="bg-purple-900/30 text-purple-400 border border-purple-800 px-2 py-1 rounded font-medium">
                                            Deployed 🚀
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}