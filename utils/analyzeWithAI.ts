const GEMINI_ENDPOINT = process.env.GEMINI_ENDPOINT!;
const AUTH_TOKEN = process.env.AUTH_TOKEN!;

export async function analyzeWithAI(
  jobDescription: string,
  cv: string
): Promise<string> {
  const prompt = `
    You are an expert HR analyst and career counselor. Analyze the following job description and CV to provide comprehensive insights.

    JOB DESCRIPTION:
    ${jobDescription}

    CANDIDATE CV:
    ${cv}

    Please provide a detailed analysis covering:

    ## Overall Match Assessment
    Rate the overall alignment between the candidate and job requirements (1-10 scale) and provide reasoning.

    ## Candidate Strengths
    List the candidate's key strengths that align well with the job requirements.

    ## Areas for Improvement
    Identify gaps or weaknesses in the candidate's profile relative to the job requirements.

    ## Specific Skill Analysis
    - Technical skills match
    - Soft skills alignment
    - Experience relevance

    ## Recommendations
    - For the candidate: How to improve their application or skills
    - For the employer: Key questions to ask during interview

    ## Red Flags (if any)
    Any concerning aspects that need attention.

    Please be specific, constructive, and professional in your analysis.
  `;

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        systemInstruction:
          "You are a professional HR analyst providing objective, constructive feedback on candidate-job alignment.",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API Error:", response.status, errorText);
      throw new Error(
        `AI analysis failed: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();

    if (
      result.candidates &&
      result.candidates[0] &&
      result.candidates[0].content
    ) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected AI response format");
    }
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze documents with AI");
  }
}
