"use client";

import React, { useState, useEffect } from "react";
import { Experience } from "@prisma/client";

export default function ExperiencesTab() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formState, setFormState] = useState({
    company: "",
    role: "",
    shortDesc: "",
    fullDesc: "",
    startDate: "",
    imageUrl: "",
    endDate: "",
    current: false,
    order: 0,
  });

  // Fetch all experiences when component mounts
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/experiences");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      const data = await res.json();
      setExperiences(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let res;
      if (editingExperience) {
        // Update existing experience
        res = await fetch("/api/admin/experiences", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingExperience.id, ...formState }),
        });
      } else {
        // Create new experience
        res = await fetch("/api/admin/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });
      }

      if (!res.ok) throw new Error(`Failed to ${editingExperience ? "update" : "create"} experience`);

      // Reset form
      setFormState({
        company: "",
        role: "",
        shortDesc: "",
        fullDesc: "",
        startDate: "",
        imageUrl: "",
        endDate: "",
        current: false,
        order: 0,
      });
      setEditingExperience(null);
      fetchExperiences(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Load an experience into the form for editing
  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormState({
      company: experience.company,
      role: experience.role,
      shortDesc: experience.shortDesc,
      fullDesc: experience.fullDesc || "",
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      imageUrl: "",
      current: experience.current,
      order: experience.order,
    });
  };

  // Delete an experience
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/experiences?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete experience");
      fetchExperiences(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading experiences...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Experiences</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg bg-gray-800">
        <h3 className="text-xl mb-4">{editingExperience ? "Edit Experience" : "Add New Experience"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300">Company</label>
            <input type="text" id="company" name="company" value={formState.company} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300">Role</label>
            <input type="text" id="role" name="role" value={formState.role} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">Start Date</label>
            <input type="text" id="startDate" name="startDate" value={formState.startDate} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">End Date</label>
            <input type="text" id="endDate" name="endDate" value={formState.endDate} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
           <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">Image URL</label>
           <input type="text" id="imageUrl" name="imageUrl" value={formState.imageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
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
            <input type="checkbox" id="current" name="current" checked={formState.current} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded" />
            <label htmlFor="current" className="ml-2 block text-sm text-gray-300">Currently Working Here</label>
          </div>
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-300">Order</label>
            <input type="number" id="order" name="order" value={formState.order} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {editingExperience ? "Update Experience" : "Add Experience"}
        </button>
        {editingExperience && (
          <button type="button" onClick={() => setEditingExperience(null)} className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel Edit
          </button>
        )}
      </form>

      <h3 className="text-xl mb-4">Existing Experiences</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Company</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Dates</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {experiences.map((exp) => (
              <tr key={exp.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{exp.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{exp.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{exp.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(exp)} className="text-indigo-400 hover:text-indigo-600 mr-4">Edit</button>
                  <button onClick={() => handleDelete(exp.id)} className="text-red-400 hover:text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}