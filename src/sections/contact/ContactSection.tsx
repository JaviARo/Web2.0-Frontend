import { SectionProps } from '../ISections';
import Input from '../../components/input/Input';
import Message from '../../components/message/Message';
import { useEffect } from 'react';
import { addClass } from '../../functions/addClass';
import { removeClass } from '../../functions/removeClass';
import sendMessage from '../../services/sendMessage';
import { getLanguageJSON } from '../../functions/language';
import useMobileFormat from '../../hooks/useMobileFormat';

const ContactSection: React.FC<SectionProps> = ({ isActive }) => {

  const json = getLanguageJSON().contact_section;

  const mobileFormat = useMobileFormat();

  useEffect(() => {
    
    const addNoRemainingCharactersStyles = (label: HTMLLabelElement, input: HTMLInputElement | HTMLTextAreaElement, index: number) => {
      const remainingCharsElement = label.querySelector(".remaining-chars")
      if (remainingCharsElement) {
        const remainingChars = totalChars[index] - input.value.length;
        remainingCharsElement.innerHTML = remainingChars.toString();

        if (remainingChars === 0) {
          input.classList.add("form-input-no-rc");
        } else {
          input.classList.remove("form-input-no-rc");
        }
      }
    }

    const showMessageContainer = (messageContainer: Element) => {
      messageContainer.classList.add("visible");
      messageContainer.classList.remove("hidden");
      addClass(Array.from(messageContainer.querySelectorAll('.card-content')), "visible", 500, 500);
    }

    const hideMessageContainer = (messageContainer: Element) => {
      removeClass(Array.from(messageContainer.querySelectorAll('.card-content')), "visible", 0, 0);
      setTimeout(() => {
        messageContainer.classList.add("hide");
      }, 500)
      setTimeout(() => {
        messageContainer.classList.remove("visible");
        messageContainer.classList.add("hidden");
        messageContainer.classList.remove("hide");
      }, 1500)
    }

    const handleForm = (labels: Array<HTMLLabelElement>) => {
      let canSend = true;

      const inputs: (HTMLInputElement | HTMLTextAreaElement)[] = []
      labels.forEach((label) => {
        const input = label.getElementsByClassName("form-input")[0];
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)
          inputs.push(input);
      });

      labels.forEach((label, index) => {
        if (inputs[index] instanceof HTMLInputElement || inputs[index] instanceof HTMLTextAreaElement) {
          if (inputs[index].value.length === 0) {
            const mandatoryField = label.querySelector(".text-label .mandatory-field");
            if (mandatoryField) {
              mandatoryField.classList.add("visible");
              canSend = false;
            }
          }
        }
      });

      if (canSend) {
        const messageElement = document.getElementById('message');
        messageElement?.classList.remove("hidden");
        const messageContainers = document.getElementsByClassName('message-container');
        setTimeout(() => {
          showMessageContainer(messageContainers[0]);
        }, 1000);
        setTimeout(() => {
          sendMessage(inputs[0].value, inputs[1].value, inputs[2].value).then((response) => {
            hideMessageContainer(messageContainers[0]);
            const startingNumber = response.status.toString().substring(0, 1);
            if (startingNumber === "2") {
              setTimeout(() => {
                showMessageContainer(messageContainers[1]);
              }, 1510);
              setTimeout(() => {
                hideMessageContainer(messageContainers[1]);
                setTimeout(() => {
                  messageElement?.classList.add("hidden");
                }, 1510);
              }, 4500);
            } else {
              setTimeout(() => {
                showMessageContainer(messageContainers[2]);
              }, 1510);
              setTimeout(() => {
                hideMessageContainer(messageContainers[2]);
                setTimeout(() => {
                  messageElement?.classList.add("hidden");
                }, 1510);
              }, 4500);
            }
          });
        }, 3000);
      }
    }

    const labels = Array.from(document.getElementsByTagName("label"));
    const totalChars: number[] = [0, 0, 0]
    labels.forEach((label, index) => {
      const input = label.getElementsByClassName("form-input")[0];
      totalChars[index] = Number(input.getAttribute("maxLength"));
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.addEventListener("keydown", () => addNoRemainingCharactersStyles(label, input, index));
        input.addEventListener("keyup", () => addNoRemainingCharactersStyles(label, input, index));
      }
    });

    const button = document.getElementById("form-button");
    button?.addEventListener("click", () => handleForm(labels));
  }, []);

  useEffect(() => {
    
    const messageForm = document.getElementById("message-form");

    if (isActive && messageForm) {
      if (mobileFormat) {
        const contactInfoMobile = document.getElementById("contact-info-mobile");
        if(contactInfoMobile) {
          contactInfoMobile.classList.add("visible");
          addClass(Array.from(contactInfoMobile.querySelectorAll('.card-content')), "visible", 500, 500);
        }
        
      } else {
        const contactInfoZones = Array.from(document.getElementsByClassName("contact-info-zone"));
        addClass(contactInfoZones, "visible", 0, 0)
        contactInfoZones.map(
          (contactInfoZone) => {
            return addClass(Array.from(contactInfoZone.querySelectorAll('.card-content')), "visible", 500, 500);
          }
        );
      }
      
      messageForm?.classList.add("visible");
      const messageFormCardContent = Array.from(messageForm.querySelectorAll('.card-content'));
      addClass(messageFormCardContent, "visible", 500, 500);

      const button = document.getElementById("form-button");

      setTimeout(() => {
        button?.classList.add("form-button-active");
      }, messageFormCardContent.length * 500 + 1000)
    }
  }, [isActive, mobileFormat]);

  return (
    <>
      <div id="contact-section">
        {mobileFormat ?
          <div id="contact-info-mobile">
            <a href="mailto: javialemanrod@gmail.com" rel="noreferrer" target="_blank" className='card-content'>
              <img src="../../../img/contact_icons/email.png" alt={json.email.img_title} title={json.email.img_title} />
            </a>
            <a href="https://github.com/JaviARo" rel="noreferrer" target="_blank" className='card-content'>
              <img src="../../../img/contact_icons/github.png" alt={json.social_media.github_title} title={json.social_media.github_title} />
            </a>
            <a href="https://www.linkedin.com/in/javier-alemán-rodríguez-4975a1285/" rel="noreferrer" target="_blank" className='card-content'>
              <img src="../../../img/contact_icons/linkedin.png" alt={json.social_media.linkedin_title} title={json.social_media.linkedin_title} />
            </a>
            <a href={json.cv.link} rel="noreferrer" target="_blank" className='card-content'>
              <img src="../../../img/contact_icons/pdf.png" alt={json.cv.img_title} title={json.cv.img_title} />
            </a>
          </div>
          :
          <div id="contact-info">
            <div className="contact-info-zone">
              <div className='contact-info-subtitle card-content'>
                <h2>{json.email.subtitle}: </h2>
                <p>javialemanrod@gmail.com</p>
              </div>
              <a href="mailto: javialemanrod@gmail.com" rel="noreferrer" target="_blank" className='card-content'>
                <img src="../../../img/contact_icons/email.png" alt={json.email.img_title} title={json.email.img_title} />
              </a>
            </div>
            <div className="contact-info-zone">
              <h2 className='card-content'>{json.social_media.subtitle}</h2>
              <div className="contact-img-container">
                <a href="https://github.com/JaviARo" rel="noreferrer" target="_blank" className='card-content'>
                  <img src="../../../img/contact_icons/github.png" alt={json.social_media.github_title} title={json.social_media.github_title} />
                </a>
                <a href="https://www.linkedin.com/in/javier-alemán-rodríguez-4975a1285/" rel="noreferrer" target="_blank" className='card-content'>
                  <img src="../../../img/contact_icons/linkedin.png" alt={json.social_media.linkedin_title} title={json.social_media.linkedin_title} />
                </a>
              </div>
            </div>
            <div className="contact-info-zone">
              <h2 className='card-content'>{json.cv.subtitle}</h2>
              <a href={json.cv.link} rel="noreferrer" target="_blank" className='card-content'>
                <img src="../../../img/contact_icons/pdf.png" alt={json.cv.img_title} title={json.cv.img_title} />
              </a>
            </div>
          </div>
        }

        <form id="message-form">
          <h2 className='card-content'>{json.message_form.subtitle}</h2>
          <div id='form-grid'>
            <div>
              <Input maxLength={50} rows={1} type="text" label={json.message_form.name} />
              <Input maxLength={50} rows={1} type="email" label={json.message_form.email} />
            </div>
            <Input maxLength={500} rows={4} type="text" label={json.message_form.message} />
          </div>
          <div id='form-button' className='card-content'>
            <p>{json.message_form.button}</p>
          </div>
        </form>
      </div>
      <Message />
    </>
  );
}

export default ContactSection;