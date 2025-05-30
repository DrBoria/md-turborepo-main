import React from 'react';
import type { DefaultTheme } from 'styled-components';
import styled from 'styled-components';
import moment from 'moment';

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
`;


const HeaderCell = styled.div<{ theme: DefaultTheme }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.sectionContent};
`;

const DayCell = styled.div<{ theme: DefaultTheme }>`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.sectionContent};
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.sectionContent};
        color: ${({ theme }) => theme.colors.section};
    }
`;

const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState<Moment>(moment());

  const daysOfWeek = moment.weekdaysShort();
//   const currentDateFormatted = currentDate.format('MMMM YYYY');

  const getCalendarGrid = () => {
    const today = moment(); // Get current date using moment.js
    const startDate = today.clone().startOf('month').startOf('week'); // Get the start date of the current month, aligned to the start of the week

    const totalDays = 42; // Render 6 rows (7 days each)

    const calendarCells: JSX.Element[] = [];
    const currentDate = startDate.clone();

    // Add date cells for each day in the grid
    for (let index = 0; index < totalDays; index++) {
      const isCurrentMonth = currentDate.month() === today.month(); // Check if the current date belongs to the current month

      // Add a class to distinguish between cells from the previous month
      const cellClass = isCurrentMonth ? 'calendar-cell' : 'calendar-cell prev-month';

      // Format the date as needed (e.g., "1", "2", etc.)
      const formattedDate = currentDate.format('D');

      // Add the cell to the calendar cells array
      calendarCells.push(
        <DayCell key={index} className={cellClass}>
          {formattedDate}
        </DayCell>
      );

      // Move to the next date
      currentDate.add(1, 'day');
    }

    return calendarCells;
  };

  return (
    <div>
      <CalendarContainer>
        {daysOfWeek.map((day) => (
          <HeaderCell key={day}>{day}</HeaderCell>
        ))}
        {getCalendarGrid()}
      </CalendarContainer>
    </div>
  );
};

export default Calendar;
