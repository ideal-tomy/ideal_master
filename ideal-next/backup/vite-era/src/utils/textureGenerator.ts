/**
 * テクスチャ生成ユーティリティ
 * Three.jsで使用するテクスチャを動的に生成する関数を提供します
 */

import * as THREE from 'three';

/**
 * 星のテクスチャを生成する
 * @param size テクスチャのサイズ
 * @param color 星の色
 * @param coreSize 星の中心部分のサイズ
 * @returns THREE.Texture
 */
export const generateStarTexture = (
  size: number = 64,
  color: string = '#ffffff',
  coreSize: number = 0.5
): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  
  if (!context) return new THREE.Texture();
  
  // 背景を透明に
  context.clearRect(0, 0, size, size);
  
  // 光の拡散効果を持つグラデーション
  const gradient = context.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  
  // 中心は白く輝く
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  
  // 指定された色に変化
  gradient.addColorStop(coreSize, color);
  
  // 外側は徐々に透明に
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  
  // 光花効果を追加
  context.globalCompositeOperation = 'lighter';
  
  // 水平方向の光花
  context.beginPath();
  context.moveTo(0, size / 2);
  context.lineTo(size, size / 2);
  context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  context.lineWidth = 1;
  context.stroke();
  
  // 垂直方向の光花
  context.beginPath();
  context.moveTo(size / 2, 0);
  context.lineTo(size / 2, size);
  context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  context.lineWidth = 1;
  context.stroke();
  
  // 斜め方向の光花
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(size, size);
  context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  context.lineWidth = 1;
  context.stroke();
  
  context.beginPath();
  context.moveTo(size, 0);
  context.lineTo(0, size);
  context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  context.lineWidth = 1;
  context.stroke();
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  
  return texture;
};

/**
 * 星雲のテクスチャを生成する（円形）
 * @param size テクスチャのサイズ
 * @param color 星雲の色
 * @param intensity 強度
 * @returns THREE.Texture
 */
export const generateNebulaTexture = (
  size: number = 256,
  color: THREE.Color,
  intensity: number = 0.7
): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  
  if (!context) return new THREE.Texture();
  
  // 背景を透明に
  context.clearRect(0, 0, size, size);
  
  // 円形の星雲を描画
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;
  
  const r = Math.floor(color.r * 255);
  const g = Math.floor(color.g * 255);
  const b = Math.floor(color.b * 255);
  
  // 円形のグラデーション
  const gradient = context.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, radius
  );
  
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${intensity})`);
  gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${intensity * 0.5})`);
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fill();
  
  // ノイズを追加
  context.globalCompositeOperation = 'screen';
  
  // ランダムな小さな雲を追加（円形に制限）
  for (let i = 0; i < 20; i++) {
    // 円の中にランダムな点を生成
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius * 0.8; // 中心から80%以内の距離に制限
    
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    const cloudRadius = Math.random() * (size / 8) + (size / 20);
    const opacity = Math.random() * 0.5;
    
    const cloudGradient = context.createRadialGradient(
      x, y, 0,
      x, y, cloudRadius
    );
    
    cloudGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
    cloudGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    context.fillStyle = cloudGradient;
    context.beginPath();
    context.arc(x, y, cloudRadius, 0, Math.PI * 2);
    context.fill();
  }
  
  // より複雑なディテールを追加（円形に制限）
  context.globalCompositeOperation = 'overlay';
  
  // 円形の範囲内にノイズパターンを生成
  for (let x = 0; x < size; x += 3) {
    for (let y = 0; y < size; y += 3) {
      // 中心からの距離を計算
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 円の内側にのみノイズを追加
      if (distance < radius && Math.random() > 0.85) {
        const brightness = Math.random() * 0.2;
        context.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        context.fillRect(x, y, 3, 3);
      }
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  
  return texture;
};
