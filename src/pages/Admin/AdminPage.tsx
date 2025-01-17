import { useState } from "react";
import { Users, Calendar, Settings, User } from "lucide-react";

// Properly import individual shadcn/ui components
import ProjectsManagement from "./ProjectsManagement";
import UsersManagement from "./UsersManagement";
import LeadersManagement from "./LeadersManagement";
import EventsManagement from "./EventsManagement";

// Sidebar Component
const Sidebar = ({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) => {
    const menuItems = [
        { name: "Utilisateurs", icon: <Users className="h-5 w-5" />, key: "users" },
        { name: "Leaders", icon: <User className="h-5 w-5" />, key: "leaders" },
        { name: "Événements", icon: <Calendar className="h-5 w-5" />, key: "events" },
        { name: "Projets", icon: <Settings className="h-5 w-5" />, key: "projects" },
    ];

    return (
        <div className="bg-blue-900 text-white w-64 min-h-screen py-6">
            <h2 className="text-2xl font-bold px-6 mb-8">Admin GNDC</h2>
            <nav>
                {menuItems.map((item) => (
                    <button
                        key={item.key}
                        className={`flex items-center px-6 py-3 w-full text-left transition-colors
                            hover:bg-blue-800 ${currentPage === item.key ? "bg-blue-800" : ""}`}
                        onClick={() => setCurrentPage(item.key)}
                    >
                        {item.icon}
                        <span className="ml-4">{item.name}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

// Main Admin Page
const AdminPage = () => {
    const [currentPage, setCurrentPage] = useState("users");

    return (
        <div className="flex min-h-screen">
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-1 bg-gray-50">
                {currentPage === "users" && <UsersManagement />}
                {currentPage === "leaders" && <LeadersManagement />}
                {currentPage === "events" && <EventsManagement />}
                {currentPage === "projects" && <ProjectsManagement />}
            </main>
        </div>
    );
};

export default AdminPage;