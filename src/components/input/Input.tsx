import { getLanguageJSON } from '../../functions/language';
import { InputProps } from './IInput';

const Input: React.FC<InputProps> = ({ maxLength, rows, type, label }) => {

  const json = getLanguageJSON().contact_section;
  
  return (
    <label className='card-content'>
      <div className="text-label">
        <p>{label}</p>
        <p className="mandatory-field">{json.message_form.mandatory_field}</p>
      </div>
      
      {rows === 1 ? 
        <>
          <p className="remaining-chars rch-input">{maxLength}</p>
          <input className="form-input" type={type} maxLength={maxLength}/>
        </>
      :
        <>
          <p className="remaining-chars rch-txa">{maxLength}</p>
          <textarea className="form-input" rows={rows} maxLength={maxLength}/>
        </>
      }
    </label>
  );
}

export default Input;