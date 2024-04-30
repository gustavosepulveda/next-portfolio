'use client'


import React from 'react'
import Image from 'next/image'
import gusPic from '@/public/gus-profile-pic.jpg'
import { motion } from 'framer-motion'


export default function Intro() {
  return (
    <section>
      <div className='flex items-center justify-center'>
        <div className='relative'>
          <motion.div 
          initial={{opacity: 0, scale: 0}}
          animate={{opacity: 1, scale: 1}}
          transition={{
            type:'tween',
            duration: 0.2,
            
          }}
          >
          <Image
            src={gusPic}
            alt='Gus Portrait'
            width='192'
            height='192'
            quality='95'
            priority={true}
            className='h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl'
          />
          </motion.div>

          <motion.span className='text-4xl absolute bottom-0 right-0'
          initial={{opacity: 0, scale: 0}}
          animate={{opacity: 1, scale: 1}}
          transition={{
            type:'spring',
            stiffness: 125,
            delay: 0.1,
            duration: 0.7,
          }}
          >
            👋
            </motion.span>
        </div>
      </div>
      <p className='mb-10 mt-4 px-4 text-2xl font-medium leading-[1.5]'>
      <span className="font-bold">Hello, I'm Gustavo.</span> I'm a{" "}
        <span className="font-bold">full-stack developer</span> with{" "}
        <span className="font-bold">2 years</span> of experience. I enjoy
        building <span className="italic">sites & apps</span>. My focus is{" "}
        <span className="underline">React (Next.js)</span>.
      </p>
    </section>
  )
}

//test push