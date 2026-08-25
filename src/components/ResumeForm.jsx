import { useState } from 'react';

function ResumeForm({ onAnalyze }) {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      alert('Cole o texto do currículo antes de continuar.');
      return;
    }
    onAnalyze({ resumeText, jobText });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="resume">Cole o texto do seu currículo</label>
        <textarea
          id="resume"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={10}
          placeholder="Cole aqui o conteúdo do seu currículo..."
        />
      </div>

      <div>
        <label htmlFor="job">Descrição da vaga (opcional)</label>
        <textarea
          id="job"
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          rows={6}
          placeholder="Cole aqui a vaga que você quer comparar (opcional)..."
        />
      </div>

      <button type="submit">Analisar currículo</button>
    </form>
  );
}

export default ResumeForm; 