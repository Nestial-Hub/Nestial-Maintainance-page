import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment, Float, ContactShadows, Sparkles, Stars,
  MeshReflectorMaterial, Text, Edges, Html,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { motion } from "framer-motion";

const NEON = "#22d3ee";
const NEON2 = "#3b82f6";

/* ───────── Glowing Nestial block ───────── */
function NestialBlock({ position, glow = 1 }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial
          color="#0b1220"
          metalness={0.9}
          roughness={0.25}
          emissive={NEON}
          emissiveIntensity={0.15 * glow}
        />
        <Edges color={NEON} threshold={15} />
      </mesh>
      <mesh position={[0, 0, 0.281]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial color={NEON} transparent opacity={0.0} />
      </mesh>
      <Text
        position={[0, 0, 0.282]}
        fontSize={0.09}
        color={NEON}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor={NEON2}
      >
        NESTIAL
      </Text>
    </group>
  );
}

/* Realistic rubber wheel — axle along Z, spins on its own axis */
function TruckWheel({ position }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = -clock.getElapsedTime() * 5;
  });
  return (
    <group position={position} ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.16, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.15} roughness={0.95} />
      </mesh>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.205, Math.sin(a) * 0.205, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.045, 0.04, 0.18]} />
            <meshStandardMaterial color="#050505" roughness={1} />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 0.082]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 28]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.082]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 28]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.2} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.06, Math.sin(a) * 0.06, 0.092]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.11, 0.022, 0.012]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 0.098]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.025, 16]} />
        <meshStandardMaterial color="#fde047" metalness={0.6} roughness={0.35}
          emissive="#fbbf24" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function MiniExcavator({ offset }) {
  const group = useRef(null);
  const carried = useRef(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() + offset;
    const cycle = (time * 0.35) % 1;
    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(1.8, -2.0, cycle);
      group.current.position.y = -1.12 + Math.sin(time * 8) * 0.005;
      group.current.position.z = 1.4;
      group.current.rotation.y = 0; // headlights face left
    }
    if (carried.current && carried.current.material) {
      const carrying = cycle > 0.1 && cycle < 0.9;
      carried.current.material.opacity = carrying ? 1 : 0;
      carried.current.visible = carrying;
    }
  });

  return (
    <group ref={group} scale={0.4}>
      {/* chassis / frame */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.18, 0.7]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.4} />
      </mesh>
      {/* suspension axles */}
      <mesh position={[-0.4, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.85, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.85, 12]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* yellow cab */}
      <mesh position={[-0.25, 0.42, 0]} castShadow>
        <boxGeometry args={[0.55, 0.5, 0.62]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* cab roof */}
      <mesh position={[-0.25, 0.7, 0]} castShadow>
        <boxGeometry args={[0.5, 0.06, 0.58]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* windshield */}
      <mesh position={[-0.02, 0.45, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.04, 0.34, 0.5]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} emissive="#22d3ee" emissiveIntensity={0.4} transparent opacity={0.85} />
      </mesh>
      {/* black stripe */}
      <mesh position={[-0.25, 0.2, 0]}>
        <boxGeometry args={[0.56, 0.05, 0.63]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
      </mesh>
      {/* cargo bed */}
      <group position={[0.4, 0.25, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.08, 0.6]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* bed walls */}
        <mesh position={[0, 0.12, 0.3]}>
          <boxGeometry args={[0.55, 0.24, 0.04]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.12, -0.3]}>
          <boxGeometry args={[0.55, 0.24, 0.04]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.275, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.24, 0.6]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* carried block in bed */}
        <mesh ref={carried} position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.32, 0.32, 0.4]} />
          <meshStandardMaterial color="#0b1220" metalness={0.9} roughness={0.25} emissive={NEON} emissiveIntensity={0.6} transparent />
        </mesh>
      </group>
      {/* headlights */}
      <mesh position={[-0.65, 0.3, 0.22]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#fff7c2" toneMapped={false} />
      </mesh>
      <mesh position={[-0.65, 0.3, -0.22]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#fff7c2" toneMapped={false} />
      </mesh>
      {/* warning beacon */}
      <mesh position={[-0.25, 0.78, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshBasicMaterial color="#f59e0b" toneMapped={false} />
      </mesh>
      {/* wheels — each spins on its own axle */}
      <TruckWheel position={[-0.4, -0.05, 0.4]} />
      <TruckWheel position={[-0.4, -0.05, -0.4]} />
      <TruckWheel position={[0.4, -0.05, 0.4]} />
      <TruckWheel position={[0.4, -0.05, -0.4]} />
      <pointLight position={[-0.7, 0.3, 0]} color="#fff7c2" intensity={0.6} distance={1.2} />
    </group>
  );
}

function HoloPlatform({ position, radius = 1.2 }) {
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.4;
    if (ring2.current) ring2.current.rotation.z = -t * 0.25;
  });
  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ring1}>
        <ringGeometry args={[radius * 0.85, radius, 64]} />
        <meshBasicMaterial color={NEON} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2} position={[0, 0, 0.01]}>
        <ringGeometry args={[radius * 0.6, radius * 0.7, 64]} />
        <meshBasicMaterial color={NEON2} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[radius * 0.85, 64]} />
        <meshBasicMaterial color={NEON} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function MiniForklift({ offset }) {
  const group = useRef(null);
  const fork = useRef(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() + offset;
    const cycle = (time * 0.28) % 1;
    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(1.4, -1.5, cycle);
      group.current.position.y = -1.14 + Math.sin(time * 7) * 0.004;
      group.current.position.z = 1.9;
      group.current.rotation.y = 0;
    }
    if (fork.current) {
      fork.current.position.y = 0.05 + Math.abs(Math.sin(time * 2)) * 0.15;
    }
  });
  return (
    <group ref={group} scale={0.38}>
      {/* chassis */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.9, 0.22, 0.6]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* yellow body */}
      <mesh position={[-0.15, 0.32, 0]} castShadow>
        <boxGeometry args={[0.55, 0.28, 0.58]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.55} roughness={0.4} />
      </mesh>
      {/* driver cab cage */}
      <mesh position={[-0.25, 0.62, 0]} castShadow>
        <boxGeometry args={[0.32, 0.32, 0.52]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.85} roughness={0.2} emissive="#22d3ee" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>
      <mesh position={[-0.25, 0.8, 0]} castShadow>
        <boxGeometry args={[0.36, 0.04, 0.56]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
      </mesh>
      {/* mast */}
      <mesh position={[0.4, 0.5, 0.12]} castShadow>
        <boxGeometry args={[0.05, 0.85, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0.5, -0.12]} castShadow>
        <boxGeometry args={[0.05, 0.85, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* forks */}
      <group ref={fork} position={[0.45, 0.1, 0]}>
        <mesh position={[0.2, 0, 0.15]} castShadow>
          <boxGeometry args={[0.45, 0.04, 0.06]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.2} />
        </mesh>
        <mesh position={[0.2, 0, -0.15]} castShadow>
          <boxGeometry args={[0.45, 0.04, 0.06]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.2} />
        </mesh>
        {/* carried block on forks */}
        <mesh position={[0.3, 0.18, 0]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.36]} />
          <meshStandardMaterial color="#0b1220" metalness={0.9} roughness={0.25} emissive={NEON} emissiveIntensity={0.5} />
        </mesh>
      </group>
      {/* headlight */}
      <mesh position={[-0.45, 0.35, 0.22]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#fff7c2" toneMapped={false} />
      </mesh>
      <mesh position={[-0.45, 0.35, -0.22]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#fff7c2" toneMapped={false} />
      </mesh>
      <TruckWheel position={[-0.3, -0.05, 0.32]} />
      <TruckWheel position={[-0.3, -0.05, -0.32]} />
      <TruckWheel position={[0.3, -0.05, 0.32]} />
      <TruckWheel position={[0.3, -0.05, -0.32]} />
    </group>
  );
}

function NestialStack() {
  const stack = [];
  for (let i = 0; i < 5; i++) stack.push([-2.2, -0.5 + i * 0.56, 0]);
  for (let i = 0; i < 3; i++) stack.push([-2.2 + 0.56, -0.5 + i * 0.56, 0]);
  return (
    <group>
      {stack.map((p, i) => (
        <Float key={i} speed={1} rotationIntensity={0} floatIntensity={0.05}>
          <NestialBlock position={p} glow={1} />
        </Float>
      ))}
    </group>
  );
}

function PickupBlocks() {
  return (
    <group position={[2.2, -0.6, 0]}>
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={1.5} floatIntensity={0.2}>
          <NestialBlock position={[i * 0.1 - 0.1, i * 0.6, i * 0.1]} glow={1.4} />
        </Float>
      ))}
    </group>
  );
}

function WeldSparks({ position }) {
  const ref = useRef(null);
  const count = 60;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    return arr;
  }, []);
  const velocities = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 0.04,
        y: Math.random() * 0.05 + 0.01,
        z: (Math.random() - 0.5) * 0.04,
        life: Math.random(),
      })),
    []
  );
  useFrame(() => {
    if (!ref.current || !ref.current.geometry || !ref.current.geometry.attributes.position) return;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const v = velocities[i];
      v.life += 0.02;
      if (v.life > 1) {
        v.life = 0;
        arr[i * 3] = 0;
        arr[i * 3 + 1] = 0;
        arr[i * 3 + 2] = 0;
      } else {
        arr[i * 3] += v.x;
        arr[i * 3 + 1] += v.y - v.life * 0.02;
        arr[i * 3 + 2] += v.z;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fde68a" size={0.04} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function RobotWelder() {
  const head = useRef(null);
  const armL = useRef(null);
  const armR = useRef(null);
  const torch = useRef(null);
  const [sparkOn] = useState(true);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (head.current) head.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    if (armR.current) {
      armR.current.rotation.x = -1.1 + Math.sin(t * 6) * 0.08;
      armR.current.rotation.z = -0.3 + Math.cos(t * 4) * 0.05;
    }
    if (armL.current) {
      armL.current.rotation.x = -0.9 + Math.cos(t * 5) * 0.05;
    }
    if (torch.current) {
      torch.current.intensity = 1.5 + Math.sin(t * 25) * 1.2;
    }
  });

  return (
    <group position={[2.4, -0.3, 0]} scale={0.95}>
      {/* base */}
      <mesh position={[0, -0.55, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#0a0f1c" metalness={0.95} roughness={0.2} />
      </mesh>
      {/* torso */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.32, 0.55, 8, 16]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.05, 0.31]}>
        <planeGeometry args={[0.35, 0.5]} />
        <meshStandardMaterial color="#0b1220" emissive={NEON} emissiveIntensity={0.6} metalness={0.6} roughness={0.2} />
      </mesh>
      {/* head */}
      <group ref={head} position={[0, 0.7, 0]}>
        {/* helmet / head shell */}
        <mesh castShadow>
          <boxGeometry args={[0.38, 0.34, 0.34]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          <Edges color={NEON} />
        </mesh>
        {/* side ear panels */}
        <mesh position={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.14, 0.2]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.14, 0.2]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* visor ridge */}
        <mesh position={[0, 0.08, 0.18]} castShadow>
          <boxGeometry args={[0.3, 0.04, 0.04]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* dark visor face plate (recessed) */}
        <mesh position={[0, 0, 0.171]}>
          <planeGeometry args={[0.3, 0.22]} />
          <meshStandardMaterial color="#020617" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* left eye */}
        <mesh position={[-0.07, 0.03, 0.181]}>
          <boxGeometry args={[0.07, 0.045, 0.005]} />
          <meshBasicMaterial color="#22d3ee" toneMapped={false} />
        </mesh>
        {/* right eye */}
        <mesh position={[0.07, 0.03, 0.181]}>
          <boxGeometry args={[0.07, 0.045, 0.005]} />
          <meshBasicMaterial color="#22d3ee" toneMapped={false} />
        </mesh>
        {/* mouth / jaw line */}
        <mesh position={[0, -0.08, 0.181]}>
          <boxGeometry args={[0.14, 0.012, 0.005]} />
          <meshBasicMaterial color="#22d3ee" toneMapped={false} />
        </mesh>
        {/* chin */}
        <mesh position={[0, -0.16, 0.12]} castShadow>
          <boxGeometry args={[0.18, 0.04, 0.1]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
      {/* shoulders */}
      <mesh position={[-0.42, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0.42, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.2} />
      </mesh>
      {/* left arm */}
      <group ref={armL} position={[-0.42, 0.3, 0]}>
        <mesh position={[0, -0.25, 0.1]} castShadow>
          <capsuleGeometry args={[0.07, 0.5, 8, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.55, 0.35]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.18]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
      {/* right arm with torch */}
      <group ref={armR} position={[0.42, 0.3, 0]}>
        <mesh position={[0, -0.25, 0.15]} castShadow>
          <capsuleGeometry args={[0.07, 0.5, 8, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.55, 0.4]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.25, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.2} />
        </mesh>
        <pointLight ref={torch} position={[0, -0.7, 0.45]} color="#fde68a" intensity={2} distance={1.5} />
        {sparkOn && <WeldSparks position={[0, -0.7, 0.45]} />}
        {/* weld beam */}
        <mesh position={[0, -0.85, 0.45]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.04, 0.35, 8, 1, true]} />
          <meshBasicMaterial color="#fef3c7" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {/* hot weld point glow */}
        <mesh position={[0, -1.02, 0.45]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#fde68a" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      {/* chest core ring */}
      <mesh position={[0, 0.05, 0.32]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.09, 0.012, 12, 32]} />
        <meshBasicMaterial color={NEON} />
      </mesh>
      {/* antenna */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.06, 0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={NEON} />
      </mesh>
    </group>
  );
}

function FuturisticLaptop() {
  const screen = useRef(null);
  useFrame(({ clock }) => {
    if (screen.current) {
      screen.current.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
    }
  });
  return (
    <group position={[2.4, -1.05, 0.6]} rotation={[0, -0.3, 0]}>
      {/* base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.05, 1.1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.2} />
        <Edges color={NEON} />
      </mesh>
      {/* screen */}
      <group position={[0, 0.5, -0.5]} rotation={[-0.2, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.6, 1, 0.05]} />
          <meshStandardMaterial color="#0a0f1c" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.5, 0.9]} />
          <meshStandardMaterial
            ref={screen}
            color="#020617"
            emissive={NEON}
            emissiveIntensity={0.9}
          />
        </mesh>
        <Html
          position={[0, 0, 0.04]}
          transform
          distanceFactor={1.3}
          occlude={false}
          style={{ pointerEvents: "none" }}
        >
          <div className="w-[300px] h-[180px] rounded-md bg-slate-950/80 border border-cyan-400/40 p-3 font-mono text-[9px] text-cyan-300">
            <div className="flex justify-between text-cyan-400/70">
              <span>● NESTIAL SYS</span>
              <span>v2.4.1</span>
            </div>
            <div className="mt-1 space-y-0.5">
              <div>&gt; init_core ........ <span className="text-emerald-400">OK</span></div>
              <div>&gt; net.sync ......... <span className="text-emerald-400">98.7%</span></div>
              <div>&gt; weld.module ...... <span className="text-amber-300">active</span></div>
              <div>&gt; build.queue ...... 12 blocks</div>
              <div className="text-cyan-400/60">▓▓▓▓▓▓▓▓▓░░ 81%</div>
              <div className="text-cyan-400/50">tx 0x9af2..ec3 confirmed</div>
              <div className="text-cyan-400/50">node-04 → node-12</div>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

function FloatingDialog() {
  return (
    <group position={[-2.5, 0.8, 0.5]}>
      <Html transform distanceFactor={1.4} style={{ pointerEvents: "none" }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-[260px] rounded-2xl border border-cyan-400/30 bg-slate-950/70 backdrop-blur-xl p-3 shadow-[0_0_40px_-10px_rgba(34,211,238,0.6)]"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="size-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-cyan-300">Nestial AI</span>
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="bg-slate-900/80 rounded-lg rounded-tl-none p-2 text-slate-300">
              Initialize a new infrastructure deployment.
            </div>
            <div className="bg-cyan-500/15 border border-cyan-400/30 rounded-lg rounded-tr-none p-2 text-cyan-100 ml-6">
              Spinning up 12 modular nodes. ETA 00:03.
            </div>
            <div className="flex gap-1">
              <span className="size-1.5 bg-cyan-400 rounded-full animate-bounce" />
              <span className="size-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:120ms]" />
              <span className="size-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:240ms]" />
            </div>
          </div>
        </motion.div>
      </Html>
    </group>
  );
}

/* ───────── Camera parallax — follows mouse on window level ───────── */
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.current.y * 0.3 + 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ───────── Scene assembly ───────── */
function Scene() {
  const chromaticAberrationOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0008), []);

  return (
    <>
      <color attach="background" args={["#04060d"]} />
      <fog attach="fog" args={["#04060d", 6, 18]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 6, 4]} intensity={0.6} color="#93c5fd" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 2, 2]} color={NEON} intensity={1.2} distance={8} />
      <pointLight position={[3, 2, 2]} color={NEON2} intensity={1.2} distance={8} />
      <Stars radius={40} depth={30} count={1500} factor={3} fade speed={0.6} />
      <Sparkles count={80} scale={[8, 4, 4]} size={2} speed={0.3} color={NEON} />

      <CameraRig />

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          mirror={0.6}
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={1.2}
          roughness={0.6}
          depthScale={1.1}
          minDepthThreshold={0.4}
          color="#070a14"
          metalness={0.85}
        />
      </mesh>

      {/* grid lines */}
      <gridHelper args={[20, 40, NEON, "#0e1a2e"]} position={[0, -1.29, 0]} />

      <FloatingDialog />
      <HoloPlatform position={[-2.2, -1.27, 0]} radius={1.1} />
      <HoloPlatform position={[2.4, -1.27, 0.3]} radius={1.3} />
      <NestialStack />
      <PickupBlocks />
      <MiniExcavator offset={0} />
      <MiniExcavator offset={2.4} />
      <MiniForklift offset={1.2} />

      <RobotWelder />
      <FuturisticLaptop />

      <ContactShadows position={[0, -1.28, 0]} opacity={0.55} scale={14} blur={2.5} far={4} />
      <Environment preset="city" />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.9} luminanceThreshold={0.35} luminanceSmoothing={0.4} mipmapBlur radius={0.8} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={chromaticAberrationOffset} radialModulation={false} modulationOffset={0} />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </>
  );
}

/* ───────── Fullscreen Backdrop Wrapper ───────── */
export default function AmbientGridBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#04060d", overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      {/* Animated Radial Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.25),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.2),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,_transparent_0%,_rgba(34,211,238,0.05)_25%,_transparent_50%,_rgba(59,130,246,0.05)_75%,_transparent_100%)] animate-pulse" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_#04060d_85%)]" />

      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.4, 7], fov: 50 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Particles Effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 blur-sm animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
