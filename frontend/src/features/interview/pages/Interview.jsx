import React, { useState, useEffect } from 'react';
import '../styles/interview.scss';
import { useInterview } from '../hooks/useinterview';
import { useParams } from 'react-router';
// import { generateResumePdf } from '../hooks/useinterview';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
  </svg>
);

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);


const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [expandedItems, setExpandedItems] = useState({});
  const { loading, report, getReportById, getResumePdf } = useInterview();
  const {interviewId} = useParams();

  useEffect(()=>{
    if(interviewId) {
      getReportById(interviewId)
    }
  },[interviewId])

  const toggleExpand = (type, index) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${type}-${index}`]: !prev[`${type}-${index}`]
    }));
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'low':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'high':
        return '#ef4444';
      default:
        return '#10b981';
    }
  };

  if (loading || !report) {
    return (
      <main><h1>Loading Interview Analysis...</h1></main>
    )
  }

  const data = report;

  return (
    <div className="results-container">
      {/* Header */}
      <div className="results-header">
        <h1>Your Interview <span className="highlight">Analysis</span></h1>
        <p>Personalized insights and preparation strategy based on your profile</p>
      </div>

      {/* Score Card */}
      <div className="score-card">
        <div className="score-ring">
          <div className="score-circle">
            <span className="score-number">{data.matchScore}</span>
            <span className="score-label">Match Score</span>
          </div>
        </div>
        <div className="score-description">
          <h3>Overall Profile Match</h3>
          <p>Your profile shows {data.matchScore}% alignment with the job requirements. Focus on the identified skill gaps to improve your chances. You have strong technical fundamentals but need to enhance your cloud and containerization skills.</p>
        </div>
      </div>

      <div className="results-grid">
        {/* Skill Gaps Section */}
        <div className="skill-gaps-card">
          <div className="card-header">
            <h3>Skill Gaps</h3>
            <WarningIcon />
          </div>
          <div className="scrollable-content hide-scrollbar">
            {data.skillGaps.map((gap, index) => (
              <div key={index} className="skill-gap-item">
                <div className="skill-info">
                  <span className="skill-name">{gap.skills}</span>
                  <span className="skill-severity" style={{ backgroundColor: getSeverityColor(gap.severity) }}>
                    {gap.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className='button generate-btn' 
            onClick={()=>{
              getResumePdf(interviewId)
            }}
          >
           <svg height={"0.8rem"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path>
           </svg>
            Download AI Resume
          </button>
        </div>

        {/* Questions Section with Tabs */}
        <div className="questions-card">
          <div className="card-header">
            <h3>Interview Questions</h3>
            <div className="tabs">
              <button 
                className={`tab-btn ${activeTab === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveTab('technical')}
              >
                Technical
              </button>
              <button 
                className={`tab-btn ${activeTab === 'behavioral' ? 'active' : ''}`}
                onClick={() => setActiveTab('behavioral')}
              >
                Behavioral
              </button>
            </div>
          </div>
          <div className="scrollable-content hide-scrollbar">
            {activeTab === 'technical' ? (
              <div className="questions-list">
                {data.technicalQuestions.map((item, index) => (
                  <div key={index} className="question-item">
                    <div 
                      className="question-header"
                      onClick={() => toggleExpand('tech', index)}
                    >
                      <p className="question-text">{item.question}</p>
                      <button className="expand-btn">
                        {expandedItems[`tech-${index}`] ? '−' : '+'}
                      </button>
                    </div>
                    <div className={`question-details ${expandedItems[`tech-${index}`] ? 'expanded' : ''}`}>
                      <div className="intention">
                        <InfoIcon />
                        <span>{item.intention}</span>
                      </div>
                      <div className="answer">
                        <strong>Suggested Answer:</strong>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="questions-list">
                {data.behavioralQuestions.map((item, index) => (
                  <div key={index} className="question-item">
                    <div 
                      className="question-header"
                      onClick={() => toggleExpand('behave', index)}
                    >
                      <p className="question-text">{item.question}</p>
                      <button className="expand-btn">
                        {expandedItems[`behave-${index}`] ? '−' : '+'}
                      </button>
                    </div>
                    <div className={`question-details ${expandedItems[`behave-${index}`] ? 'expanded' : ''}`}>
                      <div className="intention">
                        <InfoIcon />
                        <span>{item.intention}</span>
                      </div>
                      <div className="answer">
                        <strong>Suggested Answer:</strong>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preparation Plan Section */}
        <div className="preparation-card">
          <div className="card-header">
            <h3>Preparation Plan</h3>
            <CheckIcon />
          </div>
          <div className="scrollable-content hide-scrollbar">
            {data.preparationPlan.map((plan, index) => (
              <div key={index} className="plan-item">
                <div className="plan-day">
                  <span className="day-number">Day {plan.day}</span>
                </div>
                <div className="plan-content">
                  <p className="plan-focus">{plan.focus}</p>
                  <ul className="plan-tasks">
                    {plan.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
