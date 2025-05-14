import "./App.css";
import React, { useEffect, useState } from "react";
import FlightList from "./components/FlightList";
import SearchBar from "./components/SearchBar";

function App() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [airportCode, setAirportCode] = useState("");
  const [airportName, setAirportName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchFlights = (code) => {
    if (code.length !== 3 || !/^[A-Z]+$/.test(code)) {
      setError("Invalid airport code");
      setSuccessMessage("");
      return;
    }

    setError("");
    setSuccessMessage("");
    setAirportCode(code);

    // Used '/timetable.json' as a mock api for testing purposes. There's a limit of 100 requests for the real API.
    let codeapi =
      "https://api.aviationstack.com/v1/timetable?iataCode=" +
      code +
      "&type=arrival&access_key=fe762c40375eea8edd551297495f45ec";

    fetch(codeapi)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setFlights(data.data);
          setAirportName(data.data[0].arrival.iataCode);

          const now = new Date();
          const formattedTime = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          setSuccessMessage(
            `Successfully fetched flights for ${code} at ${formattedTime}`
          );
        } else {
          setError("No flights found");
          setFlights([]);
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        console.error("Error fetching flight data:", error);
        setError("Error fetching flight data");
      });
  };

  useEffect(() => {
    if (airportCode) {
      fetchFlights(airportCode);
    }
  }, [airportCode]);

  const categorizeFlights = (flights) => {
    const divertedLanded = flights.filter(
      (flight) =>
        (flight.status === "diverted" || flight.status === "landed") &&
        flight.airline.name !== "empty"
    );
    const scheduledActive = flights.filter(
      (flight) =>
        (flight.status === "scheduled" || flight.status === "active") &&
        flight.airline.name !== "empty" &&
        flight.arrival.gate != null
    );
    const cancelledUnknown = flights.filter(
      (flight) =>
        (flight.status === "cancelled" || flight.status === "unknown") &&
        flight.airline.name !== "empty"
    );
    return { divertedLanded, scheduledActive, cancelledUnknown };
  };

  const { divertedLanded, scheduledActive, cancelledUnknown } =
    categorizeFlights(flights);

  return (
    <div className="App">
      <div className="top-bar">
        <h1>
          {airportName
            ? `Flight Arrival List for ${airportName}`
            : "US Flights: Arrivals by Airport"}
        </h1>
        <SearchBar onSearch={fetchFlights} />
      </div>

      <p className="app-description">
        This app will list all of the arrivals at any given airport. Simply
        enter a valid airport code in the search bar, and the app will display
        all of the flights for the day categorized by status. This can be useful
        if you're picking someone up from an airport or driving uber/taxi at an
        airport.
      </p>

      {successMessage && <p className="success-message">{successMessage}</p>}

      {error && <p className="error">{error}</p>}

      <div className="lists-container">
        <FlightList title="Diverted / Landed" flights={divertedLanded} />
        <FlightList title="Active / Scheduled" flights={scheduledActive} />
        <FlightList title="Cancelled / Unknown" flights={cancelledUnknown} />
      </div>
    </div>
  );
}

export default App;
