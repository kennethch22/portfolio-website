export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-heading neon-text mb-4">
            About Me
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyber-neon-teal to-cyber-neon-blue"></div>
        </div>

        {/* Bio Section */}
        <section className="glass-card p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-heading text-cyber-neon-teal mb-6">
            Who I Am
          </h2>
          <div className="space-y-4 text-cyber-text-muted text-lg leading-relaxed">
            <p>
              I'm a full-stack developer passionate about creating innovative 
              solutions that blend cutting-edge technology with exceptional 
              user experiences. With a focus on modern web technologies, 
              I build applications that are both powerful and beautiful.
            </p>
            <p>
              Currently exploring the intersection of web development, 
              data science, and creative technology. I believe in writing 
              clean, maintainable code and creating products that make a 
              real impact.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="glass-card p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-heading text-cyber-neon-teal mb-6">
            Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Innovation",
                desc: "Constantly exploring new technologies and approaches to solve problems creatively."
              },
              {
                title: "Quality",
                desc: "Writing clean, maintainable code that stands the test of time."
              },
              {
                title: "Impact",
                desc: "Building solutions that make a meaningful difference in people's lives."
              },
              {
                title: "Learning",
                desc: "Embracing continuous growth and staying curious about emerging tech."
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="border border-cyber-neon-teal/20 rounded-lg p-6 hover:border-cyber-neon-teal/50 transition-all duration-300"
              >
                <h3 className="text-xl font-heading text-cyber-neon-teal mb-2">
                  {value.title}
                </h3>
                <p className="text-cyber-text-muted">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Focus */}
        <section className="glass-card p-8 md:p-12">
          <h2 className="text-3xl font-heading text-cyber-neon-teal mb-6">
            Current Focus
          </h2>
          <ul className="space-y-4 text-cyber-text-muted text-lg">
            <li className="flex items-start gap-3">
              <span className="text-cyber-neon-teal text-2xl">▹</span>
              <span>Building scalable web applications with Next.js and TypeScript</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-neon-teal text-2xl">▹</span>
              <span>Exploring serverless architectures and edge computing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-neon-teal text-2xl">▹</span>
              <span>Contributing to open-source projects</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-neon-teal text-2xl">▹</span>
              <span>Learning data visualization and analytics</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

