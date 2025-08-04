"use client"

import { useState, useEffect } from "react"
import { Instagram, Linkedin, Github, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAbsorbing, setIsAbsorbing] = useState(false)
  const [isAbsorbed, setIsAbsorbed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogoClick = () => {
    const currentWidth = window.innerWidth

    if (currentWidth < 768) {
      // On mobile (<768px), clicking logo toggles the mobile menu
      setIsMobileMenuOpen(!isMobileMenuOpen)
    } else if (currentWidth >= 768) {
      // On desktop/tablet (>=768px), clicking logo triggers absorption animation
      if (isAbsorbed) {
        setIsAbsorbed(false)
        setIsAbsorbing(false)
      } else {
        setIsAbsorbing(true)
        setTimeout(() => {
          setIsAbsorbed(true)
          setIsAbsorbing(false)
        }, 800)
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false) // Close mobile menu after navigating
  }

  return (
    <header
      className={`fixed top-4 z-50 transition-all duration-300
        left-4 md:left-1/2 md:-translate-x-1/2`}
    >
      <nav
        className={`mx-auto rounded-full transition-all duration-300 bg-[#0b132b]
          ${isScrolled && !isAbsorbed ? "glass-effect-scrolled shadow-lg" : ""}
          
          // Mobile specific classes (default)
          w-16 h-16 p-0 flex justify-center items-center
          
          // Desktop/Tablet specific classes (md and above)
          ${!isAbsorbed ? "md:w-auto md:h-auto md:px-6 md:py-4 md:flex md:justify-between" : "md:w-auto md:h-auto md:px-6 md:py-4 md:flex md:justify-between bg-[#ED254E00]"}
          ${!isAbsorbed ? "md:min-w-[700px] lg:min-w-[1000px]" : "md:min-w-[700px] lg:min-w-[1000px]"}
        `}
      >
        {/* Logo (for closed state on mobile and desktop) */}
        <div
          className="cursor-pointer hover:scale-110 transition-transform flex items-center relative z-10 logo-hover-effect" // Added logo-hover-effect class
          onClick={handleLogoClick}
        >
          <img
            src="/logo.svg"
            alt="SK Logo"
            className="w-8 h-8 md:w-10 md:h-10"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(85%) sepia(85%) saturate(2000%) hue-rotate(140deg) brightness(110%) contrast(110%)",
            }}
          />
        </div>

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex items-center space-x-8 transition-all duration-500 ${
            isAbsorbing ? "animate-absorb-to-logo" : ""
          } ${isAbsorbed ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"}`}
        >
          <button
            onClick={() => scrollToSection("home")}
            className="text-[#6fffe9] hover:text-white transition-colors whitespace-nowrap"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-[#6fffe9] hover:text-white transition-colors whitespace-nowrap"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("experiences")}
            className="text-[#6fffe9] hover:text-white transition-nowrap"
          >
            Experiences
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-[#6fffe9] hover:text-white transition-colors whitespace-nowrap"
          >
            Projects
          </button>
        </div>

        {/* Social Icons */}
        <div
          className={`hidden md:flex items-center space-x-4 transition-all duration-500 ${
            isAbsorbing ? "animate-absorb-to-logo" : ""
          } ${isAbsorbed ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"}`}
        >
          <a href="https://www.instagram.com/shaquille_kana" className="text-[#6fffe9] hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://www.linkedin.com/in/shaquille-kana/ " className="text-[#6fffe9] hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/ShaquilleKana" className="text-[#6fffe9] hover:text-white transition-colors">
            <Github size={20} />
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay (for blur effect) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0b132b]/50 backdrop-blur-md z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicking outside
        ></div>
      )}

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-0 bottom-0 right-0 w-[80vw] max-w-sm bg-[#0b132b] z-40
                     flex flex-col items-center rounded-l-3xl py-8 px-4 md:hidden"
        >
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white">
            <X size={32} />
          </button>

          {/* Logo inside mobile menu */}
          <div className="mb-8">
            <img
              src="/logo.svg"
              alt="SK Logo"
              className="w-12 h-12"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(85%) sepia(85%) saturate(2000%) hue-rotate(140deg) brightness(110%) contrast(110%)",
              }}
            />
          </div>

          {/* Navigation links */}
          <div className="flex flex-col space-y-6 text-2xl mb-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-[#6fffe9] hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-[#6fffe9] hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("experiences")}
              className="text-[#6fffe9] hover:text-white transition-colors"
            >
              Experiences
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-[#6fffe9] hover:text-white transition-colors"
            >
              Projects
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <a href="#" className="text-[#6fffe9] hover:text-white transition-colors">
              <Instagram size={28} />
            </a>
            <a href="#" className="text-[#6fffe9] hover:text-white transition-colors">
              <Linkedin size={28} />
            </a>
            <a href="#" className="text-[#6fffe9] hover:text-white transition-colors">
              <Github size={28} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
