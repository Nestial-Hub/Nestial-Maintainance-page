import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleSystem({ mouse }) {
  const pointsRef = useRef();
  const count = 1200;

  // Pre-generate positions and speed metrics to avoid heap allocations in render loops
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Form a spherical/dispersed cloud
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35;
      sp[i] = Math.random() * 0.02 + 0.005;
    }
    return [pos, sp];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Constant slow drift rotation
    pointsRef.current.rotation.y += 0.0006;
    pointsRef.current.rotation.x += 0.0002;

    // Smooth transition tracking cursor movements
    const targetX = mouse.current.x * 0.8;
    const targetY = mouse.current.y * 0.8;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.04;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.04;
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
        size={0.065}
        color="#22d3ee"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
