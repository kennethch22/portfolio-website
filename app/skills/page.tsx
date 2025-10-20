import { prisma } from "@/lib/prisma";

export default async function SkillsPage() {
  // Fetch skills from the database, grouped by category and ordered by name
  const skills = await prisma.skill.findMany({
    orderBy: [
      { category: "asc" },
      { name: "asc" }
    ],
  });

  // Group skills by category for display
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

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
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <div key={categoryIndex} className="glass-card p-8">
              <h2 className="text-2xl font-heading text-cyber-neon-teal mb-6">
                {category}
              </h2>
              
              <div className="space-y-5">
                {categorySkills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-cyber-text-primary font-medium">
                        {skill.name}
                      </span>
                      {/* The 'level' field is not in the Prisma Skill model, so it's removed. */}
                      {/* If you wish to re-introduce skill levels, you'd need to add it to your Prisma schema. */}
                    </div>
                    
                    {/* Progress bar based on 'level' is removed as 'level' is not in the schema. */}
                    {/* If you add 'level' to the schema, you can re-implement this. */}
                    {/* Example: */}
                    {/* <div className="h-2 bg-white/10 rounded-full overflow-hidden"> */}
                    {/*   <div  */}
                    {/*     className="h-full bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue rounded-full" */}
                    {/*     style={{ width: `${skill.level}%` }} */}
                    {/*   ></div> */}
                    {/* </div> */}
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