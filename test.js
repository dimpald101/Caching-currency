
const {
    listSupportedCurrencies,
    listConversionRates,
    convertCurrency,
  } = require('./converter');
  
  async function testConversion() {
    try {
      const supportedCurrencies = await listSupportedCurrencies();
      console.log('Supported Currencies:', supportedCurrencies.join(', '));
  
      const conversionRates = await listConversionRates();
      console.log('Conversion Rates:', conversionRates);
  
      const amount = 100;
      const fromCurrency = 'TWD';
      const toCurrency = 'INR';
  
      const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
      console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`);
    } catch (error) {
      console.error('Test failed:', error.message);
    }
  }
  
  testConversion();
  