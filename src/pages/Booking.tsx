import React, { useState } from "react";

interface BookingData {
  service: string;
  date: string;
  time: string;
}

const Booking: React.FC = () => {

  const [data, setData] =
    useState<BookingData>({
      service: "",
      date: "",
      time: ""
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>

      <input
        name="service"
        value={data.service}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={data.date}
        onChange={handleChange}
      />

      <input
        type="time"
        name="time"
        value={data.time}
        onChange={handleChange}
      />

    </div>
  );
};

export default Booking;