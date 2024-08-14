import { LogoProps } from './ILogo';

const Logo: React.FC<LogoProps> = ({ url, name }) => {
  return (
    <div className="logo card-content">
      <div className='logo-img-container'>
        <img src={`../../../img/icons/${url}`} alt={name}/>
      </div>
      <p>{name}</p>
    </div>
  );
}

export default Logo;