"use client"
import type { FC } from "react"
import { motion, useSpring } from "framer-motion"
import React, { useState, useRef, useEffect } from "react"

const spring = {
    type: "spring",//sets the type of animation
    stiffness: 300,//sets the stiffness of the spring
    damping: 40,//sets the damping of the spring
}

interface FlipCardProps {
    question: string;
    answer: string;
    width?: string;
    height?: string;
}

const FlipCard: FC<FlipCardProps> = ({ question, answer, width = "300px", height = "200px" }) => {
    const [isFlipped, setIsFlipped] = useState(false) //state to check if the card is flipped
    const handleClick = () => {
        setIsFlipped((prevState) => !prevState)
    }

    const [rotateXaxis, setRotateXaxis] = useState(0)
    const [rotateYaxis, setRotateYaxis] = useState(0)
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = ref.current
        if (element) {
            const elementRect = element.getBoundingClientRect()//returns the size of an element and its position relative to the viewport
            const elementWidth = elementRect.width//returns the width of an element
            const elementHeight = elementRect.height//returns the height of an element
            const elementCenterX = elementWidth / 2//returns the center of the element with respect to the x-axis
            const elementCenterY = elementHeight / 2//returns the center of the element with respect to the y-axis
            const mouseX = event.clientY - elementRect.top - elementCenterY //returns the x-coordinate of the mouse pointer relative to the top of the viewport
            const mouseY = event.clientX - elementRect.left - elementCenterX//returns the y-coordinate of the mouse pointer relative to the left of the viewport
            const degreeX = (mouseX / elementWidth) * 20//calculates the degree of rotation along the x-axis
            const degreeY = (mouseY / elementHeight) * 20//calculates the degree of rotation along the y-axis
            setRotateXaxis(degreeX)//sets the degree of rotation along the x-axis
            setRotateYaxis(degreeY)//sets the degree of rotation along the y-axis
        }
    }

    const handleMouseEnd = () => {
        setRotateXaxis(0)
        setRotateYaxis(0)
    }

    const dx = useSpring(0, spring)
    const dy = useSpring(0, spring)

    useEffect(() => {
        dx.set(-rotateXaxis)//rotates the card along the x-axis and this is negative because the card is rotated in the opposite direction
        dy.set(rotateYaxis)//rotates the card along the y-axis
    }, [rotateXaxis, rotateYaxis])

    return (
        <motion.div
            onClick={handleClick}//void function!
            transition={spring}
            style={{
                perspective: "1200px",//sets the perspective view of the 3D element
                transformStyle: "preserve-3d",//sets the 3D element to be preserved
                
            }}
            className="min-w-[250px] h-[400px] mx-auto ml-[100px] mt-[100px] mb-[100px] "
        >
            <motion.div
                ref={ref}
                whileHover={{ scale: 1.1 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseEnd}
                transition={spring}
                style={{
                    width: "100%",
                    height: "100%",
                    rotateX: dx,
                    rotateY: dy,
                }}
            >
                <div
                    style={{
                        perspective: "1200px",
                        transformStyle: "preserve-3d",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <motion.div
                        animate={{ rotateY: isFlipped ? -180 : 0 }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex: isFlipped ? 0 : 1,
                            backfaceVisibility: "hidden",
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            
                            backgroundColor: "#111a22",
                            
                        }}
                        className="border-2 border-[#344d65] hover:border-[#800080] rounded-xl text-white pl-2"
                    >
                        {question}
                    </motion.div>
                    <motion.div
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: isFlipped ? 0 : 180 }}
                        transition={spring}
                        style={{
                            width: "100%",
                            height: "100%",
                            zIndex: isFlipped ? 1 : 0,
                            backfaceVisibility: "hidden",
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            color: "#fff",
                            backgroundColor: "#111a22",
                            
                        }}
                        className="border border-[#344d65] hover:border-[#00FFF1] rounded-xl "
                    >
                        {answer}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
};

export default FlipCard;