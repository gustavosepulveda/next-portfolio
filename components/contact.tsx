import React from 'react'
import SectionHeading from '@/components/section-heading'
import { FaPaperPlane } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id='contact' className="mb-20 sm:mb-28 w-[min(100%, 38rem)]">
      <SectionHeading>Contact Me</SectionHeading>
      <p>Please contact me directly at <a className="underline" href="mailto:gustavosepulveda@ymail.com">gustavosepulveda@ymail.com</a></p>
      <form>
        <input type="email" />
        <textarea />
        <button type="submit">
          Submit <FaPaperPlane />
          </button>
      </form>

    </section>
  )
}
