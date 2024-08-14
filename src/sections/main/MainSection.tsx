import { useEffect } from "react";
import { getLanguage, getLanguageJSON, setLanguage } from "../../functions/language";

function MainSection() {
  const json = getLanguageJSON().main_section;

  useEffect(() => {
    const myself = document.getElementById("myself");
    myself?.classList.add("visible");

    const languageElement = document.getElementById("language");
    languageElement?.addEventListener("click", () => {
      if (getLanguage() === 'en') {
        setLanguage('es');
      } else {
        setLanguage('en');
      }
      window.location.reload();
    })

    setTimeout(() => {
      document.getElementById("myself")?.querySelector(".card-content")?.classList.add("visible");
    }, 1000);
  }, []);

  return (
    <div id="main-section">
      <div id="main-grid"><div id="title">
        <h1>{json.title}</h1>
        <h2>{json.subtitle}</h2>
        <p>{json.description}</p>
      </div>
        <div id="myself">
          <img src="../../../img/me.PNG" alt="" className="card-content" />
        </div>
        <div id="language">
          <img src="../../../img/contact_icons/webpage.png" alt={json.language_title} title={json.language_title} />
          <p>{json.language_initials}</p>
        </div>
      </div>
    </div>
  );
}

export default MainSection;