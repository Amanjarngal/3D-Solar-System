import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import SpeedControlPanel from './SpeedControlPanel';
import PauseButton from './PauseButton';

const planetData = [
  { name: 'Mercury', size: 0.3, distance: 4, speed: 0.02, texture: 'mercury.jpg' },
  { name: 'Venus', size: 0.5, distance: 6, speed: 0.015, texture: 'venus.jpg' },
  { name: 'Earth', size: 0.55, distance: 8, speed: 0.01, texture: 'earth.jpg' },
  { name: 'Mars', size: 0.4, distance: 10, speed: 0.008, texture: 'mars.jpg' },
  { name: 'Jupiter', size: 1.1, distance: 13, speed: 0.006, texture: 'jupiter.jpg' },
  { name: 'Saturn', size: 1, distance: 16, speed: 0.005, texture: 'saturn.jpg' },
  { name: 'Uranus', size: 0.7, distance: 19, speed: 0.004, texture: 'uranus.jpg' },
  { name: 'Neptune', size: 0.7, distance: 22, speed: 0.003, texture: 'neptune.jpg' }
];

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

  const [planetSpeeds, setPlanetSpeeds] = useState(() => {
    const initialSpeeds = {};
    planetData.forEach(p => initialSpeeds[p.name] = p.speed);
    return initialSpeeds;
  });

  // ✅ Add paused state
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ height: '100vh', backgroundColor: 'black' }}>
      <SpeedControlPanel planetSpeeds={planetSpeeds} setPlanetSpeeds={setPlanetSpeeds} />
      <PauseButton paused={paused} setPaused={setPaused} />

      <Canvas camera={{ position: [0, 30, 50], fov: 45 }}>
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />
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

        {/* Planets */}
        {planetData.map((planet, index) => (
          <React.Fragment key={index}>
            <Orbit radius={planet.distance} />
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
