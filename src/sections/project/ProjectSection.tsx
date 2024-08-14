import { useEffect } from 'react';
import { SectionProps } from '../ISections';
import { removeClass } from '../../functions/removeClass';
import { addClass } from '../../functions/addClass';
import { getLanguageJSON } from '../../functions/language';
import useMobileFormat from '../../hooks/useMobileFormat';

const ProjectSection: React.FC<SectionProps> = ({ isActive }) => {
  const json = getLanguageJSON().projects_section;
  const projects = json.projects;
  const dots = document.getElementsByClassName("dot");

  const mobileFormat = useMobileFormat();

  useEffect(() => {
    const dotsContainer = document.getElementById("dots");

    const projectTitle = document.getElementById("project-title");
    const projectImg = document.getElementById("project-image");
    const projectDescription = document.getElementById("project-description");
    const projectTechs = document.getElementById("project-techs");
    const projectLinks = document.getElementById("project-links");

    const projectImgContainer = document.getElementById("image-container");
    const projectLinksContainer = document.getElementById("project-links-container");
    const projectTechsContainer = document.getElementById("project-techs-container");

    const showProject = (index: number) => {
      for (const dot of dots) {
        dot.classList.remove("dot-selected");
      }
      dots[index].classList.add("dot-selected");

      if (
        projectTitle &&
        projectImg instanceof HTMLImageElement &&
        projectDescription &&
        projectTechs &&
        projectLinks
      ) {
        projectTitle.innerText = projects[index].title;
        projectImg.src = `../../../img/projects/${projects[index].image}`;
        projectDescription.innerText = projects[index].description;

        const links = [];
        const github = elementFromHtml(`<a href="${projects[index].links.github}" target="_blank" class='card-content'><img src="../../../img/contact_icons/github.png" alt="${json.links_titles.github}" title="${json.links_titles.github}"></img></a>`);
        links.push(github)
        if (projects[index].links.webpage) {
          const webpage = elementFromHtml(`<a href="${projects[index].links.webpage}" target="_blank" class='card-content'><img src="../../../img/contact_icons/webpage.png" alt="${json.links_titles.webpage}" title="${json.links_titles.webpage}"></img></a>`);
          links.push(webpage);
        }
        projectLinks.replaceChildren(...links);

        const imgs = [];
        for (const tech of projects[index].technologies) {
          const img = elementFromHtml(`<div class='project-tech-img-container card-content'><img src="../../../img/icons/${tech}" alt=""></img></div>`);
          imgs.push(img);
        }
        projectTechs.replaceChildren(...imgs);
      }

      if (
        projectTitle &&
        projectImg instanceof HTMLImageElement &&
        projectDescription &&
        projectLinks &&
        projectTechs &&
        projectImgContainer &&
        projectLinksContainer &&
        projectTechsContainer
      ) {
        projectTitle.classList.add("visible");
        projectDescription.classList.add("visible");
        projectImgContainer.classList.add("visible");
        addClass(Array.from(projectImgContainer.querySelectorAll('.card-content')), "visible", 500, 500);
        projectLinksContainer.classList.add("visible");
        addClass(Array.from(projectLinksContainer.querySelectorAll('#project-links .card-content, .card-content')), "visible", 500, 500);
        projectTechsContainer.classList.add("visible");
        addClass(Array.from(projectTechsContainer.querySelectorAll('#project-techs .card-content, .card-content')), "visible", 500, 500);
      }
    }

    const changeProject = (index: number) => {
      if (
        projectTitle &&
        projectImg instanceof HTMLImageElement &&
        projectDescription &&
        projectLinks &&
        projectTechs &&
        projectImgContainer &&
        projectLinksContainer &&
        projectTechsContainer
      ) {
        removeClass(Array.from(projectImgContainer.querySelectorAll('.card-content')), "visible", 0, 0);
        removeClass(Array.from(projectLinksContainer.querySelectorAll('#project-links .card-content, .card-content')), "visible", 0, 0);
        removeClass(Array.from(projectTechsContainer.querySelectorAll('#project-techs .card-content, .card-content')), "visible", 0, 0);

        setTimeout(() => {
          projectTitle.classList.add("hide");
          projectDescription.classList.add("hide");
          projectImgContainer.classList.add("hide");
          projectLinksContainer.classList.add("hide");
          projectTechsContainer.classList.add("hide");
        }, 500)

        setTimeout(() => {
          projectTitle.classList.remove("visible");
          projectDescription.classList.remove("visible");
          projectImgContainer.classList.remove("visible");
          projectLinksContainer.classList.remove("visible");
          projectTechsContainer.classList.remove("visible");
        }, 1500)

        setTimeout(() => {
          showProject(index);
          projectTitle.classList.remove("hide");
          projectDescription.classList.remove("hide");
          projectImgContainer.classList.remove("hide");
          projectLinksContainer.classList.remove("hide");
          projectTechsContainer.classList.remove("hide");
        }, 1510)
      }
    }

    if (isActive) {
      Array.from(dots).map((dot) => {
        return dot.remove();
      });

      for (let i = 0; i < projects.length; i++) {
        const dot = elementFromHtml('<div class="dot"></div>');
        dotsContainer?.appendChild(dot);
      }

      Array.from(dots).map((dot, index) => dot.addEventListener("click", () => changeProject(index)));

      showProject(0);
      addClass(Array.from(dots), "visible", 0, 500);
      addClass(Array.from(dots), "visible-no-animation", 0, 550);
      removeClass(Array.from(dots), "visible", 0, 600);
    }
  }, [json, projects, dots, isActive, mobileFormat]);

  const elementFromHtml = (html: string) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content;
  }

  return (
    <div id="project-section">
      <h1 id="project-title">Placeholder</h1>
      {mobileFormat ?
        <div className="project-section-container">
          <div className="project-section-el">
            <div id="carousel">
              <div id="image-container">
                <img id="project-image" className='card-content' src="" alt=""></img>
              </div>
              <div id="dots">
              </div>
            </div>
          </div>
          <div className="project-section-el">
            <p id="project-description">Placeholder</p>
            <div className="grid-2fr-3fr">
              <div id="project-links-container">
                <div id="project-links"></div>
              </div>
              <div id="project-techs-container">
                <div id="project-techs"></div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="project-section-container">
          <div className="project-section-el">
            <div id="carousel">
              <div id="dots">
              </div>
              <div id="image-container">
                <img id="project-image" className='card-content' src="" alt=""></img>
              </div>
            </div>
          </div>
          <div className="project-section-el">
            <p id="project-description">Placeholder</p>
            <div className="grid-2fr-3fr">
              <div id="project-links-container">
                <h2 className='card-content'>{json.links}</h2>
                <div id="project-links"></div>
              </div>
              <div id="project-techs-container">
                <h2 className='card-content'>{json.techs}</h2>
                <div id="project-techs"></div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default ProjectSection;