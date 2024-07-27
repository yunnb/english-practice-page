import ActivityCalendar from "react-activity-calendar";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Calender() {
    const [dates, setDates] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/activity')
            .then(response => {
                const newDates = response.data.map(item => ({
                    date: item.date.substring(0, 10),
                    count: item.add_count + item.review_count,
                    level: item.level
                }));
                console.log(newDates);
                setDates(prevDates => [...prevDates, ...newDates]);
                // prevDates 는 'dates' 의 값. 초기 상태에서는 빈 배열 -> 초기에는 newDates 만 포함된 새로운 배열이 됨
                // 만약
            })
            .catch(error => {
                console.error('Error fetching activities; ', error);
            });
    }, []);

    return (
        <>
            <ActivityCalendar data={dates} />
        </>
    );
}

export default Calender;