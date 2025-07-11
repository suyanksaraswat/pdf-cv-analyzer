"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, FileText, CheckCircle, XCircle } from "lucide-react";
import { TRPCTest } from "@/components/trpc-test";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function HomePage() {
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(
    null
  );
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [error, setError] = useState<string>("");

  const analyzeMutation = trpc.pdf.analyze.useMutation({
    onSuccess: (data) => {
      setAnalysis(data.analysis);
      setError("");
    },
    onError: (error) => {
      setError(error.message);
      setAnalysis("");
    },
  });

  const handleFileChange = (file: File | null, type: "job" | "cv") => {
    if (file && file.type !== "application/pdf") {
      setError("Please select only PDF files");
      return;
    }

    if (type === "job") {
      setJobDescriptionFile(file);
    } else {
      setCvFile(file);
    }
    setError("");
  };

  const handleAnalyze = async () => {
    if (!jobDescriptionFile || !cvFile) {
      setError("Please select both PDF files");
      return;
    }

    try {
      const jobDescriptionBuffer = await jobDescriptionFile.arrayBuffer();
      const cvBuffer = await cvFile.arrayBuffer();

      analyzeMutation.mutate({
        jobDescription: Buffer.from(jobDescriptionBuffer).toString("base64"),
        cv: Buffer.from(cvBuffer).toString("base64"),
      });
    } catch (err) {
      setError("Error reading files. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            CV & Job Description Analyzer
          </h1>
          <p className="text-lg text-gray-600">
            Upload your CV and job description to get AI-powered insights
          </p>
        </div>

        {/* Add this for testing tRPC */}
        <div className="mb-8 flex justify-center">
          <TRPCTest />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Job Description
              </CardTitle>
              <CardDescription>Upload the job description PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="job-pdf">Select PDF file</Label>
                <Input
                  id="job-pdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] || null, "job")
                  }
                />
                {jobDescriptionFile && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    {jobDescriptionFile.name}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                CV/Resume
              </CardTitle>
              <CardDescription>Upload your CV or resume PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="cv-pdf">Select PDF file</Label>
                <Input
                  id="cv-pdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] || null, "cv")
                  }
                />
                {cvFile && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    {cvFile.name}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Button
            onClick={handleAnalyze}
            disabled={
              !jobDescriptionFile || !cvFile || analyzeMutation.isPending
            }
            size="lg"
            className="px-8"
          >
            {analyzeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Analyze Match
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert className="mb-6" variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                AI-powered insights on candidate-job alignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none space-y-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {analysis}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
