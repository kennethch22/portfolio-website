import Link from 'next/link';

export default function Home() {
  // About Me data
  const aboutMe = {
    name: "Kenneth Christopher Hendra",
    title: "Aspiring Software Engineer| Entrepreneur | Foodie",
    bio: "I’m Kenneth, a Year 2 Business Analytics student at NUS who loves using data and technology to bring ideas to life. I enjoy designing and building projects from scratch and seeing them come alive on the web. I also love analyzing datasets and uncovering interesting insights. Besides this, I run a marketing agency on the side, where we do Social Media Marketing for over 20 clients. If I’m not working, I’m probably out trying new cuisines or playing Clash Royale.",

  };

  // Current experiences (mark current: true for ongoing roles)
  const experiences = [
    {
      id: 1,
      company: "Company Name",
      role: "Your Role",
      shortDesc: "Brief description of what you do here.",
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

  // Filter only current experiences
  const currentExperiences = experiences.filter(exp => exp.current);

  // Projects data (last 3 will be shown)
  const allProjects = [
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
    },
    {
      id: 3,
      title: "Project Three",
      shortDesc: "Yet another cool project.",
      skills: ["Python", "FastAPI", "MongoDB"],
      featured: false,
    },
    {
      id: 4,
      title: "Project Four",
      shortDesc: "This won't show on homepage.",
      skills: ["Vue.js", "Express"],
      featured: false,
    }
  ];

  // Get last 3 projects
  const recentProjects = allProjects.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
<section className="flex items-center justify-center min-h-screen px-4">
  <div className="max-w-7xl mx-auto w-full">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left Side - Text Content */}
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-heading neon-text leading-tight">
          {aboutMe.name}
        </h1>
        <p className="text-xl md:text-2xl text-cyber-text-muted">
          {aboutMe.title}
        </p>
        <p className="text-lg text-cyber-text-muted leading-relaxed">
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
            href="mailto:your.email@example.com"
            className="bg-cyber-neon-teal text-cyber-bg-primary px-8 py-3 rounded-lg hover:shadow-neon-strong transition-all duration-300 font-medium"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Right Side - Profile Picture */}
      <div className="flex justify-center md:justify-end">
        <div className="relative group">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          
          {/* Image container */}
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-lg overflow-hidden border-2 border-cyber-neon-teal/50">
              {/* Replace with your actual image */}
              <img 
                src="/profile-picture.jpg" 
                alt="Kenneth Christopher"
                className="w-full h-full object-cover"
              />
              {/* Placeholder if no image yet */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-neon-teal/20 to-cyber-neon-blue/20 flex items-center justify-center">
                <span className="text-8xl opacity-30">👤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      

      {/* About Me Section */}
      <section className="px-4 py-20 bg-cyber-bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-heading neon-text mb-4">
              About Me
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue"></div>
          </div>

          <div className="glass-card p-8 md:p-12 mb-8">
            <p className="text-cyber-text-muted text-lg leading-relaxed mb-6">
              {aboutMe.bio}
            </p>

            <h3 className="text-2xl font-heading text-cyber-neon-teal mb-4">
            </h3>
            <ul className="space-y-3 text-cyber-text-muted">


            </ul>
          </div>
        </div>
      </section>

      {/* Current Experiences Section */}
      {currentExperiences.length > 0 && (
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-heading neon-text mb-4">
                Current Experience
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {currentExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="glass-card p-8 hover:shadow-neon transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-cyber-neon-teal/10 border border-cyber-neon-teal/30 rounded text-xs text-cyber-neon-teal">
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <span className="px-3 py-1 bg-cyber-neon-blue/10 border border-cyber-neon-blue/30 rounded text-xs text-cyber-neon-blue animate-pulse">
                      Current
                    </span>
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
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 glass-card px-6 py-3 hover:shadow-neon transition-all duration-300"
              >
                <span>View All Experiences</span>
                <span>→</span>
              </Link>
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

      {/* Quick Links Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading text-center neon-text mb-12">
            Explore More
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Projects", desc: "See all my work", href: "/projects", icon: "🚀" },
              { title: "Skills", desc: "My expertise", href: "/skills", icon: "⚡" },
              { title: "Experience", desc: "My journey", href: "/experiences", icon: "📊" },
              { title: "Organisations", desc: "Communities", href: "/organisations", icon: "🏢" }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="glass-card p-6 text-center hover:shadow-neon transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-heading text-cyber-neon-teal mb-2">
                  {item.title}
                </h3>
                <p className="text-cyber-text-muted text-sm">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}