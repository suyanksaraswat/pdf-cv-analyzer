import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { extractTextFromPDF } from "@/utils/extractTextFromPDF";
import { analyzeWithAI } from "@/utils/analyzeWithAI";

export const pdfRouter = router({
  // Simple test endpoint
  test: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      return { success: true, echo: input.message };
    }),

  // Simplified analyze endpoint for testing
  analyze: publicProcedure
    .input(
      z.object({
        jobDescription: z.string().min(1, "Job description PDF is required"),
        cv: z.string().min(1, "CV PDF is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Extract text from PDFs
        const jobDescriptionText = await extractTextFromPDF(
          input.jobDescription
        );
        const cvText = await extractTextFromPDF(input.cv);

        // Validate extracted text
        if (!jobDescriptionText.trim()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Could not extract text from job description PDF",
          });
        }

        if (!cvText.trim()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Could not extract text from CV PDF",
          });
        }

        // Analyze with AI
        const analysis = await analyzeWithAI(jobDescriptionText, cvText);

        return {
          analysis,
          jobDescriptionLength: jobDescriptionText.length,
          cvLength: cvText.length,
        };
      } catch (error) {
        console.error("PDF Analysis Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during analysis",
        });
      }
    }),
});
