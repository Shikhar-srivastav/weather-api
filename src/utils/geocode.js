import axios from 'axios'

const rapidApiHost = import.meta.env.VITE_WEATHER_API_HOST;
const rapidApiKey = import.meta.env.VITE_WEATHER_API_KEY;

const createGeocodeQuery = (location) => ({
  method: 'GET',
  url: `https://${rapidApiHost}/location/search/${location}`,
  params: {
    lang: 'en',
  },
  headers: {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': rapidApiHost
  }
})

const geocode = async (location) => {
	try {
		const response = await axios.request(createGeocodeQuery(location));
		const { id, name, country, lat, lon } = response.data.locations[0];
		
		return ({ id, name, country, lat, lon });
	} catch (error) {
		console.error(error);
	}
}

export default geocode;