import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Writing from './pages/Writing';
import Words from './pages/Words';
import AddSentence from './pages/AddSentence';
import Header from './pages/Header';
import styled from 'styled-components';
import AddWord from "./pages/AddWord";
import Sentences from "./pages/Sentences";

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
                    <Route path="/sentences" element={<Sentences />} />
                    <Route path="/add-sentence" element={<AddSentence />} />
                    <Route path="/add-word" element={<AddWord />} />
                </Routes>
            </AppContainer>
        </Router>
    );
}

export default App;