"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScissorsScrollReveal() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scissors animation
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const x = useTransform(scrollYProgress, [0.3, 0.6], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.5, 1]);

  // Header animation
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.1, 0.2], [20, 0]);

  // Paragraphs fade in one by one, then out one by one
  const ranges = [
    [0.25, 0.32, 0.75, 0.82],
    [0.32, 0.39, 0.7, 0.77],
    [0.39, 0.46, 0.65, 0.72],
    [0.46, 0.53, 0.6, 0.67],
    [0.53, 0.6, 0.55, 0.62],
  ];

  const getOpacity = ([fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]) =>
    useTransform(
      scrollYProgress,
      [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
      [0, 1, 1, 0]
    );

  const paragraphTexts = [
    "At PR Beauty, every cut is an expression of art and passion.",
    "Personalized styles that bring out your unique charm.",
    "Cutting-edge tools and techniques for flawless results.",
    "Sharp lines, bold fades, and perfect grooming every time.",
    "Book your appointment and transform your look today!",
  ];

  return (
    <div
      ref={containerRef}
      style={{
        height: "1000vh",
        background: "black",
        position: "relative",
      }}
    >
      <div style={{ height: "100vh" }} />

      <div style={{ height: "800vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: "10%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "4rem",
            color: "#fff",
            padding: "0 2rem",
            maxWidth: "900px",
            margin: "0 auto",
            userSelect: "none",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {/* Scissors */}
          <motion.img
            src="/assets/scissors.svg"
            alt="Scissors"
            style={{
              width: "12rem",
              height: "12rem",
              rotate,
              scale,
              x,
              flexShrink: 0,
            }}
          />

          {/* Right Content */}
          <div style={{ flex: 1, position: "relative" }}>
            {/* Header */}
            <motion.h1
              style={{
                opacity: headerOpacity,
                y: headerY,
                fontSize: "3.5rem",
                marginBottom: "3rem",
                fontWeight: "900",
                letterSpacing: "0.15em",
                userSelect: "none",
              }}
            >
              PR BEAUTY
            </motion.h1>

            {/* Paragraphs fade in/out */}
            {paragraphTexts.map((text, index) => (
              <motion.p
                key={index}
                style={{
                  opacity: getOpacity(ranges[index]),
                  position: "absolute",
                  top: 120 + index * 80, // each paragraph moves 80px lower than the one above
                  left: 0,
                  right: 0,
                  fontSize: "1.6rem",
                  lineHeight: 1.6,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
