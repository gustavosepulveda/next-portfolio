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
    </section>
  )
}
