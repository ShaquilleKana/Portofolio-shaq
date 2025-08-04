import { Instagram, Linkedin, Github, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-[#5bc0be] bg-[#1c2541]">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.instagram.com/shaquille_kana" className="text-white hover:text-[#6fffe9] transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/shaquille-kana/ " className="text-white hover:text-[#6fffe9] transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/ShaquilleKana" className="text-white hover:text-[#6fffe9] transition-colors">
            <Github size={24} />
          </a>
          <a href="https://ddmybabyangel.vercel.app/" className="text-white hover:text-[#ed254e] transition-colors">
            <Heart size={24} />
          </a>
        </div>
        <p className="text-gray-400">© 2024 Shaq. All rights reserved.</p>
      </div>
    </footer>
  )
}
