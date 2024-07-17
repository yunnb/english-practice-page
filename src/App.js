import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Writing from './components/Writing';
import Words from './components/Words';
import AddSentence from './components/AddSentence';
import Header from './components/Header';
import styled from 'styled-components';
import AddWord from "./components/AddWord";

const AppContainer = styled.div`
    padding-top: 60px; /* Header height */
`;

function App() {
    return (
        <Router>
            <Header />
            <AppContainer>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/writing" element={<Writing />} />
                    <Route path="/words" element={<Words />} />
                    <Route path="/add-sentence" element={<AddSentence />} />
                    <Route path="/add-word" element={<AddWord />} />
                </Routes>
            </AppContainer>
        </Router>
    );
}

export default App;
