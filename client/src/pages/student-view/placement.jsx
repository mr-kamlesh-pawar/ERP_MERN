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
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Users, Briefcase, TrendingUp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Placements = () => {
  const data = {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Placement Statistics",
        data: [65, 59, 80, 81, 66, 75, 78],
        fill: false,
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
        tension: 0.4, // Smooth line curve
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
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove x-axis grid lines
        },
      },
      y: {
        grid: {
          color: "#E5E7EB", // Light gray grid lines for y-axis
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Placement Statistics</h1>
        <p className="text-gray-600">
          Explore the placement trends and achievements of our students over the years.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Total Students Placed</p>
              <p className="text-2xl font-bold text-gray-800">1,250+</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Briefcase className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Top Recruiters</p>
              <p className="text-2xl font-bold text-gray-800">50+</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Placement Rate</p>
              <p className="text-2xl font-bold text-gray-800">85%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <Card className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <TrendingUp className="mr-2 text-blue-600" size={24} />
            Placement Trends
          </h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200">
            View Details <ArrowUpRight className="ml-2" size={16} />
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[200px] md:w-3/4 lg:w-2/3 mx-auto">
            <Line data={data} options={options} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Placements;