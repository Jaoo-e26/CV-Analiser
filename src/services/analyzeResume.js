const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-flash-latest';

export async function analyzeResume({ resumeText, jobText }) {
  const prompt = jobText
    ? `Analise este currículo e compare com a vaga descrita. Aponte pontos fortes, pontos fracos e sugestões de melhoria.\n\nCurrículo:\n${resumeText}\n\nVaga:\n${jobText}`
    : `Analise este currículo. Aponte pontos fortes, pontos fracos e sugestões de melhoria.\n\nCurrículo:\n${resumeText}`;

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
    throw new Error('Falha ao chamar a API de IA');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}