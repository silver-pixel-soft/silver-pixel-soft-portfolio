import { useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "../../components/ui/SectionHeading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { CustomCursor } from "../../components/ui/CustomCursor";

const PrivacyPolicy = () => {
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
            title="Privacy Policy"
            className="mb-0"
          />
        </div>

        <div ref={contentRef} className="text-neutral-400 space-y-8 prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-white">
          <p className="text-lg">
            Last updated: May 17, 2026
          </p>
          
          <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 lg:p-12 space-y-8 backdrop-blur-sm">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">1. Information Collection</h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">2. Use of Information</h2>
              <p>
                We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">3. Information Sharing</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, or Legal Obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">4. Data Security</h2>
              <p>
                We aim to protect your personal information through a system of organizational and technical security measures. We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">5. Your Privacy Rights</h2>
              <p>
                In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right to request access and obtain a copy of your personal information, to request rectification or erasure, to restrict the processing of your personal information, and if applicable, to data portability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">6. Contact Us</h2>
              <p>
                If you have questions or comments about this notice, you may email us at privacy@silverpixelsoft.com or by post to our office address provided on our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy