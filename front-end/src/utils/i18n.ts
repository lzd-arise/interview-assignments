import langText from './text.json'

type langType = 'en'
const langKey: string = sessionStorage.getItem('langKey') || 'en'

const nowLanguageMapper: { [key: string]: string } = langText[langKey as langType] || langText.en

const getVarString = (key: string, insert?: string | number | Array<string>) => {
  try {
    if (!key) return '';
    let value = nowLanguageMapper[key] || key;
    if (!value) return '';
    if (value.includes('{0}')) {
      if (Array.isArray(insert)) {
        insert.forEach((item, index) => {
          value = value.replace(new RegExp(`\\{${index}\\}`, 'g'), String(item));
        });
      } else value = value.replace(/{0\}/g, String(insert));
    }
    return value;
  } catch (error) {
    return key;
  }
}

export {
  getVarString
}