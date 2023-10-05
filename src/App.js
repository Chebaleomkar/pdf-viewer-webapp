import React, { useState } from 'react';
import './App.css';
import PdfViewer from './components/PdfViewer';
import OnlinePdfViewer from './components/OnlinePdfViewer';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtensionError, setFileExtensionError] = useState(null);
  const [urlPdf, setPdfUrl] = useState('');
  const [urlPdfError, setUrlPdfError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();

      if (fileExtension === 'pdf') {
        setFileExtensionError(false);
        setSelectedFile(file);
      } else {
        setFileExtensionError(true);
        setSelectedFile(null);
      }
    }
  };

  const handleUrlPdf = (e) => {
    const url = e.target.value;
    setPdfUrl(url);
    setUrlPdfError(false);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPdfUrl('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="pdfinput" className=' h5'>Select a PDF file</label>
            <input
              type="file"
              id="pdfinput"
              className="form-control-file mx-3 h5"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <br /> <br />
            <label htmlFor="pdfurl">Paste any PDF link</label>
            <input
              type="url"
              className={`form-control mx-3 my-4 ${urlPdfError ? 'is-invalid' : ''}`}
              id="pdfurl"
              value={urlPdf}
              onChange={handleUrlPdf}
            />
            {urlPdfError && (
              <div className="invalid-feedback">
                Please enter a valid PDF URL.
              </div>
            )}
          </div>
          {fileExtensionError && (
            <div className="alert alert-danger" role="alert">
              Invalid file. Only PDF files are allowed.
            </div>
          )}
          {(selectedFile && !fileExtensionError || urlPdf && !urlPdfError) && (
            <div>
              <button
                className="btn btn-danger mb-3 my-4"
                onClick={handleClose}
              >
                Close PDF
              </button>
              <PdfViewer pdf={selectedFile} />
            </div>
          )}
          {urlPdf && !urlPdfError && <OnlinePdfViewer pdfUrl={urlPdf} />}
        </div>
      </div>
    </div>
  );
}

export default App;
