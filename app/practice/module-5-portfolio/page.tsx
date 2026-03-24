'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export default function Module5Portfolio() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'success' | 'error' | ''>('')
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [isDark, setIsDark] = useState(false)
  const [formValues, setFormValues] = useState({ user_name: '', user_email: '', message: '' })


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') setIsDark(true)
  }, [])


  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('darkMode', isDark.toString())
  }, [isDark])


  useEffect(() => {
    const cards = document.querySelectorAll('.project-card')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting && !visibleCards.includes(idx)) {
            setVisibleCards(prev => [...prev, idx])
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [loading, visibleCards])

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return
    emailjs
      .sendForm('service_78sivrc', 'template_mw5wxlk', formRef.current, 'GhA8jXNTSVE36AlQE')
      .then(() => {
        setStatus('success')
        formRef.current?.reset()
        setFormValues({ user_name: '', user_email: '', message: '' })
      })
      .catch(() => setStatus('error'))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({ ...prev, [name]: value }))
  }

  const isFormValid = formValues.user_name && formValues.user_email && formValues.message

  if (loading) {
    return (
      <div className="min-h-screen bg-[#c8dff5] dark:bg-gray-900 p-8 animate-pulse">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    )
  }

  const projects = [
    {
      title: 'Ultraverse',
      img: '/ultraverse.png',
      desc: 'A blockchain-powered marketplace where users can create, sell, and collect unique digital assets (NFTs).',
      link: 'https://raquelle-virtual-internship-git-d84859-raquellediannes-projects.vercel.app/',
    },
    {
      title: 'YouTube Clone',
      img: '/youtube-clone.png',
      desc: 'Responsive video platform UI built to replicate core YouTube features.',
      link: 'https://youtube-clone-rose-sigma.vercel.app/',
    },
    {
      title: 'Netflix Clone',
      img: '/netflix-clone.png',
      desc: 'Streaming-style UI with modern design patterns and responsive layouts.',
      link: 'https://netflix-clone-nu-lovat.vercel.app',
    },
    {
      title: 'Summarist',
      img: '/summarist.png',
      desc: 'A knowledge‑boosting web app that lets users quickly understand the core ideas of books, articles, and content without reading the full text.',
      link: '#',
    },
  ]

  return (
    <div className="min-h-screen bg-[#e6f0fa] dark:bg-gray-900 scroll-smooth">
 
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="text-xl font-bold text-gray-900 dark:text-white">Portfolio</div>

    
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            <a
              href="#hero"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </a>
            <a
              href="#projects"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Projects
            </a>
            <a
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </a>

           
            <button
              onClick={() => setIsDark(prev => !prev)}
              className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

        
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsDark(prev => !prev)}
              className="mr-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
            <a
              href="#hero"
              className="block px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Home
            </a>
            <a
              href="#projects"
              className="block px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Projects
            </a>
            <a
              href="#about"
              className="block px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      <section
        id="hero"
        className="bg-[url('/background.jpg')] bg-cover bg-center text-white py-20 text-center relative"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Raquelle Cadena</h1>
          <p className="text-xl mb-2">Frontend Developer</p>
          <p className="text-lg mb-6 max-w-xl mx-auto opacity-90 animate-fadeIn">
            I build responsive, high-performance web applications with React and TypeScript, focused
            on creating seamless user experiences that feel intuitive and modern.
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold 
                       hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 1.5s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 0.9;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      <section id="projects" className="py-20 bg-blue-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((p, i) => (
              <ProjectCard
                key={i}
                title={p.title}
                description={p.desc}
                img={p.img}
                link={p.link}
                visible={visibleCards.includes(i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      
      <section id="about" className="py-20 bg-blue-200 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-900 dark:text-white">About Me</h2>
          <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
            <div className="w-48 h-48 relative">
              <Image
                src="/profile.jpg"
                alt="Profile"
                fill
                className="rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="max-w-2xl text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I’m a frontend developer with training from Frontend Simplified, focused on building
                responsive and visually polished web applications using React, TypeScript, and
                modern JavaScript.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Through hands-on projects, I’ve built API-based applications and clones of YouTube,
                Netflix, and more.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                I’m excited to join a team where I can contribute to meaningful products and
                continue growing as a frontend developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section id="contact" className="py-20 bg-blue-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Contact Me</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10">
            Have an opportunity or just want to connect? Send me a message!
          </p>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6 text-left">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              value={formValues.user_name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 active:ring-blue-700 transition-all duration-300"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              value={formValues.user_email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 active:ring-blue-700 transition-all duration-300"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              value={formValues.message}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 active:ring-blue-700 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
                 ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' : 'bg-blue-300 text-white cursor-not-allowed'}`}
            >
              Send Message
            </button>
          </form>

          {status === 'success' && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg inline-block">
              ✅ Your message has been sent! I’ll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg inline-block">
              ❌ Something went wrong. Please try again.
            </div>
          )}
        </div>
      </section>

      
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© 2026 Raquelle Cadena</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://github.com/raquelledianne"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Raquelle Cadena GitHub"
            className="text-gray-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.807 1.305 3.492.997.107-.775.418-1.305.76-1.605-2.665-.303-5.467-1.332-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3-.404c1.02.004 2.047.138 3 .404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.37.814 1.102.814 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.628-5.372-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/raquelle-cadena-7493013a7/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Raquelle Cadena LinkedIn"
            className="text-gray-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.5h3.414v1.569h.05c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.27 2.37 4.27 5.455v6.326zM5.337 8.433c-1.145 0-2.072-.928-2.072-2.072 0-1.146.927-2.073 2.072-2.073 1.145 0 2.073.927 2.073 2.073 0 1.144-.928 2.072-2.073 2.072zm1.777 12.019h-3.554v-11.5h3.554v11.5z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  img,
  link,
  visible,
  index,
}: {
  title: string
  description: string
  img: string
  link: string
  visible: boolean
  index: number
}) {
  return (
    <div
      data-index={index}
      className={`project-card group relative overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-lg shadow transform transition duration-700 
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                  hover:-translate-y-2 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="h-40 bg-gray-300 dark:bg-gray-600 relative">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-medium"
        >
          View Project →
        </a>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
    </div>
  )
}
