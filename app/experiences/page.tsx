import { prisma } from "@/lib/prisma";

export default async function ExperiencesPage() {
  // Fetch experiences from the database, ordered by the 'order' field
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="min-h-screen px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-heading neon-text mb-4">
            Experience
          </h1>
          <p className="text-xl text-cyber-text-muted">
            My professional journey
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-neon-teal via-cyber-neon-blue to-transparent"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-cyber-neon-teal rounded-full border-4 border-cyber-bg-primary transform -translate-x-1.5 md:-translate-x-2 shadow-neon"></div>

                <div className={`w-full md:w-5/12 ml-8 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                }`}>
                  <div className="glass-card p-6 hover:shadow-neon transition-all duration-300">
                                {exp.imageUrl && (
                <div className="mb-4">
                  <img src={exp.imageUrl} alt={exp.company} className="w-full h-32 object-cover rounded-lg" />
                </div>
              )}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-cyber-neon-teal/10 border border-cyber-neon-teal/30 rounded text-xs text-cyber-neon-teal">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                      {exp.current && (
                        <span className="px-3 py-1 bg-cyber-neon-blue/10 border border-cyber-neon-blue/30 rounded text-xs text-cyber-neon-blue animate-pulse">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-heading text-cyber-neon-teal mb-1">
                      {exp.role}
                    </h3>
                    <h4 className="text-lg text-cyber-text-primary mb-3">
                      {exp.company}
                    </h4>

                    <p className="text-cyber-text-muted mb-4">
                      {exp.shortDesc}
                    </p>

                    {exp.fullDesc && (
                      <p className="text-cyber-text-muted text-sm mb-4">
                        {exp.fullDesc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}