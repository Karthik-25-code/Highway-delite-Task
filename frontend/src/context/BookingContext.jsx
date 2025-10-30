import React, { createContext, useContext, useEffect, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => {
    const saved = localStorage.getItem('booking');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('booking', JSON.stringify(booking));
  }, [booking]);

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
