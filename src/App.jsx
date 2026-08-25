import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ResumeForm from './components/ResumeForm';
import { analyzeResume } from './services/analyzeResume';
import './App.css';

function App() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (data) => {
    setLoading(true);
    setResult('');
    try {
      const analysis = await analyzeResume(data);
      setResult(analysis);
    } catch (err) {
      setResult('Ocorreu um erro ao analisar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <p className="eyebrow">// Triagem automatizada de currículo</p>
      <h1>Analisador de Currículo</h1>
      <ResumeForm onAnalyze={handleAnalyze} />
      {loading && <p className="loading">Lendo e analisando o currículo...</p>}
      {result && (
        <div className="result-card">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;