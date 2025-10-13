'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Text, useToast, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { generateStarTexture, generateNebulaTexture } from '@/utils/textureGenerator'; // エイリアスパスに変更
import { GradientText } from '@/components/common/GradientText'; // エイリアスパスに変更

interface HeroProps {
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({
  subtitle = '最先端技術で未来を創造する',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulasRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [textScale, setTextScale] = useState(0.7); // テキストスケール初期値
  const growIntervalRef = useRef<NodeJS.Timeout | null>(null); // インターバルを保持
  const toast = useToast();

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

  // タイプライター効果
  useEffect(() => {
    if (!subtitle) return;
    
    let currentIndex = 0;
    setTypedText('');
    setIsTypingComplete(false);
    setTextScale(0.7); // 初期サイズをリセット
    
    // Grow Intervalをクリア
    if (growIntervalRef.current) {
      clearInterval(growIntervalRef.current);
      growIntervalRef.current = null;
    }
    
    const typingInterval = setInterval(() => {
      if (currentIndex < subtitle.length) {
        setTypedText(subtitle.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        
        // タイピング完了後、テキストサイズを徐々に大きくする
        const totalDuration = 5000; // 5秒
        const steps = 100; // ステップ数
        const interval = totalDuration / steps; // 各ステップの間隔
        const increment = (1 - 0.7) / steps; // 各ステップの増加量
        
        let currentStep = 0;
        growIntervalRef.current = setInterval(() => {
          currentStep++;
          const newScale = 0.7 + (increment * currentStep);
          setTextScale(Math.min(newScale, 1)); // 1を超えないように制限
          
          if (currentStep >= steps) {
            if (growIntervalRef.current) {
              clearInterval(growIntervalRef.current);
              growIntervalRef.current = null;
            }
          }
        }, interval);
      }
    }, 250); // 文字の表示速度を遅くする（ミリ秒）
    
    // クリーンアップ
    return () => {
      clearInterval(typingInterval);
      if (growIntervalRef.current) {
        clearInterval(growIntervalRef.current);
        growIntervalRef.current = null;
      }
    };
  }, [subtitle]);

  // ウィンドウサイズ変更時の処理
  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current || !canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    
    rendererRef.current.setSize(width, height);
  };

  // 星を初期化する関数
  const initStars = () => {
    if (!sceneRef.current) return;

    if (starsRef.current) {
      sceneRef.current.remove(starsRef.current);
    }

    const numStars = 1000;
    const positions = new Float32Array(numStars * 3);
    const colors = new Float32Array(numStars * 3);
    const sizes = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
      const x = THREE.MathUtils.randFloatSpread(4000);
      const y = THREE.MathUtils.randFloatSpread(4000);
      const z = THREE.MathUtils.randFloat(-4000, 0);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      sizes[i] = THREE.MathUtils.randFloat(1, 4);

      const colorType = Math.random() * 10;
      let r, g, b;

      if (colorType < 6) {
        const brightness = THREE.MathUtils.randFloat(0.8, 1.0);
        r = brightness;
        g = brightness;
        b = brightness + THREE.MathUtils.randFloat(0, 0.08);
      } else if (colorType < 8) {
        r = 0.7 + THREE.MathUtils.randFloat(0, 0.3);
        g = 0.7 + THREE.MathUtils.randFloat(0, 0.3);
        b = 1.0;
      } else {
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

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: generateStarTexture() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          float twinkle = sin(time * 5.0 + position.x * 0.05 + position.y * 0.05 + position.z * 0.05) * 0.5 + 0.5;
          gl_PointSize = size * (300.0 / -mvPosition.z) * (0.7 + 0.3 * twinkle);
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
      depthTest: false,
      transparent: true
    });

    const stars = new THREE.Points(geometry, material);
    starsRef.current = stars;
    sceneRef.current.add(stars);
  };

  const initNebulas = () => {
    if (!sceneRef.current) return;

    if (nebulasRef.current) {
      sceneRef.current.remove(nebulasRef.current);
    }

    const group = new THREE.Group();
    const numNebulas = 5;

    for (let i = 0; i < numNebulas; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloat(-3000, -500);
      const size = THREE.MathUtils.randFloat(400, 800);
      let color;
      const colorType = Math.random();
      if (colorType < 0.33) {
        color = new THREE.Color(0.2, 0.4, 0.8);
      } else if (colorType < 0.66) {
        color = new THREE.Color(0.5, 0.2, 0.8);
      } else {
        color = new THREE.Color(0.8, 0.6, 0.2);
      }
      const alpha = THREE.MathUtils.randFloat(0.2, 0.4);

      const outerMaterial = new THREE.SpriteMaterial({
        map: generateNebulaTexture(256, color, 0.2),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: alpha,
        rotation: Math.random() * Math.PI * 2
      });

      const outerNebula = new THREE.Sprite(outerMaterial);
      outerNebula.position.set(x, y, z + 50);
      outerNebula.scale.set(size * 1.5, size * 1.5, 1);
      outerNebula.userData = { rotationSpeed: Math.random() * 0.001 - 0.0005 };
      group.add(outerNebula);

      for (let j = 0; j < 5; j++) {
        const offsetX = THREE.MathUtils.randFloatSpread(size * 0.3);
        const offsetY = THREE.MathUtils.randFloatSpread(size * 0.3);
        const offsetZ = THREE.MathUtils.randFloatSpread(size * 0.1);
        const cloudSize = THREE.MathUtils.randFloat(size * 0.2, size * 0.5);
        const alphaOffset = THREE.MathUtils.randFloatSpread(0.1);

        const cloudMaterial = new THREE.SpriteMaterial({
          map: generateNebulaTexture(128, color, 0.5),
          blending: THREE.AdditiveBlending,
          transparent: true,
          opacity: alpha * 0.7 + alphaOffset,
          rotation: Math.random() * Math.PI * 2
        });

        const cloud = new THREE.Sprite(cloudMaterial);
        cloud.position.set(x + offsetX, y + offsetY, z + offsetZ);
        cloud.scale.set(cloudSize, cloudSize, 1);
        cloud.userData = { rotationSpeed: Math.random() * 0.003 - 0.0015 };
        group.add(cloud);
      }
    }

    nebulasRef.current = group;
    sceneRef.current.add(nebulasRef.current);
  };

  const animate = (time: number) => {
    frameIdRef.current = requestAnimationFrame(animate);

    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    const t = time * 0.001;

    if (starsRef.current && starsRef.current.material instanceof THREE.ShaderMaterial) {
      starsRef.current.material.uniforms.time.value = t;

      const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 1;

        if (positions[i + 2] > 500) {
          positions[i] = THREE.MathUtils.randFloatSpread(4000);
          positions[i + 1] = THREE.MathUtils.randFloatSpread(4000);
          positions[i + 2] = -4000;
        }
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (nebulasRef.current) {
      nebulasRef.current.children.forEach((child) => {
        if (child instanceof THREE.Sprite) {
          child.material.rotation += child.userData.rotationSpeed;
          
          const scaleOffset = Math.sin(t * 0.5 + child.userData.rotationSpeed * 10) * 0.05;
          const baseScale = child.userData.baseScale || child.scale.x;
          
          if (!child.userData.baseScale) {
            child.userData.baseScale = child.scale.x;
          }
          
          child.scale.set(
            baseScale * (1 + scaleOffset),
            baseScale * (1 + scaleOffset),
            1
          );
        }
      });
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  useEffect(() => {
    const isWebGLSupported = checkWebGLSupport();
    setWebGLSupported(isWebGLSupported);

    if (!isWebGLSupported) {
      toast({
        title: 'WebGLがサポートされていません',
        description: 'お使いのブラウザはWebGLをサポートしていないため、簡易表示モードで表示します。',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const initTimeout = setTimeout(() => {
      if (!canvasRef.current) return;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      camera.position.z = 500;
      camera.lookAt(0, 0, -1000);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;

      initStars();
      initNebulas();

      window.addEventListener('resize', handleResize);

      frameIdRef.current = requestAnimationFrame(animate);
    }, 100);

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
  }, [toast]);

  return (
    <Box as="section" position="relative" height="100vh" overflow="hidden" data-testid="hero-section">
      {webGLSupported ? (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={-1}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block'
            }}
            data-testid="hero-canvas"
          />
        </Box>
      ) : (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="linear-gradient(to bottom, #0a0a1a 0%, #1a2b5e 100%)"
          zIndex={-1}
        />
      )}

      <Container
        maxW="container.xl"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        zIndex={1}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Text
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            color="whiteAlpha.900"
            textAlign="center"
            fontWeight="bold"
            textShadow="0 0 10px rgba(0,184,212,0.5)"
            letterSpacing="wider"
            transform={`scale(${textScale})`}
          >
            {typedText}
            {!isTypingComplete && (
              <Box as="span" ml={1} animation="blink 1s step-end infinite">
                |
              </Box>
            )}
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;