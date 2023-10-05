import React from 'react';

const OnlinePdfViewer = ({ pdfUrl }) => {
    return (
        <div className="container my-4 ">
            <div className="embed-responsive embed-responsive-4by3">
                <iframe
                    className="embed-responsive-item"
                    src={pdfUrl}
                    title="PDF Viewer"
                    frameBorder="0"
                    width="100%"
                    height="600px"
                ></iframe>
            </div>
        </div>
    );
};

export default OnlinePdfViewer;
