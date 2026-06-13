import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function GridModel() {
  const outerRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (outerRef.current) {
      // Rotate outer grid casing
      outerRef.current.rotation.y = time * 0.08;
      outerRef.current.rotation.x = time * 0.04;
      
      // Simulate system heartbeat pulse
      const pulse = 1 + Math.sin(time * 2.0) * 0.03;
      outerRef.current.scale.set(pulse, pulse, pulse);
    }

    if (innerRef.current) {
      // Opposite rotation for the core node
      innerRef.current.rotation.y = -time * 0.18;
      innerRef.current.rotation.z = time * 0.12;
    }

    if (ringRef.current) {
      // Spin the orbit ring
      ringRef.current.rotation.z = time * 0.25;
    }
  });

  return (
    <group>
      {/* Outer Hologram Spherical Casing */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.0, 2]} />
        <meshBasicMaterial 
          wireframe 
          color="#22d3ee" 
          transparent 
          opacity={0.16} 
          depthWrite={false}
        />
      </mesh>

      {/* Inner Node Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial 
          wireframe 
          color="#d946ef" 
          transparent 
          opacity={0.38} 
          depthWrite={false}
        />
      </mesh>

      {/* Orbit Track Ring */}
      <mesh ref={ringRef} rotation={[1.3, 0.5, 0]}>
        <ringGeometry args={[2.5, 2.53, 64]} />
        <meshBasicMaterial 
          color="#22d3ee" 
          side={2} // THREE.DoubleSide
          transparent 
          opacity={0.22} 
          wireframe
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
