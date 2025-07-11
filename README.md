# CV & Job Description Analyzer

An AI-powered Next.js application that analyzes CVs and job descriptions to provide insights on candidate-job alignment, strengths, weaknesses, and recommendations.

## Features

- 📄 **PDF Upload**: Upload job description and CV in PDF format
- 🤖 **AI Analysis**: Uses Gemini 1.5 Flash for intelligent document analysis
- 📊 **Comprehensive Insights**: Get detailed analysis including:
  - Overall match assessment (1-10 scale)
  - Candidate strengths and weaknesses
  - Skill alignment analysis
  - Actionable recommendations
  - Red flags identification
- 🎨 **Modern UI**: Clean, responsive interface built with shadcn/ui
- ⚡ **Type-Safe**: Full TypeScript support with tRPC for end-to-end type safety
- 🔧 **Developer Experience**: Hot reload, error handling, and comprehensive logging

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Backend**: tRPC, Next.js API Routes
- **UI**: shadcn/ui, Tailwind CSS, Lucide Icons
- **PDF Processing**: pdf-parse
- **AI**: Gemini 1.5 Flash API
- **State Management**: TanStack Query (React Query)

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Access to the Gemini API endpoint (provided in the assessment)

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd cv-job-analyzer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup**
   
   The application uses hardcoded API credentials as specified in the assessment. In a production environment, you would create a \`.env.local\` file:
   
   \`\`\`env
   GEMINI_ENDPOINT=https://intertest.woolf.engineering/invoke
   GEMINI_AUTH_TOKEN=your_token_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Basic Usage

1. **Upload Files**: Select your job description PDF and CV PDF using the file inputs
2. **Analyze**: Click the "Analyze Match" button to start the AI analysis
3. **Review Results**: View the comprehensive analysis including match score, strengths, weaknesses, and recommendations

### API Usage

The application exposes a tRPC API that can be used programmatically:

\`\`\`typescript
// Example tRPC client usage
const result = await trpc.pdf.analyze.mutate({
  jobDescription: base64JobDescriptionPDF,
  cv: base64CVPDF
})

console.log(result.analysis)
\`\`\`

## API Endpoints

### POST /api/trpc/pdf.analyze

Analyzes job description and CV PDFs.

**Request Body:**
\`\`\`json
{
  "jobDescription": "base64-encoded-pdf-data",
  "cv": "base64-encoded-pdf-data"
}
\`\`\`

**Response:**
\`\`\`json
{
  "analysis": "Detailed AI analysis text",
  "jobDescriptionLength": 1234,
  "cvLength": 5678
}
\`\`\`

## Development

### Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/trpc/          # tRPC API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # React Query & tRPC providers
├── components/ui/         # shadcn/ui components
├── lib/                   # Utility functions
│   └── trpc.ts           # tRPC client setup
├── server/               # tRPC server code
│   ├── routers/          # API route definitions
│   └── trpc.ts           # tRPC server setup
├── types/                # TypeScript type definitions
└── README.md
\`\`\`

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run type-check\` - Run TypeScript type checking

### Error Handling

The application includes comprehensive error handling:

- **File Validation**: Ensures only PDF files are uploaded
- **PDF Parsing**: Handles corrupted or invalid PDF files
- **AI API**: Manages API rate limits and network errors
- **User Feedback**: Clear error messages and loading states

### Rate Limiting

The Gemini API has the following limits:
- 20 requests/minute
- 300 requests/hour

The application handles these limits gracefully with appropriate error messages.

## Testing

### Manual Testing

1. **Valid PDFs**: Test with real job descriptions and CVs
2. **Invalid Files**: Try uploading non-PDF files
3. **Empty PDFs**: Test with PDFs that contain no extractable text
4. **Large Files**: Test with large PDF files
5. **Network Issues**: Test behavior when API is unavailable

### Test Cases

- ✅ Upload valid job description and CV PDFs
- ✅ Handle invalid file types
- ✅ Handle corrupted PDF files
- ✅ Handle API rate limiting
- ✅ Handle network errors
- ✅ Display loading states
- ✅ Format analysis results properly

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is created for assessment purposes.

## Support

For issues or questions:

1. Check the error messages in the browser console
2. Verify PDF files are valid and contain extractable text
3. Ensure network connectivity to the AI API
4. Check API rate limits haven't been exceeded

## Troubleshooting

### Common Issues

**"Failed to parse PDF file"**
- Ensure the PDF contains extractable text
- Try a different PDF file
- Check if the PDF is password protected

**"AI analysis failed"**
- Check network connectivity
- Verify API rate limits haven't been exceeded
- Try again after a few minutes

**"Could not extract text from PDF"**
- The PDF might be image-based without OCR
- Try a text-based PDF instead
- Ensure the PDF isn't corrupted
\`\`\`
