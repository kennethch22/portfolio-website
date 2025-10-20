import { prisma } from "@/lib/prisma";

export default async function OrganisationsPage() {
  // Fetch organisations from the database, ordered by the 'order' field
  const organisations = await prisma.organisation.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-heading neon-text mb-4">
            Organisations
          </h1>
          <p className="text-xl text-cyber-text-muted">
            Communities and groups I'm part of
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organisations.map((org) => (
            <div
              key={org.id}
              className="glass-card p-8 hover:shadow-neon transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyber-neon-teal/20 to-cyber-neon-blue/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {org.imageUrl ? (
                  <img
                    src={org.imageUrl}
                    alt={org.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-3xl">🏢</span>
                )}
              </div>

              <h3 className="text-2xl font-heading text-cyber-neon-teal mb-2">
                {org.name}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-cyber-text-primary font-medium">
                  {org.role}
                </span>
                <span className="text-cyber-text-muted text-sm">
                  • {org.startDate} - {org.current ? "Present" : org.endDate}
                </span>
              </div>

              <p className="text-cyber-text-muted mb-6">
                {org.shortDesc}
              </p>

              {/* The 'skills' field is not directly available on the Organisation model in Prisma. */}
              {/* If you wish to display skills associated with organisations, you'd need to add a many-to-many relationship in your Prisma schema. */}
              {/* For now, this section is removed to align with the current schema. */}
              {/* Example of how you might render if skills were included: */}
              {/* <div className="flex flex-wrap gap-2"> */}
              {/*   {org.skills.map((skill, index) => ( */}
              {/*     <span */}
              {/*       key={index} */}
              {/*       className="px-3 py-1 bg-cyber-neon-teal/10 border border-cyber-neon-teal/30 rounded text-xs text-cyber-neon-teal" */}
              {/*     > */}
              {/*       {skill} */}
              {/*     </span> */}
              {/*   ))} */}
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}