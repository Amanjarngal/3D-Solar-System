import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import SpeedControlPanel from './SpeedControlPanel';
import PauseButton from './PauseButton';
import { FaSun, FaMoon } from 'react-icons/fa';

const planetData = [
  { name: 'Mercury', size: 0.3, distance: 4, speed: 0.02, texture: 'mercury.jpg' },
  { name: 'Venus', size: 0.5, distance: 6, speed: 0.010, texture: 'venus.jpg' },
  { name: 'Earth', size: 0.55, distance: 8, speed: 0.01, texture: 'earth.jpg' },
  { name: 'Mars', size: 0.4, distance: 10, speed: 0.008, texture: 'mars.jpg' },
  { name: 'Jupiter', size: 1.1, distance: 13, speed: 0.006, texture: 'jupiter.jpg' },
  { name: 'Saturn', size: 1, distance: 16, speed: 0.005, texture: 'saturn.jpg' },
  { name: 'Uranus', size: 0.7, distance: 19, speed: 0.004, texture: 'uranus.jpg' },
  { name: 'Neptune', size: 0.7, distance: 22, speed: 0.003, texture: 'neptune.jpg' }
];

const defaultSpeeds = {};
planetData.forEach(p => defaultSpeeds[p.name] = p.speed);

const Orbit = ({ radius }) => {
  const points = [];
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    points.push(new THREE.Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle)));
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={orbitGeometry}>
      <lineBasicMaterial color="#00ffff" transparent opacity={0.8} />
    </line>
  );
};

const Planet = ({ name, size, distance, speed, texture, paused }) => {
  const planetRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const planetTexture = useLoader(TextureLoader, `/textures/${texture}`);

  useFrame(() => {
    if (!paused) {
      angleRef.current += speed;
      const x = distance * Math.cos(angleRef.current);
      const z = distance * Math.sin(angleRef.current);
      planetRef.current.position.set(x, 0, z);
      planetRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={planetRef}>
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={planetTexture} />
      </mesh>

      {name === 'Saturn' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 0.3, size + 1.2, 64]} />
          <meshBasicMaterial
            color="#ddddaa"
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      <Html position={[0, -size - 0.4, 0]} center>
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '4px 8px',
          borderRadius: '4px',
          color: 'white',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          textAlign: 'center'
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
};

const SolarSystem = () => {
  const sunRef = useRef();
  const sunTexture = useLoader(TextureLoader, '/textures/sun.jpg');

  const [planetSpeeds, setPlanetSpeeds] = useState({ ...defaultSpeeds });
  const [paused, setPaused] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showOrbits, setShowOrbits] = useState(true);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleOrbits = () => setShowOrbits(prev => !prev);

  // ✅ Reset handler
  const handleReset = () => {
    setPlanetSpeeds({ ...defaultSpeeds });
    setPaused(false);
    setTheme('dark');
    setShowOrbits(true);
  };

  return (
    <div style={{ height: '100vh', backgroundColor: theme === 'dark' ? 'black' : '#f0f0f0' }}>
      
      <SpeedControlPanel
        planetSpeeds={planetSpeeds}
        setPlanetSpeeds={setPlanetSpeeds}
        theme={theme}
        handleReset={handleReset}
      />
      <PauseButton paused={paused} setPaused={setPaused} theme={theme} />

      {/* Theme Toggle */}
      <div style={{ position: 'absolute', top: 60, right: 60, zIndex: 1000 }}>
        <button
          onClick={toggleTheme}
          style={{
            background: theme === 'dark' ? '#111' : '#fff',
            color: theme === 'dark' ? '#fff' : '#111',
            border: '1px solid #888',
            padding: '8px 10px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 10px rgba(255,255,255,0.2)'
          }}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Orbits Toggle */}
      <div style={{ position: 'absolute', top: 150, right: 40, zIndex: 1000 }}>
        <button
          onClick={toggleOrbits}
          style={{
            background: theme === 'dark' ? '#111' : '#fff',
            color: theme === 'dark' ? '#fff' : '#111',
            border: '1px solid #888',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 10px rgba(255,255,255,0.2)'
          }}
        >
          {showOrbits ? 'Hide Orbits' : 'Show Orbits'}
        </button>
      </div>

      <Canvas camera={{ position: [0, 30, 50], fov: 45 }}>
        <color attach="background" args={[theme === 'dark' ? 'black' : '#f0f0f0']} />
        <ambientLight intensity={theme === 'dark' ? 0.3 : 0.8} />
        <pointLight position={[0, 0, 0]} intensity={theme === 'dark' ? 2 : 1.2} color={theme === 'dark' ? 'white' : 'orange'} />
        <OrbitControls />
        <Stars radius={300} depth={60} count={10000} factor={7} fade />

        {/* Sun */}
        <mesh ref={sunRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            map={sunTexture}
            emissive={'orange'}
            emissiveMap={sunTexture}
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Planets and Orbits */}
        {planetData.map((planet, index) => (
          <React.Fragment key={index}>
            {showOrbits && <Orbit radius={planet.distance} />}
            <Planet
              {...planet}
              speed={planetSpeeds[planet.name]}
              paused={paused}
            />
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  );
};

export default SolarSystem;
