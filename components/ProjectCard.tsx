// components/ProjectCard.tsx
"use client";

import { useState } from 'react';
import { Project } from '@prisma/client'; // Adjust type if needed

// Define a more specific type if you included skills
// type ProjectWithSkills = Project & { skills: { skill: { id: string; name: string } }[] };
// interface ProjectCardProps { project: ProjectWithSkills }

interface ProjectCardProps {
  project: Project; // Use the specific type if needed: ProjectWithSkills
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card group cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ minHeight: '350px' }} // Set a min-height for consistent card size
    >
      <div className="flip-card-inner">
        {/* --- FRONT OF CARD --- */}
        <div className="flip-card-front">
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
          <div className="p-6 text-left"> {/* Ensure text alignment */}
            <h3 className="text-2xl font-heading text-cyber-neon-teal mb-2 group-hover:text-cyber-neon-blue transition-colors">
              {project.title}
            </h3>
            <p className="text-cyber-text-muted mb-4">
              {project.shortDesc}
            </p>
            {/* Add skills rendering here if you fetched them */}

            <div className="flex items-center gap-4 text-cyber-neon-teal text-sm font-medium mt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                   onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking link
                >
                  GitHub
                </a>
              )}
              {project.githubUrl && (
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              )}
            </div>
             {/* Add a hint to click */}
             <p className="text-xs text-cyber-text-muted/50 mt-2 absolute bottom-2 right-4">Click to see details</p>
          </div>
        </div>

        {/* --- BACK OF CARD --- */}
        <div className="flip-card-back">
          <h4 className="text-xl font-heading text-cyber-neon-blue mb-4">
            {project.title}
          </h4>
          <p className="text-cyber-text-muted text-sm overflow-y-auto max-h-60"> {/* Allow scrolling if text is long */}
            {project.fullDesc || 'No further details available.'}
          </p>
           {/* Add a hint to click */}
           <p className="text-xs text-cyber-text-muted/50 mt-2 absolute bottom-2 right-4">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}