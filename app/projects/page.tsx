import { prisma } from "@/lib/prisma";

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
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card overflow-hidden hover:shadow-neon transition-all duration-300 group cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-cyber-neon-teal/20 to-cyber-neon-blue/20 flex items-center justify-center relative">
                {/* Assuming imageUrl is available from the database */}
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl opacity-20">🚀</span>
                )}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-cyber-neon-teal text-cyber-bg-primary text-xs font-bold rounded-full">
                    FEATURED
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-heading text-cyber-neon-teal mb-2 group-hover:text-cyber-neon-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-cyber-text-muted mb-4">
                  {project.shortDesc}
                </p>

                {/* Skills are handled via a junction table, so direct display here is removed for simplicity. */}
                {/* If you want to display skills, you'll need to adjust the Prisma query to include them. */}
                {/* Example: include: { skills: { include: { skill: true } } } and then map over project.skills.map(ps => ps.skill.name) */}

                <div className="flex items-center gap-2 text-cyber-neon-teal text-sm font-medium">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {(project.demoUrl || project.githubUrl) && (
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}