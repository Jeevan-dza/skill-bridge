"use client";

import { useState, useEffect } from "react";

export function CurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // eslint-disable-next-line
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return <>{currentDate}</>;
}

