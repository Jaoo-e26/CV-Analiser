import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractPdfText(file) {
  console.log('Iniciando leitura do PDF:', file.name);

  const arrayBuffer = await file.arrayBuffer();
  console.log('Arquivo convertido para arrayBuffer');

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  console.log('PDF carregado, páginas:', pdf.numPages);

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  console.log('Texto extraído, tamanho:', fullText.length);
  return fullText.trim();
}