import { useNavigate } from "react-router-dom";
import { Instagram, Twitter, Facebook, Coffee } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="mt-20 bg-gradient-to-br from-black via-purple-950 to-black border-t border-pink-700/40">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3 text-gray-300">
        
        {/* Column 1: Logo + Tagline */}
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <img src="/logo.png" alt="Shhava logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Shhava
            </span>
          </div>
          <p className="italic text-gray-400 text-sm">
            “Where missed chances get a second chance.” 🌌
          </p>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-4 pt-2">
            <a href="https://www.instagram.com/shhava_hoi/" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://x.com/shhavahoi" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61579740572228" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Explore Links */}
        <div className="text-center md:text-left space-y-3">
          <h4 className="font-semibold text-white text-lg">Explore</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => navigate("/discover")} className="hover:text-pink-400 transition">
                Find The One 💕
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/fated-crossings")} className="hover:text-pink-400 transition">
                Missed 🎭
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/fate-flashbacks")} className="hover:text-pink-400 transition">
                Stories 📚
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/messages")} className="hover:text-pink-400 transition">
                Central Perk ☕
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Fun / Legal */}
        <div className="text-center md:text-right space-y-3">
          <h4 className="font-semibold text-white text-lg">About</h4>
          <p className="text-gray-400 text-sm">
            Built with ❤️ + ☕ by sitcom fans.
          </p>
          <p className="text-xs text-pink-300 italic">
            “The one where legal says hi.” ⚖️
          </p>
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Shhava. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-pink-700/40 py-4 text-center text-xs text-gray-500">
        <p className="flex items-center justify-center space-x-2">
          <Coffee className="w-4 h-4 text-pink-400" />
          <span>Powered by awkward encounters ☕</span>
        </p>
      </div>
    </footer>
  );
}
