import React from 'react';
import FlightCard from './FlightCard';

const FlightList = ({ title, flights }) => {
    return (
        <div className="flight-list">
            <h2>{title}</h2>
            <div className="flight-scroll-area">
            {flights.length > 0 ? (
                flights.map((flight, index) => (
                        <FlightCard key={index} flight={flight} />
            ))
            ) : (
                <p>No flights available</p>
            )}
            </div>
        </div>
    );
};

export default FlightList;