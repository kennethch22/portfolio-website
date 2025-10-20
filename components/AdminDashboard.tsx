"use client";

import React, { useState } from "react";
import ExperiencesTab from "./admin/ExperiencesTab";
import SkillsTab from "./admin/SkillsTab";
import ProjectsTab from "./admin/ProjectsTab";
import OrganizationsTab from "./admin/OrganizationsTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("experiences");

  const tabs = [
    { id: "experiences", label: "Experiences", component: ExperiencesTab },
    { id: "skills", label: "Skills", component: SkillsTab },
    { id: "projects", label: "Projects", component: ProjectsTab },
    { id: "organizations", label: "Organizations", component: OrganizationsTab },
  ];

  const activeTabComponent = tabs.find((tab) => tab.id === activeTab)?.component;
  const ActiveComponent = activeTabComponent;

  return (
    <div>
      <div className="flex space-x-4 mb-6 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-indigo-500 text-indigo-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}