import React, { useEffect, useRef, useState } from "react";
import MainSection from './sections/main/MainSection';
import ProjectSection from './sections/project/ProjectSection';
import TechnologiesSection from './sections/technologies/TechnologiesSection';
import ContactSection from './sections/contact/ContactSection';
import Header from './components/header/Header';
import useMobileFormat from "./hooks/useMobileFormat";

const App: React.FC = () => {
  const headerTopRef = useRef(0);
  const projectSectionRef = useRef(0);
  const technologiesSectionRef = useRef(0);
  const contactSectionRef = useRef(0);
  const [currentSection, setCurrentSection] = useState(0);

  const [projectActive, setProjectActive] = useState(false);
  const [technologiesActive, setTechnologiesActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);

  const [, forceUpdate] = useState(0);

  const mobileFormat = useMobileFormat();

  useEffect(() => {
    setTopRefs();

    window.addEventListener('resize', setTopRefs);
  }, []);

  const setTopRefs = () => {
    const header = document.getElementById("header");
    if (header) {
      headerTopRef.current = header.offsetTop;
    }

    const projectSection = document.getElementById("project-section");
    if (projectSection) {
      projectSectionRef.current = projectSection.offsetTop
    }

    const technologiesSection = document.getElementById("technologies-section");
    if (technologiesSection) {
      technologiesSectionRef.current = technologiesSection.offsetTop
    }

    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSectionRef.current = contactSection.offsetTop
    }
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    forceUpdate(n => n + 1);
    const header = document.getElementById("header");
    const projectSection = document.getElementById("project-section");
    const hr = document.getElementsByTagName("hr");
    const circleButton = document.getElementsByClassName("circle-button");

    if (header && projectSection) {
      // Fija el header al llegar al elemento ProjectSection
      if(event.currentTarget.scrollTop > window.innerHeight*0.8 || (event.currentTarget.scrollTop > window.innerHeight*0.75 && mobileFormat)) {
        header.style.position = "fixed";
        projectSection.style.marginTop = "20vh";
      } else {
        header.style.position = "relative"
        projectSection.style.marginTop = "0vh";
      }

      // Controla la animación de los botones según donde esté
      if(event.currentTarget.scrollTop < projectSectionRef.current - window.innerHeight*0.3 -1) {
        if(hr[0].classList.contains("hr-active")) {
          hr[0].classList.remove("hr-active");
          circleButton[1].classList.remove("circle-button-active");
        }
        setCurrentSection(0);
      }
      if(event.currentTarget.scrollTop > projectSectionRef.current - window.innerHeight*0.3 -1) {
        setProjectActive(true);
        hr[0].classList.add("hr-active");
        circleButton[1].classList.add("circle-button-active");

        if(hr[1].classList.contains("hr-active")) {
          hr[1].classList.remove("hr-active");
          circleButton[2].classList.remove("circle-button-active");
        }
        setCurrentSection(1);
      }
      if(event.currentTarget.scrollTop > technologiesSectionRef.current - window.innerHeight*0.3 -1) {
        setTechnologiesActive(true);
        hr[1].classList.add("hr-active");
        circleButton[2].classList.add("circle-button-active");

        if(hr[2].classList.contains("hr-active")) {
          hr[2].classList.remove("hr-active");
          circleButton[3].classList.remove("circle-button-active");
        }
        setCurrentSection(2);
      }
      if(event.currentTarget.scrollTop > contactSectionRef.current - window.innerHeight*0.3 -1) {
        setContactActive(true);
        hr[2].classList.add("hr-active");
        circleButton[3].classList.add("circle-button-active");
        setCurrentSection(3);
      }
    }
  };
  
  return (
    <div id='app' onScroll={handleScroll}>
      <MainSection/>
      <Header projectSectionRef={projectSectionRef} technologiesSectionRef={technologiesSectionRef} contactSectionRef={contactSectionRef} currentSection={currentSection}/>
      <ProjectSection isActive={projectActive}/>
      <TechnologiesSection isActive={technologiesActive}/>
      <ContactSection isActive={contactActive}/>
    </div>
  );
}

export default App;