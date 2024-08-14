import React, { useEffect } from "react";
import { SectionProps } from '../ISections';
import Logo from '../../components/logo/Logo';
import { addClass } from "../../functions/addClass";
import { getLanguageJSON } from "../../functions/language";

const TechnologiesSection: React.FC<SectionProps> = ({ isActive }) => {
  const json = getLanguageJSON().technologies_section;

  useEffect(() => {
    const section = document.getElementById("technologies-section");
    if(section) {
      const logos = document.getElementById("logos");
      const h2 = section.getElementsByTagName("h2")[0];

      if (isActive && logos) {
        h2?.classList.remove("hidden");

        logos?.classList.add("visible");
        addClass(Array.from(logos.querySelectorAll('.card-content')), "visible", 1000, 500);
      }
    }
  }, [isActive]);

  return (
    <div id="technologies-section">
      <h2 className="hidden">{json.subtitle}</h2>
      <div id="logos">
        <Logo url="js.png" name="JavaScript"/>
        <Logo url="react.png" name="React"/>
        <Logo url="sass.png" name="Sass"/>
        <Logo url="python.png" name="Python"/>
        <Logo url="laravel.png" name="Laravel"/>
        <Logo url="php.png" name="PHP"/>
        <Logo url="java.webp" name="Java"/>
      </div>
    </div>
  );
}

export default TechnologiesSection;