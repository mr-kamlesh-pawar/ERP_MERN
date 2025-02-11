import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, School, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

const StudentAccount = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    name: "",
    year: "",
    class1: "",
    department: "",
    section: "",
    batch: "",
    contactNumber: "",
    fatherName: "",
    motherName: "",
    fatherContactNumber: "",
    dob: "",
    gender: "",
    avatar: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch student profile data
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/profile", {
          withCredentials: true,
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };
    fetchStudentProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update student profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(
        "http://localhost:5000/api/student/profile",
        formData,
        {
          withCredentials: true,
        }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto shadow-lg border border-gray-200 rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            Student Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="gap-4 justify-start grid lg:grid-cols-5 md:grid-flow-col-4 grid-cols-2 lg:mb-2 mb-32">
              <TabsTrigger value="personal" className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap">
                <User className="w-5 h-5" />
                <span>Personal Info</span>
              </TabsTrigger>
              <TabsTrigger value="educational" className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap">
                <School className="w-5 h-5" />
                <span>Educational Info</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap">
                <Phone className="w-5 h-5" />
                <span>Contact Info</span>
              </TabsTrigger>
              <TabsTrigger value="family" className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap">
                <Calendar className="w-5 h-5" />
                <span>Family Info</span>
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap">
                <MapPin className="w-5 h-5" />
                <span>Other Info</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["userName", "email", "name", "dob", "gender"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <Input
                      id={field}
                      name={field}
                      type="text"
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4   text-white rounded-lg    transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="educational">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["year", "class1", "department", "section", "batch"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <Input
                      id={field}
                      name={field}
                      type="text"
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      disabled
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4   text-white rounded-lg    transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="contact">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["contactNumber"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <Input
                      id={field}
                      name={field}
                      type="text"
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4   text-white rounded-lg    transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="family">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["fatherName", "motherName", "fatherContactNumber"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <Input
                      id={field}
                      name={field}
                      type="text"
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4   text-white rounded-lg    transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="other">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["avatar"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <Input
                      id={field}
                      name={field}
                      type="text"
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4  text-white rounded-lg  transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAccount;