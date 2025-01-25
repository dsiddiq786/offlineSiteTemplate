const parsePrice = (priceString) => {
  if (typeof priceString !== 'string') return 0;
  const num = Number(priceString.replace(/[$,]/g, '')) || 0; // Remove $ and , then convert to number

  return num;
};

export default parsePrice;
