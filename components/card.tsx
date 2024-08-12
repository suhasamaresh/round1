"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import FlipCard from "./flipcard";

const FlipCardPage: React.FC = () => {
  const carousel = useRef<HTMLDivElement>(null);
  const cardWidth = 320; 
  const [flashcards, setFlashcards] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    // Fetch flashcards from the API
    const fetchFlashcards = async () => {
      try {
        const response = await fetch("/api/flashcard");
        const data = await response.json();
        setFlashcards(data.flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleNext = () => {
    if (carousel.current) {
      const currentX = carousel.current.scrollLeft;
      carousel.current.scrollTo({
        left: currentX + cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (carousel.current) {
      const currentX = carousel.current.scrollLeft;
      carousel.current.scrollTo({
        left: currentX - cardWidth,
        behavior: "smooth",
      });
    }
  };

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className='xl:ml-[200px] xl:mr-[200px] ml-10 mr-10 pb-20 lg:ml-[150px] lg:mr-[150px]'>
      <motion.div ref={carousel} className="carousel" style={{ overflow: "hidden", display: "flex" }}>
        <motion.div className="inner-carousel" drag='x' dragConstraints={{ right: 0, left: -width }} style={{ display: "flex", flexDirection: "row" }}>
          {flashcards.map((flashcard, index) => (
            <FlipCard
              key={index}
              question={flashcard.question}
              answer={flashcard.answer}
              width="300px"
              height="500px"
            />
          ))}
        </motion.div>
      </motion.div>
      <div className="mt-5 flex justify-between">
        <button onClick={handlePrevious} className="border border-slate-700 text-white rounded-full px-6 py-3">
          Previous
        </button>
        <button onClick={handleNext} className="border border-slate-700 text-white rounded-full px-6 py-3">
          Next
        </button>
      </div>
    </div>
  );
};

export default FlipCardPage;
