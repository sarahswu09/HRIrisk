export type DailyTemperatureForecast = {
  date: string;
  highF: number;
  lowF: number;
};

export type TemperatureForecast = {
  locationLabel: string;
  days: DailyTemperatureForecast[];
  hottestHighF: number | null;
  sourceUrl: string;
};

type GeocodingResult = {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
  country_code?: string;
};

type GeocodingResponse = {
  results?: GeocodingResult[];
};

type ForecastResponse = {
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
};

function buildLocationLabel(location: GeocodingResult): string {
  return [location.name, location.admin1, location.country_code ?? location.country]
    .filter(Boolean)
    .join(", ");
}

async function fetchJson<T>(url: URL): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Forecast request failed (${response.status}).`);
  }

  return response.json() as Promise<T>;
}

function selectLocation(
  results: GeocodingResult[],
  locationHints: string[],
): GeocodingResult | undefined {
  if (locationHints.length === 0) {
    return results[0];
  }

  const normalizedHints = locationHints.map((hint) => hint.toLowerCase());
  return (
    results.find((result) => {
      const searchableFields = [
        result.admin1,
        result.country,
        result.country_code,
      ]
        .filter(Boolean)
        .map((field) => field!.toLowerCase());

      return normalizedHints.some((hint) =>
        searchableFields.some((field) => field.includes(hint) || hint.includes(field)),
      );
    }) ?? results[0]
  );
}

async function geocodeLocation(query: string): Promise<GeocodingResult | undefined> {
  const locationParts = query
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const searchQueries = Array.from(new Set([query, locationParts[0]].filter(Boolean)));
  const locationHints = locationParts.slice(1).map((part) => part.toLowerCase());

  for (const searchQuery of searchQueries) {
    const geocodingUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geocodingUrl.searchParams.set("name", searchQuery);
    geocodingUrl.searchParams.set("count", "10");
    geocodingUrl.searchParams.set("language", "en");
    geocodingUrl.searchParams.set("format", "json");

    const geocoding = await fetchJson<GeocodingResponse>(geocodingUrl);
    const location = selectLocation(geocoding.results ?? [], locationHints);

    if (location) {
      return location;
    }
  }

  return undefined;
}

export async function fetchTenDayTemperatureForecast(
  locationQuery: string,
): Promise<TemperatureForecast> {
  const query = locationQuery.trim();

  if (!query) {
    throw new Error("Enter a city or place name.");
  }

  const location = await geocodeLocation(query);

  if (!location) {
    throw new Error("No matching location found.");
  }

  const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
  forecastUrl.searchParams.set("latitude", String(location.latitude));
  forecastUrl.searchParams.set("longitude", String(location.longitude));
  forecastUrl.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");
  forecastUrl.searchParams.set("temperature_unit", "fahrenheit");
  forecastUrl.searchParams.set("timezone", "auto");
  forecastUrl.searchParams.set("forecast_days", "10");

  const forecast = await fetchJson<ForecastResponse>(forecastUrl);
  const dates = forecast.daily?.time ?? [];
  const highs = forecast.daily?.temperature_2m_max ?? [];
  const lows = forecast.daily?.temperature_2m_min ?? [];

  const days = dates
    .map((date, index) => ({
      date,
      highF: highs[index],
      lowF: lows[index],
    }))
    .filter(
      (day): day is DailyTemperatureForecast =>
        Boolean(day.date) && Number.isFinite(day.highF) && Number.isFinite(day.lowF),
    )
    .slice(0, 10);

  if (days.length === 0) {
    throw new Error("No daily temperature forecast was returned for this location.");
  }

  return {
    locationLabel: buildLocationLabel(location),
    days,
    hottestHighF: Math.max(...days.map((day) => day.highF)),
    sourceUrl: forecastUrl.toString(),
  };
}
