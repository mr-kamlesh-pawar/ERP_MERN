import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Eye,
  Cloud,
  TrendingUp,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FacultyDashboard = () => {
  const data = {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Placement Statistics",
        data: [65, 59, 80, 81, 56, 55, 58],
        fill: false,
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Placement Trends",
      },
    },
  };

  const stats = [
    { icon: <Users className="text-gray-400" />, label: "Total Students", value: "30K+", color: "text-blue-700" },
    { icon: <Eye className="text-gray-400" />, label: "Total Departments", value: "15+", color: "text-purple-700" },
    { icon: <Cloud className="text-gray-400" />, label: "Total Teachers", value: "100+", color: "text-green-600" },
    { icon: <TrendingUp className="text-gray-400" />, label: "Fees Collections", value: "500K+", color: "text-red-600" },
  ];

  const socialMedia = [
    { icon: <Facebook className="text-blue-600" />, name: "Facebook", description: "Connect with friends, share photos, and discover what's happening around the world." },
    { icon: <Linkedin className="text-blue-700" />, name: "LinkedIn", description: "Network with professionals, discover job opportunities, and build your career profile." },
    { icon: <Twitter className="text-blue-500" />, name: "Twitter", description: "Stay updated with real-time news, trends, and the voices of your favorite people." },
    { icon: <Instagram className="text-pink-500" />, name: "Instagram", description: "Share photos, explore trends, and connect with visual storytellers worldwide." },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="flex flex-col items-center p-6 bg-white shadow-md rounded-2xl text-center hover:scale-105 transition-transform">
            <div className="mb-4 text-3xl">{stat.icon}</div>
            <h2 className={`${stat.color} text-3xl font-bold`}>{stat.value}</h2>
            <p className="text-gray-500">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Graph Section */}
      <Card className="bg-white p-6 shadow-md rounded-2xl mb-8">
        <h2 className="text-xl font-bold mb-4 text-center">Placement Graph</h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[200px] md:w-3/4 lg:w-2/3 mx-auto">
            <Line data={data} options={options} />
          </div>
        </div>
      </Card>

      {/* Social Media Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialMedia.map((social, index) => (
          <Card key={index} className="flex flex-col items-center p-6 shadow-lg rounded-2xl text-center hover:scale-105 transition-transform">
            <div className="text-4xl mb-4">{social.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{social.name}</h2>
            <p className="text-sm text-gray-600">{social.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FacultyDashboard;
