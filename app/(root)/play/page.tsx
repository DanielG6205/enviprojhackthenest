'use client';

import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type LocationData = {
  name: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  facts: string[];
  coords: [number, number];
  center: [number, number];
};

function GuessMarker({ onGuess }: { onGuess: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e: { latlng: any; }) {
      onGuess(e.latlng);
    },
  });
  return null;
}

export default function PlayPage() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [guessCoords, setGuessCoords] = useState<[number, number] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchLocation = async () => {
    try {
      const res = await fetch('http://localhost:3000/get-random-location'); // 👈 update if needed
      const data = await res.json();
      setLocation({
        name: data.name || 'Unknown',
        beforeImageUrl: data.beforeImageUrl || '',
        afterImageUrl: data.afterImageUrl || '',
        facts: data.facts || [],
        coords: data.coords || [0, 0],
        center: data.center || [20, 0],
      });
      setGuessCoords(null);
      setShowAnswer(false);
    } catch (err) {
      console.error('Failed to fetch location:', err);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSubmit = () => {
    if (guessCoords) setShowAnswer(true);
  };

  if (!location) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h1>🌍 EcoGuessr</h1>
      <h2>Where is this place?</h2>
      <img
        src={location.beforeImageUrl}
        alt="Before pollution"
        style={{ maxWidth: '90%', borderRadius: '10px' }}
      />

      {!showAnswer ? (
        <>
          <p>Click on the map to make your guess!</p>
          <MapContainer
            center={location.center}
            zoom={2}
            style={{ height: '400px', width: '100%', margin: '20px 0' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <GuessMarker
              onGuess={(latlng) => setGuessCoords([latlng.lat, latlng.lng])}
            />
            {guessCoords && <Marker position={guessCoords} />}
          </MapContainer>
          <button onClick={handleSubmit} disabled={!guessCoords}>
            Submit Guess
          </button>
        </>
      ) : (
        <>
          <h2>Correct Location: {location.name}</h2>
          <MapContainer
            center={location.coords}
            zoom={5}
            style={{ height: '400px', width: '100%', margin: '20px 0' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={location.coords} />
            {guessCoords && <Marker position={guessCoords} />}
          </MapContainer>
          <img
            src={location.afterImageUrl}
            alt="After pollution"
            style={{ maxWidth: '90%', borderRadius: '10px' }}
          />
          <h3>Facts:</h3>
          <ul style={{ textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
            {location.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
          <button onClick={fetchLocation} style={{ marginTop: '20px' }}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
}
