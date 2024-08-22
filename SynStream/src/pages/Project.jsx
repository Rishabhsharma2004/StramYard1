// src/components/ProjectSection.js
import React from 'react';
import { Link } from "react-router-dom";
const projects = [
  {
    id: 1,
    image: 'p1.png',
    title: 'Project One',
    description: 'A brief description of Project One.',
    link: '#'
  },
  {
    id: 2,
    image: 'sae.png',
    title: 'Project Two',
    description: 'A brief description of Project Two.',
    link: '#'
  },
  {
    id: 3,
    image: 'port.png',
    title: 'Project Three',
    description: 'A brief description of Project Three.',
    link: '/https://heyrishabh.netlify.app'
  },
  {
    id: 4,
    image: 'meet.png',
    title: 'Project Four',
    description: 'A brief description of Project Four.',
    link: 'https://meetide.netlify.app'
  },
  {
    id: 5,
    image: 'vbex.png',
    title: 'Project Five',
    description: 'A brief description of Project Five.',
    link: '#'
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/project6/600/400',
    title: 'Project Six',
    description: 'A brief description of Project Six.',
    link: '#'
  },
  {
    id: 7,
    image: 'https://picsum.photos/seed/project7/600/400',
    title: 'Project Seven',
    description: 'A brief description of Project Seven.',
    link: '#'
  },
  {
    id: 8,
    image: 'https://picsum.photos/seed/project8/600/400',
    title: 'Project Eight',
    description: 'A brief description of Project Eight.',
    link: '#'
  },
  {
    id: 9,
    image: 'https://picsum.photos/seed/project9/600/400',
    title: 'Project Nine',
    description: 'A brief description of Project Nine.',
    link: '#'
  }
];

const ProjectCard = ({ project }) => {
  return (
    <div className="relative overflow-hidden bg-gray-800 rounded-lg shadow-lg group transition-transform transform hover:scale-105 hover:shadow-2xl h-64">
      <img src={project.image} alt={project.title} className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-white mb-4 px-4">{project.description}</p>
        <Link href={project.link} target='_blank' className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">View Project</Link>
      </div>
    </div>
  );
};

const ProjectSection = () => {
  return (
    <section className="p-6 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-6">Our Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
