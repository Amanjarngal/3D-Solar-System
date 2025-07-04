<h1>🌌 3D Solar System Simulation</h1>
A fully interactive 3D simulation of our solar system built with React, Three.js, and @react-three/fiber. Includes orbital motion, real-time speed control, pause/resume, orbit toggle, dark/light mode, mobile-friendly UI, and reset functionality.

<h3>🚀 Features</h3>
-3D planets with textured spheres and orbits

-Real-time orbital motion simulation

-Speed control sliders (responsive for mobile)

-Pause/Resume button

-Toggle between Light and Dark modes

-Show/Hide orbital paths

-Reset to default state

-Stars background (space environment)

-Mobile responsive dropdown panel

<h3>📦 Tech Stack</h3>
-React

-Three.js

-@react-three/fiber

-@react-three/drei

-react-icons

<h2>✨ Key Functionalities (How It Works) </h2>
<h3>🌍 Planet Creation</h3>

-Each planet is created using <mesh> with <sphereGeometry> for shape and TextureLoader for realistic textures.

-Position updates continuously using <b>useFrame</b> with trigonometry:

x = distance * Math.cos(angle)
z = distance * Math.sin(angle)

<h3>🌀 Orbit Creation</h3>
-Orbits are created as a circle of 100 points using THREE.Vector3, drawn with <line> and BufferGeometry.

<h2>🕹️ Controls</h2>
-OrbitControls: for zoom, rotate, and pan

-SpeedControlPanel: sliders to adjust planet speed

-PauseButton: toggle animation on/off

-Reset Button: restores default speed, theme, orbit display

-Theme Toggle: switch between dark and light UI modes

-Orbit Toggle: hide/show orbit rings

-Responsive Panel: mobile-friendly dropdown UI for speed control

<h2>🔧 How to Run the Project Locally</h2>
# Clone the repo
   git clone https://github.com/your-username/3d-solar-system.git
   cd 3d-solar-system

# Install dependencies
  npm install

# Start the app
  npm run dev