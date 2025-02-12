import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, CheckCircle, Award, AlertCircle, Frown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const StudentTestResults = () => {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/student-tests", {
          withCredentials: true,
        });
        setTests(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-[300px] h-[200px] rounded-lg" />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8 text-gray-800">
          <BookOpen className="inline-block mr-2" size={32} />
          Test Results
        </h2>

        {tests.length === 0 ? (
          <div className="text-center py-12">
            <Frown className="inline-block mb-4 text-yellow-600" size={48} />
            <p className="text-xl text-gray-700 font-semibold">No tests found.</p>
            <p className="text-gray-500 mt-2">It looks like no tests have been assigned to you yet.</p>
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
              Refresh Page
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tests.map((test, index) => (
              <Card
                key={index}
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {test.testTitle}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Test Details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-700">
                    <Award className="inline-block mr-2 text-blue-600" size={16} />
                    Total Marks: {test.totalMarks}
                  </p>
                  <p className="text-gray-600">
                    <CheckCircle className="inline-block mr-2 text-green-600" size={16} />
                    Subject: {test.subject}
                  </p>
                  <p className="text-gray-600">Year: {test.year}</p>
                  <p className="text-gray-600">Class: {test.class}</p>
                  <p className="text-gray-600">Department: {test.department}</p>
                  {test.resultDeclared ? (
                    <p className="font-semibold mt-4 text-gray-800">
                      Marks Obtained: {test.marksObtained} / {test.totalMarks}
                    </p>
                  ) : (
                    <p className="text-yellow-600 font-semibold mt-4">
                      <AlertCircle className="inline-block mr-2" size={16} />
                      Result Not Declared
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTestResults;