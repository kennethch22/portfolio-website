export default function ExperiencesPage() {
  // TODO: Add your experience data here
  const experiences = [
    {
      id: 1,
      company: "Company Name",
      role: "Your Role",
      shortDesc: "Brief description of what you did here.",
      startDate: "Jan 2024",
      endDate: "Present",
      skills: ["Next.js", "TypeScript", "PostgreSQL"],
      current: true
    },
    {
      id: 2,
      company: "Previous Company",
      role: "Previous Role",
      shortDesc: "What you accomplished in this position.",
      startDate: "Jun 2023",
      endDate: "Dec 2023",
      skills: ["React", "Node.js"],
      current: false
    }
  ];

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
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-cyber-neon-teal/10 border border-cyber-neon-teal/30 rounded text-xs text-cyber-neon-teal">
                        {exp.startDate} - {exp.endDate}
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

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-white/5 rounded text-xs text-cyber-text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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

