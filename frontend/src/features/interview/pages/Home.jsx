import React, { useEffect, useRef, useState } from 'react';
import '../styles/home.scss';
import { useInterview } from '../hooks/useinterview';
import { useNavigate } from 'react-router'

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5z" />
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

const WandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
    <path d="m14 7 3 3"></path>
    <path d="M5 6v4"></path>
    <path d="M19 14v4"></path>
    <path d="M10 2v2"></path>
    <path d="M7 8H3"></path>
    <path d="M21 16h-4"></path>
    <path d="M11 3H9"></path>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const Home = () => {
  const resumeInputRef = useRef(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);


  const { loading, generateReport, reports, getReports } = useInterview();
  const navigate = useNavigate()

  useEffect(() => {
    getReports();
  }, []);

  const handleResumeSelect = (file) => {
    if (!file) return;
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) return;
    setResumeFile(file);
  };

  const openFilePicker = () => {
    resumeInputRef.current?.click();
  };

  const handleCopyJobDescription = () => {
    if (jobDescription) {
      navigator.clipboard.writeText(jobDescription);
    }
  };

  const handleGenerateStrategy = async () => {
    const data = await generateReport({ jobDescription, selfDescription, resumeFile });

    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  if (loading) {
    return (
      <main> <h1>Loading Your Report...</h1></main>
    )
  }
  return (
    <div className="interview-home-container">
      <div className="page-header">
        <h1>Your AI-Powered <span className="highlight">Interview Assistant</span></h1>
        <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
      </div>

      <div className="panels-container">
        {/* Left Panel - Job Description */}
        <div className="panel left-panel">
          <div className="panel-header">
            <div className="icon-wrapper">
              <BriefcaseIcon />
            </div>
            <h2>Target Job Description</h2>
          </div>
          <div className="panel-content">
            <div className="textarea-container">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="job-description-textarea"
              />
              <button className="copy-btn" onClick={handleCopyJobDescription} aria-label="Copy">
                <ClipboardIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Profile */}
        <div className="panel right-panel">
          <div className="panel-header">
            <div className="icon-wrapper">
              <ProfileIcon />
            </div>
            <h2>Upload Resume</h2>
          </div>
          <div className="panel-content">
            {/* Upload Area */}
            <div
              className={`upload-area ${isDragging ? 'dragging' : ''} ${resumeFile ? 'has-file' : ''}`}
              onClick={openFilePicker}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleResumeSelect(e.dataTransfer.files[0]);
              }}
            >
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => handleResumeSelect(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <UploadIcon />
              <p className="upload-text">
                {resumeFile ? resumeFile.name : 'Click to upload or drag & drop'}
              </p>
              <p className="upload-hint">PDF only</p>
              <button className="upload-btn">
                {resumeFile ? 'Change Resume' : 'Upload Resume'}
              </button>
            </div>

            {/* Info Note */}
            <div className="info-note">
              <span>✨ Provide both for better results</span>
            </div>

            {/* Self Description */}
            <div className="self-description">
              <h3>Quick Self-Description</h3>
              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Self description..."
                className="self-description-textarea"
              />
            </div>

            {/* Generate Button */}
            <button
              className={`generate-btn ${isGenerating ? 'generating' : ''}`}
              onClick={handleGenerateStrategy}
              disabled={isGenerating}
            >
              <WandIcon />
              <span>{isGenerating ? 'Generating...' : 'Generate My Interview Strategy'}</span>
            </button>
          </div>
        </div>

        {/* Middle Panel - Visual Divider */}
        <div className="visual-divider">
          <hr />
        </div>

        <div className="previous-reports-section">
          <h2>Previous Reports</h2>
          <div className="reports-list">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report._id}
                  className="report-item"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <h3>{report.title || 'Untitled Report'}</h3>
                  <p className='report-meta'>Generated On {new Date(report.createdAt).toLocaleString()}</p>
                  <p className='match-score'>Match Score: {report.matchScore}%</p>
                </div>
              ))
            ) : (
              <p className="report-empty-state">No previous reports yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
