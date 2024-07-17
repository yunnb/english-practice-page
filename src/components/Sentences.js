import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { WholeStyle } from "../style/WholeStyle";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    
    th {
        border-bottom: 1px solid seagreen;
        padding: 10px;
    }
    td {
        padding: 5px;
    }
    
    #id {
        text-align: center;
    }
    #e {
        border-bottom: 1px solid darkseagreen;
    }
`;
function Sentences() {
    const [sentences, setSentences] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/sentences')
            .then(response => {
                console.log(response.data);
                setSentences(response.data);
            })
            .catch(error => {
                console.error('Error fetching sentences:', error);
            });
    }, []);

    return (
        <WholeStyle>
            <h2>Sentences</h2>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Text</th>
                </tr>
                </thead>
                <tbody>
                {sentences.map(sentence => (
                    <React.Fragment key={sentence.id}>
                        <tr>
                            <td rowSpan="2" id='id'>{sentence.id}</td>
                            <td>{sentence.korean_text}</td>
                        </tr>
                        <tr id='e'>
                            <td>{sentence.english_text}</td>
                        </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </Table>
        </WholeStyle>
    );
}

export default Sentences;
