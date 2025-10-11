export default function Footer() {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/yourusername", icon: "💻" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "💼" },
    { name: "Email", url: "mailto:your.email@example.com", icon: "📧" },
    { name: "WhatsApp", url: "https://wa.me/yourphonenumber", icon: "💬" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading neon-text mb-4">
              CYBER.DEV
            </h3>
            <p className="text-cyber-text-muted">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading text-cyber-neon-teal mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[ "Projects", "Skills", "Experience","Organizations"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-cyber-text-muted hover:text-cyber-neon-teal transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-heading text-cyber-neon-teal mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass-card flex items-center justify-center hover:shadow-neon transition-all duration-300 text-2xl"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-cyber-text-muted text-sm">
          <p>© {currentYear} Your Name. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}

