import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, File, Loader2, XCircle, CheckCircle2 } from "lucide-react";
import axios from "axios";

const FeeStructure = () => {
  const [feeStructures, setFeeStructures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // For upload progress
  const { toast } = useToast();

  // Fetch fee structures
  useEffect(() => {
    fetchFeeStructures();
  }, []);

  const fetchFeeStructures = async () => {
    try {
      const response = await axios.get("https://rmd-erp-server.vercel.app/api/faculty/get-fees", {
        withCredentials: true,
      });
      setFeeStructures(response.data);
    } catch (error) {
      console.error("Error fetching fee structures:", error);
      toast({
        title: "Error",
        description: "Failed to fetch fee structures.",
        variant: "destructive",
      });
    }
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !batch || !year) {
      toast({
        title: "Error",
        description: "Please fill all fields and select a file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("batch", batch);
    formData.append("year", year);

    try {
      setIsUploading(true); // Start upload progress
      const response = await axios.post("https://rmd-erp-server.vercel.app/api/faculty/upload-fees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast({
        title: "Success",
        description: "Fee structure uploaded successfully!",
        variant: "default",
      });

      fetchFeeStructures();
      setIsModalOpen(false);
      setBatch("");
      setYear("");
      setFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading fee structure.",
        variant: "destructive",
      });
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false); // End upload progress
    }
  };

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Fee Structures</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsModalOpen(true)} className="mb-4">
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Fee Structure
          </Button>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>File</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructures.map((fee) => (
                <TableRow key={fee._id}>
                  <TableCell>{fee.department}</TableCell>
                  <TableCell>{fee.batch}</TableCell>
                  <TableCell>{fee.year}</TableCell>
                  <TableCell>
                    <a
                      href={fee.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <File className="mr-2 h-4 w-4" /> View File
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl">Upload Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="batch">Batch</Label>
                    <Input
                      id="batch"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      required
                      placeholder="Enter Batch"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="file">File</Label>
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <label htmlFor="file" className="cursor-pointer">
                        {file ? (
                          <div className="flex items-center space-x-2">
                            <File className="h-6 w-6" />
                            <span>{file.name}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-2">
                            <UploadCloud className="h-8 w-8 text-gray-500" />
                            <span className="text-sm text-gray-500">Click to upload a file</span>
                          </div>
                        )}
                      </label>
                      <Input
                        id="file"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isUploading}>
                      {isUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <UploadCloud className="mr-2 h-4 w-4" />
                      )}
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FeeStructure;