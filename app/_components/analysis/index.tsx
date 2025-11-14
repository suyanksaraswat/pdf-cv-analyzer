"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  analysis: string;
}

export default function Analysis({ analysis }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>
          AI-powered insights on candidate-job alignment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none space-y-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
