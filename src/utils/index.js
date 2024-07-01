export const formatCurrency = (value, lng = 'eng') => {
  const number = Number(value);
  let locale;
  let currency;

  switch (lng) {
    case 'en':
      locale = 'en-US';
      currency = 'USD';
      break;
    case 'pl':
      locale = 'pl-PL';
      currency = 'PLN';
      break;
    default:
      locale = 'en-GB';
      currency = 'GBP';
      break;
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(number);
};
