import React, { useEffect, useRef } from 'react';

type ParticleType = 
  | 'portal'
  | 'magic'
  | 'explosion'
  | 'levelUp'
  | 'skillLearn'
  | 'healing'
  | 'coinCollect'
  | 'damage'
  | 'bossSpawn';

interface Particle {
  id: string;
  type: ParticleType;
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  color: string;
  life: number;
  maxLife: number;
  gravity: number;
  rotation: number;
  rotationSpeed: number;
}

interface ParticleEffectsProps {
  children: React.ReactNode;
}

export default function ParticleEffects({ children }: ParticleEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  // Particle colors
  const particleColors = {
    portal: 'rgba(100, 150, 255, 0.8)',
    magic: 'rgba(150, 100, 255, 0.8)',
    explosion: 'rgba(255, 100, 50, 0.9)',
    levelUp: 'rgba(100, 255, 100, 0.9)',
    skillLearn: 'rgba(100, 255, 255, 0.9)',
    healing: 'rgba(50, 255, 50, 0.8)',
    coinCollect: 'rgba(255, 215, 0, 0.9)',
    damage: 'rgba(255, 50, 50, 0.8)',
    bossSpawn: 'rgba(200, 50, 255, 0.9)',
  };

  const createParticle = (type: ParticleType, x: number, y: number): Particle => {
    const colors = particleColors[type];
    const baseSize = type === 'explosion' ? 8 : type === 'bossSpawn' ? 20 : 4;
    const life = type === 'explosion' ? 30 : type === 'levelUp' ? 60 : 40;
    const gravity = type === 'explosion' ? -0.2 : 0.3;

    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x,
      y,
      size: baseSize,
      velocityX: (Math.random() - 0.5) * 5,
      velocityY: (Math.random() - 0.5) * 5 - 1,
      color: colors,
      life,
      maxLife: life,
      gravity,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
    };
  };

  const addParticles = (type: ParticleType, x: number, y: number, count: number = 1) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(type, x, y));
    }
  };

  const updateParticles = () => {
    particlesRef.current = particlesRef.current
      .map(particle => {
        // Update physics
        particle.velocityY += particle.gravity;
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.rotation += particle.rotationSpeed;
        particle.life--;

        return particle;
      })
      .filter(particle => particle.life > 0);

    if (particlesRef.current.length > 0) {
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    }
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      const scale = alpha * (particle.type === 'explosion' ? 2 : 1);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);

      if (particle.type === 'explosion') {
        // Draw explosion
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
      } else if (particle.type === 'coinCollect') {
        // Draw coin (simple circle with sparkle)
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.moveTo(0, -particle.size * scale * 0.3);
        ctx.lineTo(0, -particle.size * scale * 0.7);
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size * scale * 0.1;
        ctx.stroke();
      } else {
        // Draw basic particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  };

  const animate = () => {
    updateParticles();
    drawParticles();
    
    if (particlesRef.current.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    // Make particle functions available globally
    (window as any).addParticles = addParticles;
    
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: '100%', height: '100%' }}
      />
      {children}
    </>
  );
}