import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Journey = ({ sessionData, timers, setTimers }) => {
    const navigate = useNavigate();
    const [currentStage, setCurrentStage] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const stages = [
        { label: 'Portrait', url: sessionData.mobileURL, width: 720, height: 1280 },
        { label: 'Landscape', url: sessionData.mobileURL, width: 1280, height: 720 },
        { label: 'Desktop', url: sessionData.desktopURL, width: 1920, height: 1080 },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 1000);

        return () => clearInterval(timer);
    }, [startTime]);

    useEffect(() => {
        if (currentStage > 0) {
            const stageLabel = stages[currentStage - 1].label.toLowerCase();
            setTimers((prevTimers) => ({
                ...prevTimers,
                [stageLabel]: prevTimers[stageLabel] + elapsedTime,
            }));
            setElapsedTime(0);
            setStartTime(Date.now());
        }
    }, [currentStage]);

    const handleNextStage = () => {
        if (currentStage < stages.length - 1) {
            setCurrentStage(currentStage + 1);
        } else {
            const stageLabel = stages[currentStage].label.toLowerCase();
            setTimers((prevTimers) => ({
                ...prevTimers,
                [stageLabel]: prevTimers[stageLabel] + elapsedTime,
            }));
            setIsFinished(true);
        }
    };

    const formatTime = (seconds) => {
        debugger
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes > 0 ? minutes + ' min ' : ''}${remainingSeconds} sec`;
    };

    const handlePublish = async () => {
        const data = {
            jiraTicket: sessionData.jiraTicket,
            desktopURL: sessionData.desktopURL,
            mobileURL: sessionData.mobileURL,
            timers
        };

        try {
            const response = await fetch('YOUR_JIRA_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa('YOUR_JIRA_USERNAME:YOUR_JIRA_API_TOKEN')}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to publish data');
            }

            alert('Data published successfully!');
            navigate('/'); // Redirect to home after publishing
        } catch (error) {
            console.error('Error publishing data:', error);
            alert('Failed to publish data. Please try again.');
        }
    };

    return (
        <Container>
            <Breadcrumb>
                {stages.map((stage, index) => (
                    <BreadcrumbItem key={index} active={index <= currentStage}>
                        {stage.label}
                    </BreadcrumbItem>
                ))}
                {isFinished && <BreadcrumbItem active>Report</BreadcrumbItem>}
            </Breadcrumb>
            {!isFinished ? (
                <Stage>
                    <iframe
                        title="Game"
                        src={stages[currentStage].url}
                        style={{
                            width: `${stages[currentStage].width}px`,
                            height: `${stages[currentStage].height}px`,
                            border: 'none',
                        }}
                    />
                    <Timer>
                        Time spent: {formatTime(+(elapsedTime / 1000).toFixed(0))}
                    </Timer>
                    <Button onClick={handleNextStage}>
                        {currentStage < stages.length - 1 ? 'Next' : 'Finish'}
                    </Button>
                </Stage>
            ) : (
                <Report>
                    <h2>Report</h2>
                    <ReportItem>Jira Ticket: {sessionData.jiraTicket}</ReportItem>
                    <ReportItem>Desktop URL: {sessionData.desktopURL}</ReportItem>
                    <ReportItem>Mobile URL: {sessionData.mobileURL}</ReportItem>
                    <ReportItem>Time in Portrait: {(timers.portrait / 1000).toFixed(1)} seconds</ReportItem>
                    <ReportItem>Time in Landscape: {(timers.landscape / 1000).toFixed(1)} seconds</ReportItem>
                    <ReportItem>Time on Desktop: {(timers.desktop / 1000).toFixed(1)} seconds</ReportItem>
                    <Button onClick={handlePublish}>Publish</Button>
                </Report>
            )}
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Breadcrumb = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const BreadcrumbItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.active ? '#007bff' : '#e0e0e0')};
  color: white;
  margin-right: 0.5rem;
  border-radius: 4px;
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const Report = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportItem = styled.div`
  margin: 0.5rem 0;
`;

export default Journey;
