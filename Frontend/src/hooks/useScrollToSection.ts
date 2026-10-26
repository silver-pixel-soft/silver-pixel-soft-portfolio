import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useScrollToSection = () => {
  const navigate = useNavigate();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      navigate("/");
      setTimeout(() => {
        const lenis = (window as any).lenis;
        if (sectionId === "home") {
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: -80, duration: 1.2 });
          } else {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      }, 100);
    },
    [navigate]
  );

  return scrollToSection;
};

export default useScrollToSection;