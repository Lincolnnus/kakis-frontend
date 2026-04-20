import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-[#dfe5f4] bg-[#f4f7ff] py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-[#182241]">Kakis AI</span>
            </Link>
            <p className="mt-4 text-sm text-[#6f7895]">
              AI-powered storyboarding for filmmakers, animators, and creative professionals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 font-semibold text-[#182241]">Product</h4>
            <ul className="space-y-2 text-sm text-[#6f7895]">
              <li><a href="#features" className="hover:text-[#182241]">Features</a></li>
              <li><Link to="/about" className="hover:text-[#182241]">About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold text-[#182241]">Resources</h4>
            <ul className="space-y-2 text-sm text-[#6f7895]">
              <li>
                <a
                  href="/Kakis%20AI%20User%20Documentation%20for%20hackathon.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#182241]"
                >
                  Documentation
                </a>
              </li>
              <li><Link to="/faqs" className="hover:text-[#182241]">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-[#182241]">Legal</h4>
            <ul className="space-y-2 text-sm text-[#6f7895]">
              <li><Link to="/privacy-policy" className="hover:text-[#182241]">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-[#182241]">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-[#182241]">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#dfe5f4] pt-8 text-center text-sm text-[#6f7895]">
          <p>© {new Date().getFullYear()} Kakis AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
