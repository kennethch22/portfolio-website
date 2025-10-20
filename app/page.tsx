import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // About Me data
  const aboutMe = {
    name: 'Kenneth C. Hendra',
    title: 'Aspiring Software Engineer | Data Enthusiast | Ideator',
    bio: 'I’m Kenneth, a Year 2 Business Analytics student at NUS who loves using data and technology to bring ideas to life. I enjoy designing and building projects from scratch and seeing them come alive on the web. I also love analyzing datasets and uncovering interesting insights. Besides this, I run a marketing agency on the side, where we do Social Media Marketing for over 20 clients. If I’m not working, I’m probably out trying new cuisines or playing Clash Royale.',
  };

  // Fetch ALL experiences from the database
  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' },
  });

  // Projects data (last 3 will be shown)
  const recentProjects = await prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    take: 3,
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8 flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl font-heading neon-text leading-tight whitespace-nowrap">
                {aboutMe.name}
              </h1>
              <p className="text-xl md:text-2xl text-cyber-text-muted whitespace-nowrap">
                {aboutMe.title}
              </p>
              <p className="text-lg text-cyber-text-muted leading-relaxed text-justify pr--2">
                {aboutMe.bio}
              </p>
              <div className="flex gap-4 flex-wrap pt-4">
                <a
                  href="/resume.pdf"
                  download
                  className="glass-card px-8 py-3 hover:shadow-neon transition-all duration-300 flex items-center gap-2"
                >
                  <span>📄</span>
                  <span>Download Resume</span>
                </a>
                <a
                  href="mailto:kennethchristopherhsg@gmail.com"
                  className="bg-cyber-neon-teal text-cyber-bg-primary px-8 py-3 rounded-lg hover:shadow-neon-strong transition-all duration-300 font-medium"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* Right Side - Profile Picture */}
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <div className="w-80 h-80 md:w-96 md:h-96 rounded-lg overflow-hidden border-2 border-cyber-neon-teal/50">
                    <img
                      src="/profile-picture.jpg"
                      alt="Kenneth Christopher Hendra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section (Timeline) */}
      {experiences.length > 0 && (
        <section className="px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-heading neon-text mb-4">
                Experience
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue"></div>
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

                    <div
                      className={`w-full md:w-5/12 ml-8 md:ml-0 ${
                        index % 2 === 0
                          ? 'md:mr-auto md:pr-12'
                          : 'md:ml-auto md:pl-12'
                      }`}
                    >
                      <div className="glass-card p-6 hover:shadow-neon transition-all duration-300">
                        {exp.imageUrl && (
                          <div className="mb-4">
                            <img
                              src={exp.imageUrl}
                              alt={exp.company}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-cyber-neon-teal/10 border border-cyber-neon-teal/30 rounded text-xs text-cyber-neon-teal">
                            {exp.startDate} -{' '}
                            {exp.current ? 'Present' : exp.endDate}
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
        </section>
      )}

      {/* Recent Projects Section */}
      <section className="px-4 py-20 bg-cyber-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-heading neon-text mb-4">
              Recent Projects
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card overflow-hidden hover:shadow-neon transition-all duration-300 group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-cyber-neon-teal/20 to-cyber-neon-blue/20 flex items-center justify-center relative">
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
                  {/* Skills are handled via a junction table. To display them, 
                     you'd need to update the Prisma query to include them. */}

                  <div className="flex items-center gap-4 text-cyber-neon-teal text-sm font-medium">
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
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-cyber-neon-teal text-cyber-bg-primary px-8 py-4 rounded-lg hover:shadow-neon-strong transition-all duration-300 font-medium text-lg"
            >
              <span>View All Projects</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}