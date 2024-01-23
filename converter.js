require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY;
const API_URL = 'https://open.er-api.com/v6/latest';

class CurrencyConverter {
  async getExchangeRates() {
    try {
      const response = await axios.get(`${API_URL}?apikey=${API_KEY}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exchange rates:', error.message);
      throw error;
    }
  }

  async listSupportedCurrencies() {
    try {
      const rates = await this.getExchangeRates();
      const currencies = Object.keys(rates.rates);
      return currencies;
    } catch (error) {
      console.error('Error listing supported currencies:', error.message);
      throw error;
    }
  }

  async listConversionRates() {
    try {
      const rates = await this.getExchangeRates();
      return rates.rates;
    } catch (error) {
      console.error('Error listing conversion rates:', error.message);
      throw error;
    }
  }

  async convertCurrency(amount, fromCurrency, toCurrency) {
    try {
      const rates = await this.getExchangeRates();
      const baseRate = rates.rates[fromCurrency];
      const conversionRate = rates.rates[toCurrency];
      if (!baseRate || !conversionRate) {
        throw new Error('Invalid currency code');
      }
      const convertedAmount = (amount / baseRate) * conversionRate;

      return convertedAmount.toFixed(2);
    }
    catch (error)
    {
      console.error('Error converting currency:',error.message);
      throw error;
    }
  }
}

module.exports = CurrencyConverter;
