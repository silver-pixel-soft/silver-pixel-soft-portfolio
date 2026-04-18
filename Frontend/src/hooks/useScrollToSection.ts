import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useScrollToSection = () => {
  const navigate = useNavigate();

  const scrollToSection = useCallback(
    (sectionId) => {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    },
    [navigate]
  );

  return scrollToSection;
};

export default useScrollToSection;