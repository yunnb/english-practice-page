import ActivityCalendar from "react-activity-calendar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CalenderWrapper = styled.div`
    margin-top: 100px;
`;

function Calender() {
    const [dates, setDates] = useState([]);
    const [counts, setCounts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/activity')
            .then(response => {
                const newDates = response.data.map(item => ({
                    date: item.date.substring(0, 10),
                    count: item.add_count + item.review_count,
                    level: item.level
                }));

                const newCounts = response.data.map(item => ({
                    add_count: item.add_count,
                    review_count: item.review_count
                }))
                console.log(newDates);
                setDates(prevDates => [...prevDates, ...newDates]);
                // prevDates 는 'dates' 의 값. 초기 상태에서는 빈 배열 -> 초기에는 newDates 만 포함된 새로운 배열이 됨
                setCounts(prevCounts => [...prevCounts, ...newCounts]);
            })
            .catch(error => {
                console.error('Error fetching activities; ', error);
            });
    }, []);

    const tooltipMessage = () => {


    }

    return (
        <CalenderWrapper>
            <ActivityCalendar
                data={dates}
                renderBlock={(block, activity) =>
                    React.cloneElement(block, {
                        'data-tooltip-id': 'react-tooltip',
                        'data-tooltip-html': `${activity.count} activities on ${activity.date}`,
                    })
                }
            />

            <ReactTooltip id="react-tooltip" />
        </CalenderWrapper>
    );
}

export default Calender;