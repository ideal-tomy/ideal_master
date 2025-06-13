"use client"; // ← これを追加

import React, { useEffect, useRef } from 'react';
import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { generateStarTexture, generateNebulaTexture } from '@/utils/textureGenerator';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  canvasHeight?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  canvasHeight = '40vh',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulasRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

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

  // 星を初期化する関数
  const initStars = () => {
    console.log('[PageHeader] initStars: Start');
    if (!sceneRef.current) return;

    // 既存の星を削除
    if (starsRef.current) {
      sceneRef.current.remove(starsRef.current);
    }

    const numStars = 500;
    const positions = new Float32Array(numStars * 3);
    const colors = new Float32Array(numStars * 3);
    const sizes = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
      // 位置
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(1000);
      const z = THREE.MathUtils.randFloat(-1000, 0);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // サイズ
      sizes[i] = THREE.MathUtils.randFloat(1, 3);

      // 色
      const colorType = Math.random() * 10;
      let r, g, b;

      if (colorType < 6) {
        // 白系（少し青みがかった白）
        const brightness = THREE.MathUtils.randFloat(0.8, 1.0);
        r = brightness;
        g = brightness;
        b = brightness + THREE.MathUtils.randFloat(0, 0.08);
      } else if (colorType < 8) {
        // 青系
        r = 0.7 + THREE.MathUtils.randFloat(0, 0.3);
        g = 0.7 + THREE.MathUtils.randFloat(0, 0.3);
        b = 1.0;
      } else {
        // 黄色系
        r = 1.0;
        g = 0.85 + THREE.MathUtils.randFloat(0, 0.15);
        b = 0.4 + THREE.MathUtils.randFloat(0, 0.4);
      }

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // 星のテクスチャを生成
    const starTexture = generateStarTexture(64, '#ffffff', 0.5);

    // 星のきらめき効果用のシェーダーマテリアル
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: starTexture }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          // きらめき効果
          float twinkle = 0.7 + 0.3 * sin(time * 10.0 + float(gl_VertexID) * 0.1);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true
    });

    starsRef.current = new THREE.Points(geometry, shaderMaterial);
    sceneRef.current.add(starsRef.current);
    console.log('[PageHeader] initStars: Stars initialized and added to scene.');
  };

  // 星雲を初期化する関数
  const initNebulas = () => {
    console.log('[PageHeader] initNebulas: Start');
    if (!sceneRef.current) return;

    // 既存の星雲を削除
    if (nebulasRef.current) {
      sceneRef.current.remove(nebulasRef.current);
    }

    const numNebulas = 2;
    const group = new THREE.Group();

    for (let i = 0; i < numNebulas; i++) {
      const x = THREE.MathUtils.randFloatSpread(1000);
      const y = THREE.MathUtils.randFloatSpread(500);
      const z = THREE.MathUtils.randFloat(-1000, -500);
      const size = THREE.MathUtils.randFloat(300, 500);

      // 星雲の色をランダムに設定
      let color;
      const colorChoice = Math.random() * 3;
      if (colorChoice < 1) {
        color = new THREE.Color(0.08, 0.2, 0.8); // 青系
      } else if (colorChoice < 2) {
        color = new THREE.Color(0.6, 0.08, 0.8); // 紫系
      } else {
        color = new THREE.Color(0.8, 0.12, 0.24); // 赤系
      }

      const alpha = THREE.MathUtils.randFloat(0.1, 0.3);

      // 星雲の中心
      const nebulaMaterial = new THREE.SpriteMaterial({
        map: generateNebulaTexture(256, color, 0.7),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: alpha
      });

      const nebula = new THREE.Sprite(nebulaMaterial);
      nebula.position.set(x, y, z);
      nebula.scale.set(size, size, 1);
      nebula.userData = { rotationSpeed: Math.random() * 0.002 - 0.001 };

      group.add(nebula);

      // 星雲の外側（より透明）
      const outerMaterial = new THREE.SpriteMaterial({
        map: generateNebulaTexture(256, color, 0.4),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: alpha * 0.6
      });

      const outerNebula = new THREE.Sprite(outerMaterial);
      outerNebula.position.set(x, y, z + 50);
      outerNebula.scale.set(size * 1.5, size * 1.5, 1);
      outerNebula.userData = { rotationSpeed: Math.random() * 0.001 - 0.0005 };

      group.add(outerNebula);
    }

    nebulasRef.current = group;
    sceneRef.current.add(nebulasRef.current);
    console.log('[PageHeader] initNebulas: Nebulas initialized and added to scene.');
  };

  // アニメーションループ
  const animate = (time: number) => {
    console.log('[PageHeader] animate: Frame requested, time:', time);
    frameIdRef.current = requestAnimationFrame(animate);
    
    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) {
      console.log('[PageHeader] animate: Refs are null, returning. Camera:', cameraRef.current, 'Renderer:', rendererRef.current, 'Scene:', sceneRef.current);
      return;
    }
    
    // 時間の更新（シェーダー用）
    if (starsRef.current) {
      const material = starsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time * 0.001; // 秒単位に変換
    }
    
    // 星雲の回転
    if (nebulasRef.current) {
      nebulasRef.current.children.forEach(child => {
        if (child.userData && child.userData.rotationSpeed) {
          child.rotation.z += child.userData.rotationSpeed;
        }
      });
    }
    
    // カメラの位置を少し動かす
    cameraRef.current.position.x += (Math.random() - 0.5) * 0.05;
    cameraRef.current.position.y += (Math.random() - 0.5) * 0.05;
    cameraRef.current.lookAt(0, 0, -1000);
    
    // レンダリング
    console.log('[PageHeader] animate: Rendering frame.');
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  // リサイズハンドラ
  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current || !canvasRef.current) return;
    
    const width = window.innerWidth;
    const heightValue = parseInt(canvasHeight.replace('vh', '')) * window.innerHeight / 100;
    
    cameraRef.current.aspect = width / heightValue;
    cameraRef.current.updateProjectionMatrix();
    
    rendererRef.current.setSize(width, heightValue);
  };

  // 初期化
  useEffect(() => {
    console.log('[PageHeader] useEffect: Start');
    // WebGLサポートチェック
    const isWebGLSupported = checkWebGLSupport();
    if (!isWebGLSupported) {
      console.warn('WebGL is not supported');
      return;
    }
    
    // DOM要素が確実に準備できるようにするための短い遅延
    const initTimeout = setTimeout(() => {
      if (!canvasRef.current) {
        console.log('[PageHeader] useEffect: canvasRef.current is null, returning.');
        return;
      }
      console.log('[PageHeader] useEffect: canvasRef.current:', canvasRef.current);
      
      // シーンの作成
      const scene = new THREE.Scene();
      // scene.fog = new THREE.FogExp2(0x000000, 0.0003); // フォグを一時的に無効化
      sceneRef.current = scene;
      console.log('[PageHeader] useEffect: Scene initialized:', sceneRef.current);
      
      // カメラの作成
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / (parseInt(canvasHeight.replace('vh', '')) * window.innerHeight / 100),
        1,
        2000
      );
      camera.position.z = 500;
      cameraRef.current = camera;
      console.log('[PageHeader] useEffect: Camera initialized:', cameraRef.current);
      
      // レンダラーの作成
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      });
      renderer.setSize(
        window.innerWidth, 
        parseInt(canvasHeight.replace('vh', '')) * window.innerHeight / 100
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;
      if (canvasRef.current) {
        canvasRef.current.style.zIndex = '1'; // z-indexを前面に
      }
      console.log('[PageHeader] useEffect: Renderer initialized:', rendererRef.current);
      
      // 星と星雲の初期化
      console.log('[PageHeader] useEffect: Calling initStars...');
      initStars();
      console.log('[PageHeader] useEffect: Calling initNebulas...');
      initNebulas();
      
      // イベントリスナーの設定
      window.addEventListener('resize', handleResize);
      
      // アニメーションの開始
      console.log('[PageHeader] useEffect: Starting animation loop...');
      frameIdRef.current = requestAnimationFrame(animate);
    }, 100);
    
    // クリーンアップ
    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [canvasHeight]);

  return (
    <Box
      as="section"
      position="relative"
      height={canvasHeight}
      minHeight="300px"
      width="100%"
      overflow="hidden"
      // bg="spaceDark" // グローバル背景との競合を避けるため一時コメントアウト
      data-testid="page-header"
      mb={10}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // zIndex: -1, // PageHeader内のコンテンツより後ろに配置
        }}
      />
      <Container
        maxW="container.xl"
        height="100%"
        position="relative" // テキストコンテンツを含むコンテナ
        zIndex={1}          // テキストコンテンツをPageHeaderのcanvasより前面に
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        px={{ base: 4, md: 6 }} // レスポンシブなパディング
      >
        <Stack
          spacing={{ base: 3, md: 4 }} // レスポンシブなスペーシング
          w={{ base: '95%', md: '80%', lg: '70%' }}
          mx="auto"
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              color="white" // タイトルを白に
              letterSpacing="wider"
              mb={subtitle || description ? { base: 3, md: 4 } : 0}
              // グラデーションとフィルターを一旦削除。必要なら再追加・調整
            >
              {title}
            </Heading>
          </motion.div>

          {subtitle && (
            <motion.div variants={itemVariants}>
              <Text
                fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} // サブタイトルを少し大きく
                color="gray.200" // サブタイトルをライトグレーに
                maxW="800px"
                mx="auto"
                mt={{ base: 2, md: 3 }}
              >
                {subtitle}
              </Text>
            </motion.div>
          )}

          {description && (
            <motion.div variants={itemVariants}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.300" // 説明文をライトグレーに
                maxW="container.md"
                mx="auto"
                mt={{ base: 2, md: 3 }}
              >
                {description}
              </Text>
            </motion.div>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default PageHeader;
