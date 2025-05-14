import React from 'react';

const FlightCard = ({ flight }) => {
    const { departure, arrival, airline, flight: flightInfo, status } = flight;
    if ((arrival.delay != null || departure.delay != null ) && (flight.status === 'scheduled' || flight.status === 'active')){
        return (
            <div className="flight-card">
                <h3>{airline.name} - {flightInfo.number}</h3>
                <p className="delayed">Delayed</p>
                <p><strong>Date:</strong> {new Date(departure.scheduledTime).toLocaleDateString()}</p>
                <p><strong>Departure:</strong> {new Date(departure.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p><strong>Arrival:</strong> {new Date(arrival.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p><strong>Gate:</strong> {arrival.gate}</p>
                <p><strong>Status:</strong> {status}</p>
            </div>
        );
    }else{
        return (
            <div className="flight-card">
                <h3>{airline.name} - {flightInfo.number}</h3>
                <p><strong>Date:</strong> {new Date(departure.scheduledTime).toLocaleDateString()}</p>
                <p><strong>Departure:</strong> {new Date(departure.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p><strong>Arrival:</strong> {new Date(arrival.scheduledTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p><strong>Gate:</strong> {arrival.gate}</p>
                <p><strong>Status:</strong> {status}</p>
            </div>
        );
    }

};

export default FlightCard;