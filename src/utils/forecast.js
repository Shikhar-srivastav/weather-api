import axios from 'axios'

const rapidApiHost = import.meta.env.VITE_WEATHER_API_HOST;
const rapidApiKey = import.meta.env.VITE_WEATHER_API_KEY;

const createForecastQuery = (id) => ({
  method: 'GET',
  url: `https://${rapidApiHost}/current/${id}`,
  params: {
    tempunit: 'C',
    lang: 'en'
  },
  headers: {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': rapidApiHost
  }
})

const forecast = async (id) => {
	try {
		const response = await axios.request(createForecastQuery(id));
		const { relHumidity, symbolPhrase, temperature, uvIndex } = response.data.current;
		
		return ({ relHumidity, symbolPhrase, temperature, uvIndex });
	} catch (error) {
		console.error(error);
	}
}

export default forecast