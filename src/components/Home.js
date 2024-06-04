import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = ({ setSessionData }) => {
  const [jiraTicket, setJiraTicket] = useState('');
  const [desktopURL, setDesktopURL] = useState('');
  const [mobileURL, setMobileURL] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSessionData({ jiraTicket, desktopURL, mobileURL });
    navigate('/journey');
  };

  return (
    <Container>
      <h1>Game Journey Setup</h1>
      <UserInput id="user-input">
        <Form onSubmit={handleSubmit}>
          <UserInputGroup className="input-group">
            <p>
              <UserInputLabel>Jira Ticket:</UserInputLabel>
              <UserInputText type="text" value={jiraTicket} onChange={(e) => setJiraTicket(e.target.value)} required />
            </p>

          </UserInputGroup>
          <UserInputGroup className="input-group">
            <p>
              <UserInputLabel>Desktop URL:</UserInputLabel>
              <UserInputText type="url" value={desktopURL} onChange={(e) => setDesktopURL(e.target.value)} required />
            </p>

          </UserInputGroup>
          <UserInputGroup className="input-group">
            <p>
              <UserInputLabel>Mobile URL:</UserInputLabel>
              <UserInputText type="url" value={mobileURL} onChange={(e) => setMobileURL(e.target.value)} required />
            </p>

          </UserInputGroup>
          <Button type="submit">Start Journey</Button>
        </Form>

      </UserInput>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const UserInput = styled.section`
  padding: 1rem;
  width: 50vw;
  margin: 2rem auto;
  border-radius: 4px;
  background: linear-gradient(180deg, #307e6c, #2b996d);
`
const UserInputGroup = styled.div`
  display: flex;
  justify - content: space - evenly;
  gap: 1.5rem;
`

const UserInputLabel = styled.label`
  display: block;
  margin - bottom: 0.25rem;
  font - family: 'Roboto Condensed', sans - serif;
  font - size: 0.5rem;
  font - weight: bold;
  text - transform: uppercase;
`

const UserInputText = styled.input`
  width: 100 %;
  padding: 0.5rem;
  border: 1px solid #76c0ae;
  border - radius: 0.25rem;
  background - color: transparent;
  color: #c2e9e0;
  font - size: 1rem;
`


export default Home;
