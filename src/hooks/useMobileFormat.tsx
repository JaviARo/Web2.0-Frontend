import { useState, useEffect } from 'react';

const useMobileFormat = () => {
  const [mobileFormat, setMobileFormat] = useState(window.innerWidth < 768);

  const checkMobileFormat = () => {
    setMobileFormat(window.innerWidth < 768);
  };

  useEffect(() => {
    checkMobileFormat();

    window.addEventListener('resize', checkMobileFormat);

    return () => {
      window.removeEventListener('resize', checkMobileFormat);
    };
  }, []);

  return mobileFormat;
};

export default useMobileFormat;