import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import FallbackSpaceBackground from './FallbackSpaceBackground';

interface SpaceBackgroundProps {
  height?: string;
  position?: 'fixed' | 'absolute';
  zIndex?: number;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({
  height = '100vh',
  position = 'absolute',
  zIndex = -1
}) => {
  const mount = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    if (!mount.current) return;

    // WebGLサポートチェック
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

    if (!checkWebGLSupport()) {
      setWebGLSupported(false);
      return;
    }

    // シーン、カメラ、レンダラーの設定
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    // レンダラーの設定
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.current.appendChild(renderer.domElement);

    // カメラの位置設定
    camera.position.z = 5;

    // 星の生成
    const stars = new THREE.Group();
    for (let i = 0; i < 1000; i++) {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 4, 4),
        new THREE.MeshBasicMaterial({ color: '#ffffff' })
      );
      star.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      stars.add(star);
    }
    scene.add(stars);

    // オービットコントロールの設定
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);
      
      // 星の動き
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0002;
      
      renderer.render(scene, camera);
    };
    animate();

    // ウィンドウサイズ変更時の処理
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mount.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <Box
      height={height}
      position={position}
      zIndex={zIndex}
      overflow="hidden"
    >
      {!webGLSupported && <FallbackSpaceBackground height={height} position={position} zIndex={zIndex} />}
      <div ref={mount} />
    </Box>
  );
};

export default SpaceBackground;
