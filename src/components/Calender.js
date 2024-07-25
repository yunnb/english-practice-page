import ActivityCalendar from "react-activity-calendar";

const data = [
    {
        "date": "2024-07-24",
        "count": 2,
        "level": 1
    },
    {
        "date": "2024-07-25",
        "count": 16,
        "level": 3
    }
]

function Calender() {
    return (
        <>
            <ActivityCalendar data={data} />
        </>
    );
}

export default Calender;