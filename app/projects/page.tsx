export default function ProjectsPage() {
  // TODO: Add your projects data here
  const projects = [
    {
      id: 1,
      title: "Project One",
      shortDesc: "A brief description of your project goes here.",
      skills: ["Next.js", "TypeScript", "Tailwind"],
      featured: true,
    },
    {
      id: 2,
      title: "Project Two",
      shortDesc: "Another amazing project you've worked on.",
      skills: ["React", "Node.js", "PostgreSQL"],
      featured: false,
    }
  ];

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
                <span className="text-6xl opacity-20">🚀</span>
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

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyber-neon-teal/10 border border-cyber-neon-teal/30 rounded text-xs text-cyber-neon-teal"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-cyber-neon-teal text-sm font-medium">
                  <span>View Project</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

