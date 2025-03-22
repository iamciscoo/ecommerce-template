"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring, MotionProps, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = HTMLMotionProps<"div">;

interface HoverEffectProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({ 
  children, 
  scale = 1.05, 
  className,
  ...props 
}: HoverEffectProps & Omit<MotionDivProps, 'scale'>) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function PressEffect({ 
  children, 
  className,
  ...props 
}: HoverEffectProps) {
  return (
    <motion.div
      className={cn(className)}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      {...(props as MotionDivProps)}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className,
  direction = "up",
  distance = 20,
  ...props 
}: FadeInProps & Omit<MotionDivProps, 'initial' | 'animate' | 'transition'>) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getDirectionalProps = () => {
    switch (direction) {
      case "up":
        return { y: isVisible ? 0 : distance };
      case "down":
        return { y: isVisible ? 0 : -distance };
      case "left":
        return { x: isVisible ? 0 : distance };
      case "right":
        return { x: isVisible ? 0 : -distance };
      case "none":
        return {};
      default:
        return { y: isVisible ? 0 : distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...getDirectionalProps() }}
      animate={isVisible ? { opacity: 1, ...getDirectionalProps() } : {}}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface TrackCursorProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TrackCursor({ 
  children, 
  className, 
  intensity = 20,
  ...props 
}: TrackCursorProps & Omit<MotionDivProps, 'style'>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 700 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const moveX = (e.clientX - centerX) / intensity;
    const moveY = (e.clientY - centerY) / intensity;
    
    x.set(moveX);
    y.set(moveY);
  };

  return (
    <motion.div
      className={cn(className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        position: "relative",
      }}
      {...props}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface PulseProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export function Pulse({ 
  children, 
  className, 
  scale = 1.05, 
  duration = 2,
  ...props 
}: PulseProps & Omit<MotionDivProps, 'animate' | 'transition'>) {
  return (
    <motion.div
      className={cn(className)}
      animate={{ 
        scale: [1, scale, 1],
      }}
      transition={{ 
        duration,
        repeat: Infinity,
        ease: "easeInOut" 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
} 