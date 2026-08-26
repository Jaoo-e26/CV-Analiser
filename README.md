# AI Resume Analyzer

An AI-powered web app that reviews resumes and gives structured, actionable feedback — built as a hands-on portfolio project to practice integrating a modern React frontend with a generative AI API.

Upload a resume (PDF or plain text), optionally paste a job description, and get an instant breakdown of strengths, gaps, ATS keywords, and concrete suggestions for improvement.

**[Live demo](#)** · **[Report a bug](#)**

---

## Features

- **PDF or plain text input** — extracts resume text directly in the browser using `pdf.js`, no backend required
- **Job description comparison** — optionally paste a target job posting to get a tailored match analysis
- **Structured AI feedback** — strengths, gaps, ATS keyword suggestions, and rewrite tips, generated via the Gemini API
- **Markdown-rendered results** — AI responses are parsed and displayed with proper formatting, not raw text
- **Responsive, distinctive UI** — custom dark theme with editorial typography, built without a component library

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| AI | Google Gemini API (`gemini-2.5-flash`) |
| PDF parsing | pdf.js |
| Markdown rendering | react-markdown |
| Styling | Plain CSS (custom design system) |
| Deployment | Vercel |

## How It Works

1. The user pastes resume text or uploads a PDF, which is parsed client-side into plain text
2. An optional job description can be added for a comparative analysis
3. The app sends a structured prompt to the Gemini API, requesting a breakdown of strengths, gaps, keywords, and suggestions
4. The response is rendered as formatted Markdown inside the results panel

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Gemini API key](https://aistudio.google.com/apikey)

### Installation

```bash
git clone https://github.com/Jaoo-e26/Analiser.git
cd Analiser
npm install
```

Create a `.env` file in the project root:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Deployment

This project is deployed on [Vercel]([https://vercel.com](https://cvanalyzer-gray.vercel.app/)). To deploy your own instance:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add `VITE_GEMINI_API_KEY` as an environment variable in the project settings
4. Deploy

## Project Structure

```
src/
├── components/
│   └── ResumeForm.jsx      # Form for text/PDF input and job description
├── services/
│   ├── analyzeResume.js    # Gemini API integration
│   └── extractPdfText.js   # Client-side PDF text extraction
├── App.jsx                 # Main app logic and state
└── App.css                 # Design system and styling
```

## Security Notes

This is a portfolio/learning project. The Gemini API key is used directly from the client, which is acceptable for a personal demo but **not recommended for production**, since the key is exposed in network requests. A production version should proxy requests through a lightweight backend to keep the key server-side.

## Roadmap

- [ ] Backend proxy to secure the API key
- [ ] Analysis history (saved locally)
- [ ] Support for `.docx` resume uploads
- [ ] Export analysis as PDF

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built by [João](https://github.com/Jaoo-e26) as a portfolio project to practice React and AI API integration.
