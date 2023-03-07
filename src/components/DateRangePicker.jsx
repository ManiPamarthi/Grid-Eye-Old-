import React, { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker as RangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

function DateRangePicker(props) {
  const [startDate, setStartDate] = useState(props.startDate || null);
  const [endDate, setEndDate] = useState(props.endDate || null);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
	props.onDatesChange(startDate, endDate);
	
  };
  return (
    <div className="App">
      <RangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />
    </div>
  );
}

export default DateRangePicker;
