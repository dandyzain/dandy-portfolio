import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Sparkles, Move3d, Compass } from 'lucide-react';

export default function ThreeDModel({ isDarkMode = false, language = 'id' }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const modelGroupRef = useRef(null);
  const screenTextureRef = useRef(null);
  const screenCanvasRef = useRef(null);

  // Interaction & visual states
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: -0.4 });
  const currentRotationRef = useRef({ x: 0.2, y: -0.4 });
  const pointerPosRef = useRef({ x: 0, y: 0 });

  // Update animated screen texture
  const updateScreenCanvas = useCallback((time) => {
    const canvas = screenCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Dark terminal background
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, w, h);

    // Subtle matrix/circuit grid
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
    ctx.lineWidth = 1;
    const gridSize = 32;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Top window titlebar
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, w, 44);

    // Window control dots
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(24, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(44, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(64, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    // Window title text
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('dandy@portfolio: ~/core-engine (3D)', 92, 27);

    // Terminal content
    ctx.font = '15px monospace';
    
    // Line 1: Header
    ctx.fillStyle = '#a855f7';
    ctx.fillText('const developer = {', 28, 76);

    // Line 2: Name
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('  name: ', 28, 106);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('"Dandy Rahmat Zain"', 100, 106);

    // Line 3: Role
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('  role: ', 28, 136);
    ctx.fillStyle = '#34d399';
    ctx.fillText('"Full Stack & Distributed Systems"', 100, 136);

    // Line 4: Stack
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('  stack: [', 28, 166);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('"Next.js 15"', 116, 166);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(', ', 236, 166);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('"React 19"', 256, 166);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(', ', 350, 166);
    ctx.fillStyle = '#f43f5e';
    ctx.fillText('"BullMQ"', 370, 166);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('],', 450, 166);

    // Line 5: DAG Engine Status
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('  dagEngine: ', 28, 196);
    ctx.fillStyle = '#10b981';
    ctx.fillText('"Kahn\'s TopoSort Active ⚡"', 140, 196);

    // Line 6: Closing bracket
    ctx.fillStyle = '#a855f7';
    ctx.fillText('};', 28, 226);

    // Live wave telemetry
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 28; x < w - 28; x++) {
      const y = 285 + Math.sin((x * 0.04) + (time * 4)) * 14;
      if (x === 28) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Pulse prompt line
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('dandy@systems:~$ run --live', 28, 335);

    // Pulsing cursor
    if (Math.sin(time * 6) > 0) {
      ctx.fillStyle = '#34d399';
      ctx.fillRect(270, 320, 10, 18);
    }

    if (screenTextureRef.current) {
      screenTextureRef.current.needsUpdate = true;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.4);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      isDarkMode ? 0xe0e7ff : 0xffffff,
      isDarkMode ? 1.4 : 1.8
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, isDarkMode ? 2.2 : 2.5);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Center Core Light (Indigo / Purple glow)
    const coreLight = new THREE.PointLight(0x818cf8, 3.5, 6);
    coreLight.position.set(0, 0.6, 0.2);
    scene.add(coreLight);

    // Rim Light (Cyan / Teal cyber glow)
    const rimLight = new THREE.PointLight(0x38bdf8, 2.5, 8);
    rimLight.position.set(-3.5, 2.5, -2.5);
    scene.add(rimLight);

    // Accent Light (Warm Rose)
    const roseLight = new THREE.PointLight(0xf43f5e, 1.8, 6);
    roseLight.position.set(3.5, -1, 1.5);
    scene.add(roseLight);

    // 3. Build Main 3D Model Group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Materials
    const chassisColor = isDarkMode ? 0x1e293b : 0xe2e8f0;
    const accentMetalColor = isDarkMode ? 0x0f172a : 0xcfd8dc;

    const laptopChassisMat = new THREE.MeshStandardMaterial({
      color: chassisColor,
      metalness: 0.85,
      roughness: 0.22,
      wireframe: wireframeMode
    });

    const darkAccentMat = new THREE.MeshStandardMaterial({
      color: accentMetalColor,
      metalness: 0.9,
      roughness: 0.35,
      wireframe: wireframeMode
    });

    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(2.3, 0.08, 1.55);
    const laptopBase = new THREE.Mesh(baseGeo, laptopChassisMat);
    laptopBase.position.set(0, -0.04, 0);
    laptopBase.castShadow = true;
    laptopBase.receiveShadow = true;
    modelGroup.add(laptopBase);

    // Keyboard Bed
    const keyboardBedGeo = new THREE.BoxGeometry(2.0, 0.02, 0.78);
    const keyboardBed = new THREE.Mesh(keyboardBedGeo, darkAccentMat);
    keyboardBed.position.set(0, 0.01, -0.15);
    modelGroup.add(keyboardBed);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.68, 0.015, 0.42);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x334155 : 0x94a3b8,
      metalness: 0.6,
      roughness: 0.3,
      wireframe: wireframeMode
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.012, 0.44);
    modelGroup.add(trackpad);

    // Laptop Lid (Rotated ~108 degrees open)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0, -0.76);
    lidGroup.rotation.x = -Math.PI * 0.58; // open angle
    modelGroup.add(lidGroup);

    // Lid Back Case
    const lidGeo = new THREE.BoxGeometry(2.3, 1.52, 0.05);
    const laptopLid = new THREE.Mesh(lidGeo, laptopChassisMat);
    laptopLid.position.set(0, 0.76, -0.025);
    laptopLid.castShadow = true;
    lidGroup.add(laptopLid);

    // Glowing Apple / Developer Bracket on Lid Back
    const logoGlowGeo = new THREE.BoxGeometry(0.24, 0.24, 0.02);
    const logoGlowMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: wireframeMode
    });
    const logoGlow = new THREE.Mesh(logoGlowGeo, logoGlowMat);
    logoGlow.position.set(0, 0.76, -0.052);
    lidGroup.add(logoGlow);

    // Dynamic Terminal Screen
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 360;
    screenCanvasRef.current = screenCanvas;

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTextureRef.current = screenTexture;

    const screenGeo = new THREE.PlaneGeometry(2.18, 1.4);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      wireframe: wireframeMode
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.76, 0.005);
    lidGroup.add(screenMesh);

    // 4. Hovering Holographic Tech Core (Floating above keyboard)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.75, 0.1);
    modelGroup.add(coreGroup);

    // Central Glowing Crystal (Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(0.3, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.8,
      metalness: 0.2,
      roughness: 0.1,
      wireframe: wireframeMode
    });
    const centralCrystal = new THREE.Mesh(crystalGeo, crystalMat);
    coreGroup.add(centralCrystal);

    // Outer Wireframe Gyroscope (Dodecahedron)
    const outerGyroGeo = new THREE.DodecahedronGeometry(0.44, 0);
    const outerGyroMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const outerGyro = new THREE.Mesh(outerGyroGeo, outerGyroMat);
    coreGroup.add(outerGyro);

    // 5. Orbiting Satellites (Frontend, Backend, Mobile, AI/DAG)
    const satellites = [
      {
        name: 'React/Frontend',
        mesh: new THREE.Mesh(
          new THREE.TorusGeometry(0.12, 0.035, 12, 24),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6, wireframe: wireframeMode })
        ),
        radius: 1.5,
        speed: 1.2,
        tiltX: 0.3,
        tiltY: 0.2,
        offset: 0
      },
      {
        name: 'Backend/Prisma',
        mesh: new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 0.16, 6),
          new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x059669, emissiveIntensity: 0.5, wireframe: wireframeMode })
        ),
        radius: 1.75,
        speed: -0.9,
        tiltX: -0.4,
        tiltY: 0.5,
        offset: Math.PI * 0.5
      },
      {
        name: 'Mobile/Expo',
        mesh: new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.2, 0.05),
          new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x7e22ce, emissiveIntensity: 0.6, wireframe: wireframeMode })
        ),
        radius: 1.6,
        speed: 1.4,
        tiltX: 0.5,
        tiltY: -0.3,
        offset: Math.PI
      },
      {
        name: 'DAG/BullMQ',
        mesh: new THREE.Mesh(
          new THREE.OctahedronGeometry(0.12, 0),
          new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xe11d48, emissiveIntensity: 0.7, wireframe: wireframeMode })
        ),
        radius: 1.9,
        speed: -1.1,
        tiltX: -0.2,
        tiltY: -0.4,
        offset: Math.PI * 1.5
      }
    ];

    satellites.forEach(sat => {
      modelGroup.add(sat.mesh);
    });

    // 6. Holographic Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(1.68, 0.012, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
      wireframe: true
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.38;
    ring1.rotation.y = Math.PI * 0.12;
    modelGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.95, 0.008, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      wireframe: true
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.32;
    ring2.rotation.y = -Math.PI * 0.24;
    modelGroup.add(ring2);

    // 7. Ambient Particle Starfield
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4 + 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isDarkMode ? 0xa5b4fc : 0x6366f1,
      size: 0.045,
      transparent: true,
      opacity: 0.65
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    modelGroup.add(particleSystem);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Update screen text canvas every ~3 frames
      if (Math.floor(elapsedTime * 30) % 3 === 0) {
        updateScreenCanvas(elapsedTime);
      }

      // Smooth damped rotation interpolation
      if (autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.008;
      }

      // Add gentle mouse parallax tilt
      const parallaxTargetX = targetRotationRef.current.x + pointerPosRef.current.y * 0.18;
      const parallaxTargetY = targetRotationRef.current.y + pointerPosRef.current.x * 0.25;

      currentRotationRef.current.x += (parallaxTargetX - currentRotationRef.current.x) * 0.06;
      currentRotationRef.current.y += (parallaxTargetY - currentRotationRef.current.y) * 0.06;

      modelGroup.rotation.x = currentRotationRef.current.x;
      modelGroup.rotation.y = currentRotationRef.current.y;

      // Gentle floating / bobbing sine wave
      modelGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.08 - 0.1;

      // Animate Hovering Core
      centralCrystal.rotation.x = elapsedTime * 0.8;
      centralCrystal.rotation.y = elapsedTime * 1.2;
      outerGyro.rotation.x = -elapsedTime * 0.6;
      outerGyro.rotation.y = -elapsedTime * 0.9;
      const corePulse = 1 + Math.sin(elapsedTime * 3.5) * 0.08;
      coreGroup.scale.set(corePulse, corePulse, corePulse);

      // Animate Satellites
      satellites.forEach(sat => {
        const angle = elapsedTime * sat.speed + sat.offset;
        sat.mesh.position.x = Math.cos(angle) * sat.radius;
        sat.mesh.position.z = Math.sin(angle) * sat.radius;
        sat.mesh.position.y = Math.sin(angle * 2) * 0.35 + (sat.tiltX * sat.radius);
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Animate Rings
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.007;

      // Animate Starfield Embers
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling via ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup on unmount
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      renderer.dispose();
      baseGeo.dispose();
      laptopChassisMat.dispose();
      darkAccentMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      outerGyroGeo.dispose();
      outerGyroMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      satellites.forEach(sat => {
        sat.mesh.geometry.dispose();
        sat.mesh.material.dispose();
      });
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDarkMode, wireframeMode, autoRotate, updateScreenCanvas]);

  // Pointer Interaction Handlers (Mouse & Touch)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsInteracting(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    prevPointerRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      pointerPosRef.current = { x: normX, y: normY };
    }

    if (!isDraggingRef.current) return;

    const deltaX = clientX - prevPointerRef.current.x;
    const deltaY = clientY - prevPointerRef.current.y;

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x = Math.max(-0.6, Math.min(0.8, targetRotationRef.current.x + deltaY * 0.008));

    prevPointerRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsInteracting(false);
  };

  const handleResetView = () => {
    targetRotationRef.current = { x: 0.2, y: -0.4 };
    currentRotationRef.current = { x: 0.2, y: -0.4 };
    pointerPosRef.current = { x: 0, y: 0 };
    setAutoRotate(true);
  };

  return (
    <div 
      className="relative w-full h-[320px] sm:h-[380px] md:h-[400px] flex items-center justify-center select-none overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handlePointerUp();
        pointerPosRef.current = { x: 0, y: 0 };
      }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none rounded-3xl" />

      {/* Three.js Canvas Container */}
      <div 
        ref={containerRef} 
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300 ${
          isInteracting ? 'scale-[1.02]' : 'scale-100'
        }`}
      />

      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 text-indigo-700 dark:text-indigo-300 backdrop-blur-md shadow-sm border border-indigo-100 dark:border-indigo-900/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{language === 'id' ? 'Model 3D Interaktif WebGL' : '3D WebGL Interactive Model'}</span>
        </span>
      </div>

      {/* Floating Control Toolbar */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 flex items-center gap-1.5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md">
        {/* Toggle Auto-Rotate */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAutoRotate(prev => !prev);
          }}
          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            autoRotate 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title={autoRotate ? "Pause Auto-Rotate" : "Resume Auto-Rotate"}
          type="button"
        >
          <RotateCw size={14} className={autoRotate ? "animate-spin" : ""} style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline">{autoRotate ? 'Auto' : 'Paused'}</span>
        </button>

        {/* Toggle Wireframe */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWireframeMode(prev => !prev);
          }}
          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            wireframeMode 
              ? 'bg-purple-600 text-white shadow-sm' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Toggle Wireframe Shader"
          type="button"
        >
          <Move3d size={14} />
          <span className="hidden sm:inline">Wireframe</span>
        </button>

        {/* Reset Camera View */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleResetView();
          }}
          className="p-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title="Reset 3D View"
          type="button"
        >
          <Compass size={14} />
        </button>
      </div>

      {/* Interaction Hint Bottom Left */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none hidden sm:flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
        <Sparkles size={12} className="text-amber-500 shrink-0" />
        <span>{language === 'id' ? 'Tahan & geser untuk memutar 360°' : 'Click & drag to rotate 360°'}</span>
      </div>
    </div>
  );
}
