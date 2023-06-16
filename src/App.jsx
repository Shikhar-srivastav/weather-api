import { useState } from 'react'
import geocode from './utils/geocode'
import forecast from "./utils/forecast";

function App() {
	const [ search, setSearch ] = useState("");
	const [ result, setResult ] = useState(null);

	const handleValueChange = (e) => {
		setSearch(e.target.value);
	}

	const handleWeatherRequest = async () => {
		const location = await geocode(search);
		const weather = await forecast(location.id);
		setResult({ location, weather });
	}

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
			<h1 className="mb-5">WeatherWatchLive</h1>
			<p>Enter a location to get its current weather conditions</p>
			<span className="input-group mb-5" style={{ width: 500 }}>
				<input type="text" className="form-control" placeholder="Location" value={search} onChange={handleValueChange} />
				<button className="btn btn-primary px-3" onClick={handleWeatherRequest}>Search</button>
			</span>
			{ result ? (
					<div className="card overflow-hidden" style={{ width: 300 }}>
						<div className="card-body bg-info-subtle">
							<h5 className="card-title">{result.location.name}, {result.location.name}</h5>
							<p className="card-subtitle text-secondary mb-3">{result.location.lat}, {result.location.lon}</p>
							<p className="card-subtitle mb-1">Humidity: {result.weather.relHumidity}</p>
							<h4 className="card-text text-capitalize">
							{result.weather.symbolPhrase}, {result.weather.temperature}&deg;C</h4>
						</div>
					</div>
				) : null }
		</div>
  )
}

export default App
