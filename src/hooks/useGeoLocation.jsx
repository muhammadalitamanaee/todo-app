import { useState, useEffect } from "react";

const GEOLOCATION_EXPIRY = 10 * 60 * 1000; // 10 minutes

export default function useGeolocation() {
  const [geolocation, setGeolocation] = useState(null);
  const [lastValidGeolocation, setLastValidGeolocation] = useState(null);

  useEffect(() => {
    let interval;

    const updateGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newGeolocation = {
              latitude,
              longitude,
              timestamp: Date.now(),
            };

            setGeolocation(newGeolocation);
            setLastValidGeolocation(newGeolocation); // Store as last valid location

            clearInterval(interval); // Clear previous interval
            interval = setInterval(updateGeolocation, GEOLOCATION_EXPIRY); // Restart interval
          },
          (error) => {
            console.error("Geolocation error:", error);
            if (error.code === error.TIMEOUT && lastValidGeolocation) {
              setGeolocation(lastValidGeolocation);
            }
          },
          { timeout: 50000 }
        );
      }
    };

    updateGeolocation();
    interval = setInterval(updateGeolocation, GEOLOCATION_EXPIRY);

    return () => clearInterval(interval);
  }, [lastValidGeolocation]);

  return geolocation;
}
