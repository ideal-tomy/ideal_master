import React, { useEffect, useRef, useState } from 'react'
import { Box, Container, Heading, Text, Button, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import * as THREE from 'three'

const NotFoundPage: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Three.jsu306eu521du671fu5316u3068u30a2u30cbu30e1u30fcu30b7u30e7u30f3
  useEffect(() => {
    if (!canvasRef.current) return
    
    // u30ecu30f3u30c0u30e9u30fcu3001u30b7u30fcu30f3u3001u30abu30e1u30e9u306eu8a2du5b9a
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    
    // u30ecu30f3u30c0u30e9u30fcu306eu8a2du5b9a
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    canvasRef.current.appendChild(renderer.domElement)
    
    // u30abu30e1u30e9u306eu4f4du7f6eu8a2du5b9a
    camera.position.z = 5
    
    // u30e9u30a4u30c8u306eu8ffdu52a0
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0x00b8d4, 2)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)
    
    // u30d6u30e9u30c3u30afu30dbu30fcu30ebu306eu3088u3046u306au5f62u72b6u3092u4f5cu6210
    const blackHoleGeometry = new THREE.SphereGeometry(1, 32, 32)
    const blackHoleMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.8,
    })
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial)
    scene.add(blackHole)
    
    // u30d6u30e9u30c3u30afu30dbu30fcu30ebu306eu5468u308au306eu5149u306eu30eau30f3u30b0
    const ringGeometry = new THREE.RingGeometry(1.2, 2, 32)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00b8d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)
    
    // u30d1u30fcu30c6u30a3u30afu30ebu306eu751fu6210
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    
    const posArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // u4f4du7f6eu306eu8a2du5b9a
      posArray[i] = (Math.random() - 0.5) * 10
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // u30a2u30cbu30e1u30fcu30b7u30e7u30f3u30ebu30fcu30d7
    const animate = () => {
      requestAnimationFrame(animate)
      
      // u30d6u30e9u30c3u30afu30dbu30fcu30ebu306eu56deu8ee2
      blackHole.rotation.y += 0.005
      
      // u30eau30f3u30b0u306eu56deu8ee2
      ring.rotation.z += 0.003
      
      // u30d1u30fcu30c6u30a3u30afu30ebu306eu52d5u304d
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005
      
      // u30d1u30fcu30c6u30a3u30afu30ebu304cu30d6u30e9u30c3u30afu30dbu30fcu30ebu306bu5438u3044u8fbcu307eu308cu308bu52b9u679c
      const positions = particlesMesh.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        // u73feu5728u306eu4f4du7f6e
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        
        // u30d6u30e9u30c3u30afu30dbu30fcu30ebu304bu3089u306eu8dddu96e2
        const distance = Math.sqrt(x * x + y * y + z * z)
        
        // u30d6u30e9u30c3u30afu30dbu30fcu30ebu306bu5411u304bu3046u30d9u30afu30c8u30eb
        const dirX = -x / distance
        const dirY = -y / distance
        const dirZ = -z / distance
        
        // u5f15u529bu306eu5f37u3055uff08u8dddu96e2u306bu53cdu6bd4u4f8buff09
        const force = 0.0001 / (distance * distance)
        
        // u65b0u3057u3044u4f4du7f6eu3092u8a08u7b97
        positions[i] += dirX * force
        positions[i + 1] += dirY * force
        positions[i + 2] += dirZ * force
        
        // u30d6u30e9u30c3u30afu30dbu30fcu30ebu306bu5438u3044u8fbcu307eu308cu305fu30d1u30fcu30c6u30a3u30afu30ebu3092u30eau30bbu30c3u30c8
        if (distance < 1.2) {
          positions[i] = (Math.random() - 0.5) * 10
          positions[i + 1] = (Math.random() - 0.5) * 10
          positions[i + 2] = (Math.random() - 0.5) * 10
        }
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true
      
      // マウス位置に応じた動き
      blackHole.rotation.y = mousePosition.x * 0.0001
      blackHole.rotation.x = mousePosition.y * 0.0001
      ring.rotation.x = Math.PI / 2 + mousePosition.y * 0.0001
      ring.rotation.y = mousePosition.x * 0.0001
      
      renderer.render(scene, camera)
    }
    
    // マウス位置の追跡
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX - window.innerWidth / 2,
        y: event.clientY - window.innerHeight / 2
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // u30a6u30a3u30f3u30c9u30a6u30eau30b5u30a4u30bau6642u306eu51e6u7406
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    animate()
    
    // u30afu30eau30fcu30f3u30a2u30c3u30d7
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement)
      }
      scene.remove(blackHole)
      scene.remove(ring)
      scene.remove(particlesMesh)
      blackHoleGeometry.dispose()
      blackHoleMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [mousePosition])
  
  return (
    <Box
      as="section"
      h="100vh"
      w="100%"
      position="relative"
      overflow="hidden"
      bg="spaceDark"
    >
      {/* Three.jsu30adu30e3u30f3u30d0u30b9 */}
      <Box
        ref={canvasRef}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
      />
      
      {/* u30aau30fcu30d0u30fcu30ecu30a4u30b0u30e9u30c7u30fcu30b7u30e7u30f3 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial(circle at center, rgba(26, 43, 94, 0.3) 0%, rgba(10, 10, 26, 0.9) 100%)"
        zIndex={1}
      />
      
      {/* u30b3u30f3u30c6u30f3u30c4 */}
      <Container
        maxW="1200px"
        h="100%"
        position="relative"
        zIndex={2}
        centerContent
        justifyContent="center"
      >
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          px={4}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: '8xl', md: '9xl' }}
              fontWeight="bold"
              bgGradient="linear(to-r, neonBlue, neonPurple)"
              bgClip="text"
              mb={4}
              letterSpacing="tight"
            >
              404
            </Heading>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
              color="white"
              mb={6}
            >
              u30dau30fcu30b8u304cu898bu3064u304bu308au307eu305bu3093
            </Heading>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.300"
              mb={8}
              maxW="600px"
            >
              u304au63a2u3057u306eu30dau30fcu30b8u306fu30d6u30e9u30c3u30afu30dbu30fcu30ebu306bu5438u3044u8fbcu307eu308cu305fu304bu3001u5225u306eu5b87u5b99u306bu5b58u5728u3057u3066u3044u308bu53efu80fdu6027u304cu3042u308au307eu3059u3002
              u30dbu30fcu30e0u30dau30fcu30b8u306bu623bu308bu304bu3001u4ed6u306eu30dau30fcu30b8u3092u304au8a66u3057u304fu3060u3055u3044u3002
            </Text>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              as={RouterLink}
              to="/"
              variant="primary"
              size="lg"
              px={8}
              className="gradient-border"
            >
              u30dbu30fcu30e0u306bu623bu308b
            </Button>
          </motion.div>
        </Flex>
      </Container>
    </Box>
  )
}

export default NotFoundPage

