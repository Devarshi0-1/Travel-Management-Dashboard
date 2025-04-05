import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date: any) => setStartDate(date)}
      className="form-control datetimepicker-input digits"
    />
  );
};

export default DatePicker;
