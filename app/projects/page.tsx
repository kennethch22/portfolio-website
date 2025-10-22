import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  // Fetch projects from the database, ordered by the 'order' field
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-heading neon-text mb-4">
            Projects
          </h1>
          <p className="text-xl text-cyber-text-muted">
            Things I've built and shipped
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                 {/* Use the new ProjectCard component */}
                     {projects.map((project) => (
                       <ProjectCard key={project.id} project={project} />
                     ))}
        </div>
      </div>
    </main>
  );
}