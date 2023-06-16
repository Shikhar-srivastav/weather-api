import { useState } from 'react'
import axios from 'axios'

const geocodingURL = import.meta.env.VITE_GEOCODING_URL;
const geocodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

const weatherURL = import.meta.env.VITE_WEATHER_URL;
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
	const [ search, setSearch ] = useState("");
	const [ result, setResult ] = useState(null);

	const handleValueChange = (e) => {
		setSearch(e.target.value);
	}

	const getWeatherForecast = async () => {
		const geocodeQuery = `/${encodeURIComponent(search)}.json?access_token=${geocodingApiKey}&limit=1`;
		const geolocationRes = await axios.get(geocodingURL + geocodeQuery);
		const { place_name, geometry } = geolocationRes.data.features[0];
		const [ longitude, latitude ] = geometry.coordinates;

		const forecastQuery = `?access_key=${weatherApiKey}&query=${latitude},${longitude}`;
		const forecastRes = await axios.get(weatherURL + forecastQuery);
		const { humidity, temperature, weather_descriptions, weather_icons } = forecastRes.data.current;
		
		setResult({ 
			location: { place_name, latitude, longitude },
			weather: { humidity, temperature, weather_descriptions }
		})
	}

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
			<h1 className="mb-5">WeatherWatchLive</h1>
			<p>Enter a location to get its current weather conditions</p>
			<span className="input-group mb-5" style={{ width: 500 }}>
				<input type="text" className="form-control" placeholder="Location" value={search} onChange={handleValueChange} />
				<button className="btn btn-primary px-3" onClick={getWeatherForecast}>Search</button>
			</span>
			{ result ? (
					<div className="card overflow-hidden" style={{ width: 300 }}>
						<div className="card-body bg-info-subtle">
							<h5 className="card-title">{result.location.place_name}</h5>
							<p className="card-subtitle text-secondary mb-3">{result.location.latitude}, {result.location.longitude}</p>
							<p className="card-subtitle mb-1">Humidity: {result.weather.humidity}</p>
							<h4 className="card-text">
							{result.weather.weather_descriptions[0]}, {result.weather.temperature}&deg;C</h4>
						</div>
					</div>
				) : null }
		</div>
  )
}

export default App
