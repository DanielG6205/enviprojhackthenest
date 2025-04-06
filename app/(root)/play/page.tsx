'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
type LatLngExpression = [number, number] | { lat: number; lng: number };
import { useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
) as React.FC<{
  center: LatLngExpression;
  zoom: number;
  style: React.CSSProperties;
  children: React.ReactNode;
}>;

const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

let L: any;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

type LatLng = {
  lat: number;
  lng: number;
};

type LocationData = {
  name: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  facts: string[];
  coords: [number, number];
  center: [number, number];
};

export default function PlayPage() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [guessCoords, setGuessCoords] = useState<[number, number] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);

  const fetchLocation = async () => {
    try {
      const res = await fetch('http://localhost:3001/get-random-location');
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
    if (round === 0) {
      fetchLocation();
    }
  }, [round]);

  const handleSubmit = () => {
    if (guessCoords && location) {
      const distance = calculateDistance(
        guessCoords[0],
        guessCoords[1],
        location.coords[0],
        location.coords[1]
      );
      setScore(score + distance);
      setShowAnswer(true);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 0.621371; // miles
  };

  const handleNext = () => {
    setRound(round + 1);
    setShowAnswer(false);
    setGuessCoords(null);
    fetchLocation();
  };

  const handleEnd = () => {
    setRound(0);
    setScore(0);
  };

  if (!location) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h1>🌍 EcoGuessr</h1>

      {round === 0 ? (
        <div>
          <h2>Click the button below to start the game!</h2>
          <button onClick={() => setRound(1)}>Play</button>
        </div>
      ) : round < 5 ? (
        <>
          <h2>Round {round}</h2>
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
                zoom={3}
                style={{ height: '400px', width: '100%', margin: '20px 0', backgroundColor: 'lightgray' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GuessMarker onGuess={(latlng) => setGuessCoords([latlng.lat, latlng.lng])} />
                {guessCoords && <Marker position={guessCoords}><Popup>Your guess</Popup></Marker>}
              </MapContainer>
              <button onClick={handleSubmit} disabled={!guessCoords}>
                Submit Guess
              </button>
            </>
          ) : (
            <>
              <h2>Correct Location: {location.name}</h2>
              <MapContainer center={location.coords} zoom={3} style={{ height: '400px', width: '100%', margin: '20px 0' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={location.coords}><Popup>Correct Location</Popup></Marker>
                {guessCoords && <Marker position={guessCoords}><Popup>Your guess</Popup></Marker>}
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
              <button onClick={handleNext} style={{ marginTop: '20px' }}>
                Next Round
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h2>Game Over!</h2>
          <h3>Your Score: {score.toFixed(2)} miles</h3>
          <button onClick={handleEnd} style={{ marginTop: '20px' }}>
            Restart Game
          </button>
        </>
      )}
    </div>
  );
}

function GuessMarker({ onGuess }: { onGuess: (latlng: LatLng) => void }) {
  useMapEvents({
    click(e: { latlng: LatLng }) {
      onGuess(e.latlng);
    },
  });

  return null;
}
