export default function SkillsPage() {
  // TODO: Add your skills data here
  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 90 },
      ]
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
        { name: "PostgreSQL", level: 75 },
      ]
    }
  ];

  return (
    <main className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-heading neon-text mb-4">
            Skills & Expertise
          </h1>
          <p className="text-xl text-cyber-text-muted">
            Technologies and tools I work with
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="glass-card p-8">
              <h2 className="text-2xl font-heading text-cyber-neon-teal mb-6">
                {category.name}
              </h2>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-cyber-text-primary font-medium">
                        {skill.name}
                      </span>
                      <span className="text-cyber-text-muted text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

