import { Link } from 'react-router-dom';

const ALIBABA_BRIEF_PDF_URL = new URL('../../../Alibaba Cloud Singapore Stories Unearthed WAN AI Video Challenge overview and brief.pdf', import.meta.url).href;
const SIGNUP_GUIDE_PDF_URL = new URL('../../../Signup Guide.pdf', import.meta.url).href;

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
                <a href="/Kakis%20AI%20User%20Documentation%20for%20hackathon.pdf?v=202605151" target="_blank" rel="noreferrer" className="hover:text-[#182241]">
                  Documentation
                </a>
              </li>
              <li><Link to="/faqs" className="hover:text-[#182241]">FAQs</Link></li>
              <li>
                <a href={ALIBABA_BRIEF_PDF_URL} target="_blank" rel="noreferrer" className="hover:text-[#182241]">
                  Alibaba Cloud Singapore Stories Unearthed WAN AI Video Challenge Overview and Brief
                </a>
              </li>
              <li>
                <a href={SIGNUP_GUIDE_PDF_URL} target="_blank" rel="noreferrer" className="hover:text-[#182241]">
                  Signup Guide
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=6RTP4qJyc-U"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#f26a1d] hover:text-[#d95c10]"
                >
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f26a1d]/70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f26a1d]" />
                  </span>
                  Online Workshop Recording
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=PRjKvbDIjMg" target="_blank" rel="noreferrer" className="hover:text-[#182241]">
                  Training Video
                </a>
              </li>
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
