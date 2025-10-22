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
    {} as Record<string, typeof skills> // Explicit type assertion
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
            // Outer div for the category card
            <div key={categoryIndex} className="glass-card p-8">
              <h2 className="text-2xl font-heading text-cyber-neon-teal mb-6">
                {category}
              </h2>
              {/* Flex container for skills within this category */}
              <div className="flex flex-wrap gap-4">
                {/* Map over skills in the current category */}
                {categorySkills.map((skill, skillIndex) => (
                  // Stadium Card div is the single element returned for each skill
                  <div
                    key={skillIndex} // It's better to use skill.id if available: key={skill.id}
                    className="glass-card px-4 py-2 rounded-full flex items-center gap-3 hover:shadow-neon transition-shadow"
                  >
                    {skill.imageUrl && (
                      <img
                        src={skill.imageUrl}
                        alt={skill.name}
                        className="w-6 h-6 rounded-full object-cover" // Smaller, rounded image
                      />
                    )}
                    <span className="text-cyber-text-primary text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))} {/* Closing parenthesis and brace for inner map */}
              </div> {/* Closing div for flex container */}
            </div> // Closing div for category card
          ))} {/* Closing parenthesis and brace for outer map */}
        </div> {/* Closing div for grid */}
      </div> {/* Closing div for max-w container */}
    </main>
  );
}