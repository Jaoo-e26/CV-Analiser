const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const MAX_RETRIES = 3;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = new Error(`Falha na API: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function analyzeResume({ resumeText, jobText }) {
  const prompt = jobText
    ? `Analise este currículo e compare com a vaga descrita. Aponte pontos fortes, pontos fracos e sugestões de melhoria.\n\nCurrículo:\n${resumeText}\n\nVaga:\n${jobText}`
    : `Analise este currículo. Aponte pontos fortes, pontos fracos e sugestões de melhoria.\n\nCurrículo:\n${resumeText}`;

  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGemini(prompt);
    } catch (err) {
      lastError = err;

      const isRetryable = err.status === 503 || err.status === 429;
      const isLastAttempt = attempt === MAX_RETRIES;

      if (!isRetryable || isLastAttempt) {
        throw err;
      }

      const waitTime = attempt * 1500;
      console.warn(`Tentativa ${attempt} falhou (${err.status}), tentando de novo em ${waitTime}ms...`);
      await