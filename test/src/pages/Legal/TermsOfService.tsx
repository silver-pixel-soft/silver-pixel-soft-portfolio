import { useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "../../components/ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "../../components/ui/CustomCursor";

const TermsOfService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(contentRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4");
  }, { scope: containerRef });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black pt-32 pb-24 px-6 lg:px-20 mx-auto w-full relative">
      <CustomCursor />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headingRef} className="flex flex-col mb-16 gap-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors w-fit mb-4 group font-medium"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <SectionHeading
            align="left"
            subtitle="Legal"
            title="Terms of Service"
            className="mb-0"
          />
        </div>

        <div ref={contentRef} className="text-neutral-400 space-y-8 prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-white">
          <p className="text-lg">
            Last updated: May 17, 2026
          </p>
          
          <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 lg:p-12 space-y-8 backdrop-blur-sm">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">1. Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Silver Pixel Soft ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">3. User Representations</h2>
              <p>
                By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">4. Prohibited Activities</h2>
              <p>
                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">5. Modifications and Interruptions</h2>
              <p>
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">6. Contact Us</h2>
              <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at legal@silverpixelsoft.com or through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService