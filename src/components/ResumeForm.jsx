import { useState } from 'react';
import { extractPdfText } from '../services/extractPdfText';

function ResumeForm({ onAnalyze }) {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [fileName, setFileName] = useState('');
  const [extracting, setExtracting] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Por favor, envie um arquivo PDF.');
      return;
    }

    setFileName(file.name);
    setExtracting(true);
    try {
      const text = await extractPdfText(file);
      setResumeText(text);
    } catch (err) {
      alert('Não foi possível ler o PDF. Tente colar o texto manualmente.');
    } finally {
      setExtracting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      alert('Cole o texto do currículo ou envie um PDF antes de continuar.');
      return;
    }
    onAnalyze({ resumeText, jobText });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pdf-upload">Envie seu currículo em PDF (ou cole o texto abaixo)</label>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        {extracting && <p>Extraindo texto do PDF...</p>}
        {fileName && !extracting && <p>Arquivo carregado: {fileName}</p>}
      </div>

      <div>
        <label className="field-label" htmlFor="resume">Ou cole o texto do seu currículo</label>
        <textarea
          id="resume"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={10}
          placeholder="Cole aqui o conteúdo do seu currículo..."
        />
      </div>

      <div>
        <label className="field-label" htmlFor="job">Descrição da vaga (opcional)</label>
        <textarea
          id="job"
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          rows={6}
          placeholder="Cole aqui a vaga que você quer comparar (opcional)..."
        />
      </div>

      <button type="submit" disabled={extracting}>
        Analisar currículo
      </button>
    </form>
  );
}

export default ResumeForm;