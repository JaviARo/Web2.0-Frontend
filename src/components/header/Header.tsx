import { useEffect } from 'react';
import { HeaderProps } from './IHeader';
import { removeClass } from '../../functions/removeClass';
import { getLanguageJSON } from '../../functions/language';
import { addClass } from '../../functions/addClass';
import useMobileFormat from '../../hooks/useMobileFormat';

const Header: React.FC<HeaderProps> = ({ projectSectionRef, technologiesSectionRef, contactSectionRef, currentSection }) => {

  const json = getLanguageJSON().header_component;

  const mobileFormat = useMobileFormat();
  
  useEffect(() => {
    const scrollToElement = (c:number) => {
      return () => {
        const appElement = document.getElementById("app");
        if (appElement) {
          let element = 0;
          switch (c) {
            case 0:
              break;
            case 1:
              element = projectSectionRef.current ? projectSectionRef.current - window.innerHeight * 0.2 : 0;
              break;
            case 2:
              element = technologiesSectionRef.current ? technologiesSectionRef.current - window.innerHeight * 0.2 : 0;
              break;
            case 3:
              element = contactSectionRef.current ? contactSectionRef.current - window.innerHeight * 0.2 : 0;
              break;
          }
  
          appElement.scrollTo({
            top: element,
            behavior: 'smooth'
          });
        }
      };
    }

    const headerButtons = document.getElementsByClassName("header-button");
    Array.from(headerButtons).map((headerButton, index) => headerButton.addEventListener("click", scrollToElement(index)));

    const circleButtons = document.getElementsByClassName("circle-button");
    removeClass(Array.from(circleButtons), "hidden", 1000, 1000);
    removeClass(Array.from(circleButtons), "entry-scale", 2050, 1000);

    const hrs = document.getElementsByClassName("header-bar");
    removeClass(Array.from(hrs), "hidden", 1500, 1000);
    
  }, [projectSectionRef, technologiesSectionRef, contactSectionRef])

  useEffect(() => {
    const h2s = Array.from(document.getElementsByClassName("header-h2"));

    if (mobileFormat) {
      if (currentSection !== null) {
        for (let i=0; i<h2s.length; i++) {
          if (i === currentSection) {
            setTimeout(() => {
              h2s[i].classList.add("visible");
            }, 1000);
            
          } else {
            console.log("hola");
            h2s[i].classList.add("hide");
            setTimeout(() => {
              h2s[i].classList.remove("visible");
              h2s[i].classList.remove("hide");
            }, 1000);
          }
        }
      }
    } else {
      addClass(h2s, "visible", 1000, 1000);
    }
    
  }, [mobileFormat, currentSection]);
  
  return (
    <div id="header">
      <div id="header-buttons">
        <div className="header-button">
          <h2 className="header-h2">{json.main}</h2>
          <div className="circle-button circle-button-active hidden entry-scale"></div>
        </div>
        <div className="header-button">
          <h2 className="header-h2">{json.projects}</h2>
          <div className="circle-button hidden entry-scale"></div>
          <hr className="header-bar hidden"/>
        </div>
        <div className="header-button">
          <h2 className="header-h2">{json.technologies}</h2>
          <div className="circle-button hidden entry-scale"></div>
          <hr className="header-bar hidden"/>
        </div>
        <div className="header-button">
          <h2 className="header-h2">{json.contact}</h2>
          <div className="circle-button hidden entry-scale"></div>
          <hr className="header-bar hidden"/>
        </div>
      </div>
    </div>
  );
}

export default Header;