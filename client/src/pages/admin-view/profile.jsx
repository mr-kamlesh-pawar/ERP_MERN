import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, School, Phone, MapPin, Calendar } from "lucide-react"; // Add lucide icons

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    department: "",
    dob: "",
    joiningYear: "",
    avatar: "",
    contactNumber: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user data from MongoDB
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/profile", {
          withCredentials: true, // Send cookies with the request
        });
        setFormData(response.data); // Populate formData with fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update user details in MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(
        "http://localhost:5000/api/admin/profile",
        formData,
        {
          withCredentials: true, // Send cookies with the request
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
            Admin Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className=" gap-4 justify-start grid lg:grid-cols-5 md:grid-flow-col-4 grid-cols-2 lg:mb-2 mb-32 ">
              <TabsTrigger
                value="account"
                icon={<User />}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap "
              >
                <User className="w-5 h-5" />
                <span>Personal Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="educational"
                icon={<School />}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap "
              >
                <School className="w-5 h-5" />
                <span>Educational Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                icon={<Phone />}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
              >
                <Phone className="w-5 h-5" />
                <span>Contact Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="work"
                icon={<Calendar />}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
              >
                <Calendar className="w-5 h-5" />
                <span>Work Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="address"
                icon={<MapPin />}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-100 hover:bg-blue-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
              >
                <MapPin className="w-5 h-5" />
                <span>Office Address</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["userName", "email",].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label
                      htmlFor={field}
                      className="text-sm font-medium text-gray-700 capitalize"
                    >
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <Input
                      id={field}
                      name={field}
                      type={"text"}
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4 text-white rounded-lg transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </TabsContent>

            <TabsContent value="educational">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["department"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label
                      htmlFor={field}
                      className="text-sm font-medium text-gray-700 capitalize"
                    >
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
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4 text-white rounded-lg transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </TabsContent>

            <TabsContent value="contact">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["contactNumber"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label
                      htmlFor={field}
                      className="text-sm font-medium text-gray-700 capitalize"
                    >
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
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4 text-white rounded-lg transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </TabsContent>

            <TabsContent value="work">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["joiningYear"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label
                      htmlFor={field}
                      className="text-sm font-medium text-gray-700 capitalize"
                    >
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
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4 text-white rounded-lg transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </TabsContent>

            <TabsContent value="address">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["dob"].map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <label
                      htmlFor={field}
                      className="text-sm font-medium text-gray-700 capitalize"
                    >
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
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4 text-white rounded-lg transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;