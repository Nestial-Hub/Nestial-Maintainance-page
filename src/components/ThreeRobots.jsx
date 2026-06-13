import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Sparks Particle Physics Emitter
function Sparks({ count = 25, position = [0, 0, 0] }) {
  const pointsRef = useRef();
  
  // Pre-generate particle dynamics parameters
  const [positions, velocities, lifetimes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const life = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spawn particles at source coordinate
      pos[i * 3] = position[0];
      pos[i * 3 + 1] = position[1];
      pos[i * 3 + 2] = position[2];
      
      // Random velocity vector shooting out upwards and outwards
      vel[i * 3] = (Math.random() - 0.5) * 1.5;
      vel[i * 3 + 1] = Math.random() * 2.0 + 0.5;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      
      life[i] = Math.random();
    }
    return [pos, vel, life];
  }, [count, position]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    
    for (let i = 0; i < count; i++) {
      // Decrease particle lifetime
      lifetimes[i] -= delta * 1.2;
      
      // If dead, respawn at source
      if (lifetimes[i] <= 0) {
        posAttr.setXYZ(i, position[0], position[1], position[2]);
        velocities[i * 3] = (Math.random() - 0.5) * 1.5;
        velocities[i * 3 + 1] = Math.random() * 2.0 + 0.5;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
        lifetimes[i] = Math.random() + 0.2;
      } else {
        // Apply physics kinematics: position += velocity * delta
        const px = posAttr.getX(i) + velocities[i * 3] * delta;
        // Add gravity deceleration on vertical coordinate
        const py = posAttr.getY(i) + velocities[i * 3 + 1] * delta - 1.5 * delta;
        const pz = posAttr.getZ(i) + velocities[i * 3 + 2] * delta;
        
        posAttr.setXYZ(i, px, py, pz);
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08}
        color="#facc15" 
        transparent 
        opacity={0.85} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 3D Jointed Robot Welder Arm Component
function RobotWelderArm({ position }) {
  const armBaseRef = useRef();
  const lowerArmRef = useRef();
  const upperArmRef = useRef();
  const laserRef = useRef();

  // Joint lengths
  const lenLower = 1.0;
  const lenUpper = 0.8;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate arm base stand
    if (armBaseRef.current) {
      armBaseRef.current.rotation.y = Math.sin(time * 0.8) * 0.25;
    }

    // Pivot arm joint linkages (flexing lower/upper arm)
    if (lowerArmRef.current) {
      lowerArmRef.current.rotation.z = -0.6 + Math.sin(time * 1.5) * 0.12;
    }
    if (upperArmRef.current) {
      upperArmRef.current.rotation.z = 1.2 + Math.cos(time * 1.5) * 0.18;
    }

    // Pulse laser welding beam opacity
    if (laserRef.current) {
      laserRef.current.material.opacity = 0.3 + Math.random() * 0.7;
    }
  });

  // Target Laptop Center Coordinates (local offset)
  const laptopPos = [-0.65, -0.65, 0.4];
  // Tool head tip coords (local offset calculated roughly to point at laptop screen)
  const toolTipPos = [-0.75, -0.15, 0.4];

  return (
    <group position={position}>
      {/* Robot Base Mount */}
      <mesh ref={armBaseRef} position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.7} />
        
        {/* Joint 1 (Shoulder) */}
        <mesh position={[0, 0.2, 0]} ref={lowerArmRef}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />

          {/* Lower segment */}
          <mesh position={[0, lenLower / 2, 0]}>
            <cylinderGeometry args={[0.07, 0.07, lenLower, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.6} />
          </mesh>

          {/* Joint 2 (Elbow) */}
          <mesh position={[0, lenLower, 0]} ref={upperArmRef}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />

            {/* Upper segment */}
            <mesh position={[0, lenUpper / 2, 0]} rotation={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.05, 0.05, lenUpper, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.6} />

              {/* Tool head attachment (Welding tip) */}
              <mesh position={[0, lenUpper / 2 + 0.1, 0]} rotation={[0, 0, 0.5]}>
                <coneGeometry args={[0.04, 0.15, 8]} />
                <meshStandardMaterial color="#d1d5db" emissive="#f97316" emissiveIntensity={0.2} />
              </mesh>
            </mesh>
          </mesh>
        </mesh>
      </mesh>

      {/* Target Laptop Box Model */}
      <group position={laptopPos}>
        {/* Base Keyboard Plate */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.6, 0.02, 0.45]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* Tilted Display Screen */}
        <mesh position={[0, 0.16, -0.21]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
          
          {/* Hologram screen glow face */}
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.54, 0.34]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
          </mesh>
        </mesh>
      </group>

      {/* Welding Laser Beam Cylinder (Tool tip to laptop keyboard center) */}
      <mesh position={[-0.7, -0.4, 0.4]} rotation={[0, 0, 0.9]} ref={laserRef}>
        <cylinderGeometry args={[0.008, 0.008, 0.5, 8]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Spark Emitter at laser contact point */}
      <Sparks count={35} position={[-0.7, -0.5, 0.4]} />
    </group>
  );
}

// 3D Mechanical Construction Crane Component
function RoboticCrane({ position }) {
  const jibRef = useRef();
  const hookBlockRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotate horizontal boom arm back and forth
    if (jibRef.current) {
      jibRef.current.rotation.y = Math.sin(time * 0.4) * 0.4;
    }
    // Slowly translate the suspended block up/down
    if (hookBlockRef.current) {
      hookBlockRef.current.position.y = -1.2 + Math.sin(time * 1.0) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Crane Base Pedestal */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Vertical Lattice Truss Tower */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 4.0, 4]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.6} wireframe />
      </mesh>

      {/* Pivot Cabin & Boom Arm structure */}
      <group position={[0, 2.2, 0]} ref={jibRef}>
        {/* Cab */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.4]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        
        {/* Counterweight segment (Back side) */}
        <mesh position={[0, 0.1, -0.6]}>
          <boxGeometry args={[0.15, 0.15, 1.2]} />
          <meshStandardMaterial color="#64748b" wireframe />
        </mesh>
        <mesh position={[0, 0.1, -1.1]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>

        {/* Forward Boom Arm Lattice (Front side) */}
        <mesh position={[0, 0.1, 1.3]} rotation={[1.57, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2.6, 4]} />
          <meshStandardMaterial color="#64748b" roughness={0.2} wireframe />
        </mesh>

        {/* Hanging wire cable from forward boom */}
        <mesh position={[0, -0.5, 2.3]}>
          <cylinderGeometry args={[0.005, 0.005, 1.2, 8]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </mesh>

        {/* Suspended glowing structure module */}
        <group position={[0, -1.2, 2.3]} ref={hookBlockRef}>
          {/* Wireframe Data Block */}
          <mesh>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
          </mesh>
          <mesh scale={[0.8, 0.8, 0.8]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function ThreeRobots() {
  return (
    <group>
      {/* 3D Robotic Construction Crane (Centered left, Section 2 focus) */}
      <RoboticCrane position={[-2.4, -0.8, 0]} />

      {/* 3D Droid Welder repairing laptop (Centered right, Section 3 focus) */}
      <RobotWelderArm position={[2.1, -0.6, 1.8]} />
    </group>
  );
}
