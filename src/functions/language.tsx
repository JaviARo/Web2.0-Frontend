export const getLanguage = () => {
  if (localStorage.getItem('language') == null) {
    setLanguage('en');
  }

  return localStorage.getItem('language');
}

export const getLanguageJSON = () => {
  return require('../languages/' + getLanguage() + '.json');
}

export const setLanguage = (lang:string) => {
  localStorage.setItem('language', lang);
}