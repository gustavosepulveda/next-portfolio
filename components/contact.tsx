import React from 'react'
import SectionHeading from '@/components/section-heading'
import { FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id='contact' className="mb-20 sm:mb-28 w-[min(100%, 38rem)]">
      <SectionHeading>Contact Me</SectionHeading>
      <p className="text-gray-700">Please contact me directly at <a className="underline" href="mailto:gustavosepulveda@ymail.com">gustavosepulveda@ymail.com</a></p>
      <form className="mt-10">
        <input className="h-14 rounded-lg borderBlack" type="email" />
        <textarea className="h-52 my-3 rounded-lg borderBlack" />
        <button type="submit">
          Submit <FaPaperPlane />
          </button>
      </form>

    </section>
  )
}
