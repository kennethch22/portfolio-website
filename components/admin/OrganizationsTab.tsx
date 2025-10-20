"use client";

import React, { useState, useEffect } from "react";
import { Organisation } from "@prisma/client";

export default function OrganizationsTab() {
  const [organizations, setOrganizations] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOrg, setEditingOrg] = useState<Organisation | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    role: "",
    shortDesc: "",
    fullDesc: "",
    startDate: "",
    endDate: "",
    current: false,
    imageUrl: "",
    order: 0,
  });

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/organizations");
      if (!res.ok) throw new Error("Failed to fetch organizations");
      const data = await res.json();
      setOrganizations(data);
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
    e.preventDefault();
    setError(null);
    try {
      let res;
      if (editingOrg) {
        res = await fetch("/api/admin/organizations", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingOrg.id, ...formState }),
        });
      } else {
        res = await fetch("/api/admin/organizations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });
      }

      if (!res.ok) throw new Error(`Failed to ${editingOrg ? "update" : "create"} organization`);

      setFormState({
        name: "",
        role: "",
        shortDesc: "",
        fullDesc: "",
        startDate: "",
        endDate: "",
        current: false,
        imageUrl: "",
        order: 0,
      });
      setEditingOrg(null);
      fetchOrganizations();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (org: Organisation) => {
    setEditingOrg(org);
    setFormState({
      name: org.name,
      role: org.role,
      shortDesc: org.shortDesc,
      fullDesc: org.fullDesc || "",
      startDate: org.startDate,
      endDate: org.endDate || "",
      current: org.current,
      imageUrl: org.imageUrl || "",
      order: org.order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this organization?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/organizations?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete organization");
      fetchOrganizations();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading organizations...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Organizations</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg bg-gray-800">
        <h3 className="text-xl mb-4">{editingOrg ? "Edit Organization" : "Add New Organization"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Organization Name</label>
            <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300">Your Role</label>
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
            <label htmlFor="current" className="ml-2 block text-sm text-gray-300">Currently Involved</label>
          </div>
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-300">Order</label>
            <input type="number" id="order" name="order" value={formState.order} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {editingOrg ? "Update Organization" : "Add Organization"}
        </button>
        {editingOrg && (
          <button type="button" onClick={() => setEditingOrg(null)} className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel Edit
          </button>
        )}
      </form>

      <h3 className="text-xl mb-4">Existing Organizations</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Organization</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Dates</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {organizations.map((org) => (
              <tr key={org.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{org.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{org.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{org.startDate} - {org.current ? "Present" : org.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{org.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(org)} className="text-indigo-400 hover:text-indigo-600 mr-4">Edit</button>
                  <button onClick={() => handleDelete(org.id)} className="text-red-400 hover:text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}