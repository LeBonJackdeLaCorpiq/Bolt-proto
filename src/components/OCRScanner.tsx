import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Loader, X, AlertTriangle, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface OCRScannerProps {
  onResult: (result: {
    text: string;
    amount?: number;
    date?: string;
    description?: string;
  }) => void;
  onClose: () => void;
}

export default function OCRScanner({ onResult, onClose }: OCRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize PDF.js with bundled worker
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Erreur lors de l\'accès à la caméra:', errorMessage);
      setError('Impossible d\'accéder à la caméra. Veuillez vérifier les permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        try {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0);
          const imageUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
          setPreviewUrl(imageUrl);
          stopCamera();
          processImage(imageUrl);
          setError(null);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
          console.error('Erreur lors de la capture:', errorMessage);
          setError('Erreur lors de la capture de l\'image.');
        }
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Le fichier est trop volumineux. Maximum 10MB.');
        return;
      }

      if (file.type === 'application/pdf') {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          setPdfDocument(pdf);
          setTotalPages(pdf.numPages);
          setCurrentPage(1);
          setIsPdf(true);
          await renderPdfPage(pdf, 1);
          setError(null);
        } catch (err) {
          console.error('Erreur lors du chargement du PDF:', err);
          setError('Erreur lors du chargement du PDF. Veuillez réessayer.');
        }
      } else {
        // Traitement des images
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          setPreviewUrl(imageUrl);
          setIsPdf(false);
          processImage(imageUrl);
          setError(null);
        };
        reader.onerror = (err) => {
          const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
          console.error('Erreur lors de la lecture du fichier:', errorMessage);
          setError('Erreur lors de la lecture du fichier.');
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const renderPdfPage = async (pdf: any, pageNumber: number) => {
    try {
      const page = await pdf.getPage(pageNumber);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
        const imageUrl = canvas.toDataURL('image/jpeg', 0.8);
        setPreviewUrl(imageUrl);
        processImage(imageUrl);
      }
    } catch (err) {
      console.error('Erreur lors du rendu de la page PDF:', err);
      setError('Erreur lors du rendu de la page PDF.');
    }
  };

  const changePdfPage = async (delta: number) => {
    if (pdfDocument) {
      const newPage = currentPage + delta;
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        await renderPdfPage(pdfDocument, newPage);
      }
    }
  };

  const processImage = async (imageUrl: string) => {
    setIsScanning(true);
    setError(null);

    try {
      // Créer une image pour vérifier qu'elle est valide
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Image invalide'));
      });

      const worker = await createWorker('fra');
      const result = await worker.recognize(imageUrl);
      await worker.terminate();

      if (!result.data.text) {
        throw new Error('Aucun texte détecté dans l\'image');
      }

      // Analyse du texte pour extraire les informations pertinentes
      const text = result.data.text;
      const extractedData = {
        text,
        amount: extractAmount(text),
        date: extractDate(text),
        description: extractDescription(text)
      };

      if (!extractedData.amount && !extractedData.date && !extractedData.description) {
        throw new Error('Aucune information pertinente n\'a pu être extraite de l\'image');
      }

      onResult(extractedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('Erreur lors de la reconnaissance OCR:', errorMessage);
      setError('Une erreur est survenue lors de la reconnaissance du texte. Veuillez réessayer avec une autre image.');
      setPreviewUrl(null);
    } finally {
      setIsScanning(false);
    }
  };

  const extractAmount = (text: string): number | undefined => {
    // Recherche des montants avec le format monétaire
    const amountRegex = /(\d+[.,]\d{2})\s*(?:\$|EUR|CAD|€)?/g;
    const matches = text.match(amountRegex);
    if (matches) {
      // Prendre le premier montant trouvé
      const amount = matches[0].replace(',', '.').replace(/[^\d.]/g, '');
      return parseFloat(amount);
    }
    return undefined;
  };

  const extractDate = (text: string): string | undefined => {
    // Recherche des dates dans différents formats
    const dateRegex = /(\d{2}[-/.]\d{2}[-/.]\d{4}|\d{4}[-/.]\d{2}[-/.]\d{2})/g;
    const matches = text.match(dateRegex);
    if (matches) {
      return matches[0];
    }
    return undefined;
  };

  const extractDescription = (text: string): string | undefined => {
    // Prendre les premières lignes non vides comme description
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      return lines[0].trim();
    }
    return undefined;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold dark:text-white">Scanner un document</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={20} className="dark:text-white" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              <p className="flex items-center gap-2">
                <AlertTriangle size={20} />
                <span>{error}</span>
              </p>
            </div>
          )}

          {isScanning ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader size={40} className="animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Analyse du document en cours...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {isCameraActive ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                  />
                  <button
                    onClick={captureImage}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  >
                    Capturer
                  </button>
                </div>
              ) : previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setPreviewUrl(null);
                      setIsPdf(false);
                      setPdfDocument(null);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
                  >
                    <X size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  {isPdf && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
                      <button
                        onClick={() => changePdfPage(-1)}
                        disabled={currentPage <= 1}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full disabled:opacity-50"
                      >
                        <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
                      </button>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Page {currentPage} sur {totalPages}
                      </span>
                      <button
                        onClick={() => changePdfPage(1)}
                        disabled={currentPage >= totalPages}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full disabled:opacity-50"
                      >
                        <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={startCamera}
                    className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Camera size={24} className="text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Utiliser la caméra</span>
                  </button>

                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <Upload size={24} className="text-gray-400" />
                        <FileText size={24} className="text-gray-400" />
                      </div>
                      <div className="text-center">
                        <span className="text-gray-600 dark:text-gray-400 block">
                          Charger une image ou un PDF
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          JPG, PNG, PDF jusqu'à 10MB
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}