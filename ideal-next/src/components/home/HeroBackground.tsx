'use client';

import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import * as THREE from 'three';
import { generateStarTexture, generateNebulaTexture } from '@/utils/textureGenerator';

/**
 * Hero背景アニメーションコンポーネント
 * 単一責任: 重いThree.js背景処理のみ
 */
const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulasRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);

  // WebGLのサポートチェック
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      console.error('WebGL check failed:', e);
      return false;
    }
  };

  // Three.jsシーンの初期化
  const initThreeJS = () => {
    if (!canvasRef.current || !checkWebGLSupport()) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    // 星の生成
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2000;
      positions[i3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i3 + 2] = (Math.random() - 0.5) * 2000;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.1 + 0.5, 0.7, Math.random() * 0.5 + 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 星雲の生成
    const nebulasGroup = new THREE.Group();
    const nebulaCount = 5;

    for (let i = 0; i < nebulaCount; i++) {
      const nebulaGeometry = new THREE.PlaneGeometry(200, 200);
      
      // ランダムな色を生成
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.5, 0.5);
      
      const nebulaTexture = generateNebulaTexture(256, color, 0.3);
      const nebulaMaterial = new THREE.MeshBasicMaterial({
        map: nebulaTexture,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });

      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
      nebula.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 200
      );
      nebula.rotation.z = Math.random() * Math.PI * 2;
      nebulasGroup.add(nebula);
    }

    scene.add(nebulasGroup);

    // リファクタリング
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    starsRef.current = stars;
    nebulasRef.current = nebulasGroup;

    // アニメーションループ
    const animate = () => {
      if (starsRef.current && nebulasRef.current) {
        starsRef.current.rotation.y += 0.0005;
        nebulasRef.current.rotation.z += 0.0002;
      }

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // リサイズハンドラー
    const handleResize = () => {
      if (!renderer || !camera) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // クリーンアップ関数を返す
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.clear();
      }
    };
  };

  useEffect(() => {
    const cleanup = initThreeJS();
    return cleanup;
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex={-1}
      pointerEvents="none"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </Box>
  );
};

export default HeroBackground;
