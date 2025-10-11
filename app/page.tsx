import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-heading mb-6 neon-text">
            Welcome to the Future
          </h1>
          <p className="text-xl md:text-2xl text-cyber-text-muted mb-8">
            Full-Stack Developer | Creative Technologist | Problem Solver
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/projects"
              className="glass-card px-8 py-3 hover:shadow-neon transition-all duration-300"
            >
              View Projects
            </Link>
            <a 
              href="mailto:your.email@example.com"
              className="bg-cyber-neon-teal text-cyber-bg-primary px-8 py-3 rounded-lg hover:shadow-neon-strong transition-all duration-300 font-medium"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading text-center neon-text mb-12">
            Explore
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "About", desc: "Learn about me", href: "/about", icon: "👤" },
              { title: "Projects", desc: "See my work", href: "/projects", icon: "🚀" },
              { title: "Skills", desc: "My expertise", href: "/skills", icon: "⚡" },
              { title: "Experience", desc: "My journey", href: "/experiences", icon: "📊" }
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

