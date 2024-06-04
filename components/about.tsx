'use client'

import React from 'react'
import SectionHeading from './section-heading'
import { motion,  } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const { ref } = useInView();

  return (
    <motion.section className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28' 
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{delay: 0.175}}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>


        <p className='mb-3'>
          After working in the IT field for several years , I decided to pursue my passion for programming. I enrolled in a coding bootcamp and learned{" "}
          <span className="font-medium">full-stack web development</span>.{" "}
          <span className="italic">My favorite part of programming</span> is the
          problem-solving aspect. I <span className="underline">love</span> the
          feeling of finally figuring out a solution to a problem. My core stack
          is{" "}
          <span className="font-medium">
            React, Next.js, Node.js, and MongoDB
          </span>
          . I am also familiar with TypeScript. I am always looking to
          learn new technologies. I am currently looking for a{" "}
          <span className="font-medium">full-time position</span> as a software
          developer.
        </p>

        <p>
          <span className="italic">When I'm not coding</span>, I enjoy playing
          video games, watching movies, and taking trips .
        </p>
    </motion.section>
  )
}
