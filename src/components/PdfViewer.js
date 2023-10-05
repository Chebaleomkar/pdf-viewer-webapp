
import React, { useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const divRef = useRef();

  const onDocumentSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber((prevState) => prevState + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevState) => prevState - 1);
    }
  };

  return (
    <div className="container mt-3"  >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button
                className={`btn btn-sm ${pageNumber > 1 ? 'btn-primary' : 'btn-secondary'}`}
                onClick={handlePreviousPage}
                disabled={pageNumber === 1}
              >
                <ArrowBackIosIcon />
              </button>
            </div>
            <div>
              <span className="mr-2">
                Page {pageNumber} of {numPages}
              </span>
            </div>
            <div>
              <button
                className={`btn btn-sm ${pageNumber < numPages ? 'btn-primary' : 'btn-secondary'}`}
                onClick={handleNextPage}
                disabled={pageNumber === numPages}
              >
                <ArrowForwardIosIcon />
              </button>
            </div>
          </div>

          <div className="mt-3">
            <Document file={pdf} onLoadSuccess={onDocumentSuccess}>
              <Page
                pageNumber={pageNumber}
                width={divRef.current?.clientWidth * 0.95}
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
