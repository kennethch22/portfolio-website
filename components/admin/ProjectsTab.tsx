"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@prisma/client";

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formState, setFormState] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    featured: false,
    imageUrl: "",
    demoUrl: "",
    githubUrl: "",
    order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const dataToSubmit = {
      ...formState,
      order: Number(formState.order) || 0, // Convert string to number here
    };
    e.preventDefault();
    setError(null);
    try {
      let res;
      if (editingProject) {
        res = await fetch("/api/admin/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, ...dataToSubmit }),
        });
      } else {
        res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        });
      }

      if (!res.ok) throw new Error(`Failed to ${editingProject ? "update" : "create"} project`);

      setFormState({
        title: "",
        shortDesc: "",
        fullDesc: "",
        featured: false,
        imageUrl: "",
        demoUrl: "",
        githubUrl: "",
        order: 0,
      });
      setEditingProject(null);
      fetchProjects();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormState({
      title: project.title,
      shortDesc: project.shortDesc,
      fullDesc: project.fullDesc || "",
      featured: project.featured,
      imageUrl: project.imageUrl || "",
      demoUrl: project.demoUrl || "",
      githubUrl: project.githubUrl || "",
      order: project.order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      fetchProjects();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg bg-gray-800">
        <h3 className="text-xl mb-4">{editingProject ? "Edit Project" : "Add New Project"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Project Title</label>
            <input type="text" id="title" name="title" value={formState.title} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={formState.imageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-300">Demo URL</label>
            <input type="text" id="demoUrl" name="demoUrl" value={formState.demoUrl} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300">GitHub URL</label>
            <input type="text" id="githubUrl" name="githubUrl" value={formState.githubUrl} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-300">Short Description</label>
            <textarea id="shortDesc" name="shortDesc" rows={3} value={formState.shortDesc} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required></textarea>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="fullDesc" className="block text-sm font-medium text-gray-300">Full Description</label>
            <textarea id="fullDesc" name="fullDesc" rows={5} value={formState.fullDesc} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="featured" name="featured" checked={formState.featured} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded" />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-300">Featured Project</label>
          </div>
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-300">Order</label>
            <input type="number" id="order" name="order" value={formState.order} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {editingProject ? "Update Project" : "Add Project"}
        </button>
        {editingProject && (
          <button type="button" onClick={() => setEditingProject(null)} className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel Edit
          </button>
        )}
      </form>

      <h3 className="text-xl mb-4">Existing Projects</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Featured</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{project.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{project.featured ? "Yes" : "No"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{project.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(project)} className="text-indigo-400 hover:text-indigo-600 mr-4">Edit</button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}