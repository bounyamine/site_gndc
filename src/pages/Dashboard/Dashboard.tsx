import { Users, Calendar, Code, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Types
interface DashboardStats {
  totalUsers: number;
  activeProjects: number;
  upcomingEvents: number;
  totalPosts: number;
  activityData: Array<{
    date: string;
    users: number;
    projects: number;
    events: number;
  }>;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  extraInfo,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  extraInfo: string;
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Icon className="text-blue-600 w-8 h-8" />
    </div>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-gray-500">{extraInfo}</p>
  </div>
);

const ResourceCard = ({
  title,
  status,
  progress,
}: {
  title: string;
  status: string;
  progress: number;
}) => (
  <div className="p-4 border rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-medium">{title}</h4>
      <span className={`text-sm ${status === "En cours" ? "text-yellow-600" : status === "Complété" ? "text-green-600" : "text-blue-600"}`}>
        {status}
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${
          status === "En cours"
            ? "bg-yellow-600"
            : status === "Complété"
            ? "bg-green-600"
            : "bg-blue-600"
        }`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

const Dashboard = () => {
  const stats: DashboardStats = {
    totalUsers: 1000,
    activeProjects: 50,
    upcomingEvents: 8,
    totalPosts: 125,
    activityData: [
      { date: "2022-01-01", users: 100, projects: 10, events: 5 },
      { date: "2022-01-02", users: 120, projects: 12, events: 6 },
      { date: "2022-01-03", users: 150, projects: 15, events: 7 },
    ],
  };

  const recentActivity = [
    {
      title: "Nouveau projet lancé",
      description: "API GNDC - Backend Infrastructure",
      time: "Il y a 2 heures",
    },
    {
      title: "Événement programmé",
      description: "Djabbama Code - 23 Juin 2024",
      time: "Il y a 1 jour",
    },
    {
      title: "Mise à jour projet",
      description: "Site Web GNDC - v1.2.0",
      time: "Il y a 3 jours",
    },
  ];

  const resources = [
    { title: "Documentation API", status: "v1.0", progress: 75 },
    { title: "Guide des Contributeurs", status: "Complété", progress: 100 },
    { title: "Tutoriels", status: "En cours", progress: 50 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Tableau de Bord GNDC</h1>
          <p className="text-xl text-blue-100">Vue d'ensemble des activités de la communauté</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Membres" value={stats.totalUsers} icon={Users} extraInfo="+15% ce mois" />
          <StatCard title="Projets Actifs" value={stats.activeProjects} icon={Code} extraInfo={`${Math.floor(stats.activeProjects * 0.2)} en développement`} />
          <StatCard title="Événements" value={stats.upcomingEvents} icon={Calendar} extraInfo={`${stats.upcomingEvents} à venir`} />
          <StatCard title="Publications" value={stats.totalPosts} icon={TrendingUp} extraInfo="+5 cette semaine" />
        </div>

        {/* Charts and Activity */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Croissance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.activityData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#2563eb" name="Utilisateurs" />
                  <Line type="monotone" dataKey="projects" stroke="#059669" name="Projets" />
                  <Line type="monotone" dataKey="events" stroke="#d97706" name="Événements" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Activité Récente</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Ressources</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
