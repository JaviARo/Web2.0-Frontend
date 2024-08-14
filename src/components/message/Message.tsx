import { getLanguageJSON } from "../../functions/language";

const Message = () => {
  
  const json = getLanguageJSON().message_component;
  
  return (
    <div id="message" className="hidden">
      <div className="message-container hidden">
        <h2 className='card-content'>{json.sending}</h2>
        <div className="loader card-content"></div>
      </div>
      <div className="message-container hidden">
        <h2 className='card-content'>{json.sended}</h2>
        <img src="../../../img/contact_icons/message.png" alt="" className='card-content'></img>
      </div>
      <div className="message-container hidden">
        <h2 className='card-content'>{json.error}</h2>
        <img src="../../../img/contact_icons/message.png" alt="" className='card-content'></img>
      </div>
    </div>
  );
}

export default Message;