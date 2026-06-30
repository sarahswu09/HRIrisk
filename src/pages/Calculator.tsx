import React, { useEffect, useState } from "react";
import { MODEL_CONFIG } from "../config/modelConfig";
import {
  fetchTenDayTemperatureForecast,
  type TemperatureForecast,
} from "../services/weather";

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a2e",
  },
  nav: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navIcon: {
    width: "32px",
    height: "32px",
    backgroundColor: "#2563eb",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
  },
  navTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#1a1a2e",
    letterSpacing: "-0.02em",
  },
  navSubtitle: {
    fontSize: "0.75rem",
    color: "#64748b",
    fontWeight: 400,
  },
  navBadge: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    fontSize: "0.7rem",
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: "20px",
    border: "1px solid #bfdbfe",
  },
  main: {
    maxWidth: "780px",
    margin: "0 auto",
    padding: "2.5rem 1.5rem 4rem",
  },
  pageHeader: {
    marginBottom: "2.5rem",
    textAlign: "center" as const,
  },
  pageTitle: {
    fontSize: "1.875rem",
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.03em",
    marginBottom: "0.5rem",
  },
  pageSubtitle: {
    fontSize: "0.9375rem",
    color: "#64748b",
    lineHeight: 1.6,
    maxWidth: "560px",
    margin: "0 auto",
  },
  auc: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#f0fdf4",
    color: "#16a34a",
    border: "1px solid #bbf7d0",
    borderRadius: "20px",
    padding: "4px 12px",
    fontSize: "0.78rem",
    fontWeight: 600,
    marginTop: "0.75rem",
  },
  disclaimer: {
    backgroundColor: "#fff7ed",
    border: "1px solid #fed7aa",
    borderRadius: "10px",
    padding: "1rem 1.25rem",
    marginBottom: "2rem",
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
  },
  disclaimerIcon: {
    fontSize: "1.1rem",
    flexShrink: 0,
    marginTop: "1px",
  },
  disclaimerText: {
    fontSize: "0.8125rem",
    color: "#92400e",
    lineHeight: 1.6,
  },
  disclaimerTitle: {
    fontWeight: 700,
    marginBottom: "2px",
    color: "#78350f",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "1.25rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  sectionTitle: {
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sectionIcon: {
    width: "26px",
    height: "26px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  },
  label: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    padding: "9px 12px",
    borderRadius: "8px",
    border: "1.5px solid #e2e8f0",
    fontSize: "0.875rem",
    color: "#1a1a2e",
    backgroundColor: "#fff",
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "'DM Sans', sans-serif",
    appearance: "none" as const,
  },
  comorbidityGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.625rem",
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  toggleRowActive: {
    backgroundColor: "#eff6ff",
    border: "1.5px solid #93c5fd",
  },
  toggleLabel: {
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "#374151",
    lineHeight: 1.3,
  },
  toggleLabelActive: {
    color: "#1d4ed8",
  },
  toggle: {
    position: "relative" as const,
    width: "34px",
    height: "18px",
    flexShrink: 0,
  },
  toggleTrack: {
    width: "34px",
    height: "18px",
    borderRadius: "9px",
    transition: "background-color 0.2s",
  },
  toggleThumb: {
    position: "absolute" as const,
    top: "2px",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    transition: "left 0.2s",
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "0.9375rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "-0.01em",
    transition: "background-color 0.15s, transform 0.1s",
    marginTop: "0.5rem",
  },
  resetBtn: {
    width: "100%",
    padding: "11px",
    backgroundColor: "transparent",
    color: "#64748b",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    marginTop: "0.5rem",
  },
  resultCard: {
    backgroundColor: "#ffffff",
    border: "2px solid #2563eb",
    borderRadius: "14px",
    padding: "1.75rem",
    marginBottom: "1.25rem",
    boxShadow: "0 4px 20px rgba(37,99,235,0.1)",
  },
  resultTitle: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "0.5rem",
  },
  resultProbability: {
    fontSize: "3rem",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    marginBottom: "0.25rem",
  },
  resultSubtext: {
    fontSize: "0.8125rem",
    color: "#64748b",
    marginBottom: "1.5rem",
  },
  gaugeContainer: {
    marginBottom: "1.25rem",
  },
  gaugeBar: {
    height: "12px",
    borderRadius: "6px",
    background: "linear-gradient(to right, #22c55e 0%, #eab308 50%, #ef4444 100%)",
    position: "relative" as const,
    marginBottom: "6px",
  },
  gaugeMarker: {
    position: "absolute" as const,
    top: "-3px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#0f172a",
    border: "3px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    transform: "translateX(-50%)",
  },
  gaugeLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.7rem",
    color: "#94a3b8",
    fontWeight: 600,
  },
  classificationBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.8125rem",
    fontWeight: 700,
    marginBottom: "1rem",
  },
  interpretationBox: {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    padding: "1rem",
    fontSize: "0.8125rem",
    color: "#475569",
    lineHeight: 1.7,
    border: "1px solid #e2e8f0",
  },
  metricRow: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1rem",
  },
  metricChip: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    padding: "10px 12px",
    textAlign: "center" as const,
    border: "1px solid #e2e8f0",
  },
  metricValue: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: "#0f172a",
  },
  metricLabel: {
    fontSize: "0.7rem",
    color: "#94a3b8",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  forecastForm: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "flex-end",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  forecastInputWrap: {
    flex: "1 1 260px",
    minWidth: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  },
  compactButton: {
    padding: "10px 14px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.8125rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    whiteSpace: "nowrap" as const,
  },
  compactButtonDisabled: {
    backgroundColor: "#94a3b8",
    cursor: "not-allowed",
  },
  secondaryCompactButton: {
    padding: "9px 12px",
    backgroundColor: "#f8fafc",
    color: "#334155",
    border: "1.5px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "0.78rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    whiteSpace: "nowrap" as const,
  },
  forecastError: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    borderRadius: "8px",
    padding: "0.75rem 0.875rem",
    fontSize: "0.8125rem",
    marginBottom: "1rem",
  },
  forecastMeta: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "space-between",
    gap: "0.5rem",
    color: "#475569",
    fontSize: "0.8125rem",
    fontWeight: 600,
    marginBottom: "0.75rem",
  },
  forecastGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(118px, 1fr))",
    gap: "0.625rem",
  },
  forecastDay: {
    appearance: "none" as const,
    textAlign: "left" as const,
    backgroundColor: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    padding: "0.75rem",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  forecastDayHot: {
    boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.22)",
  },
  forecastDate: {
    color: "#ffffff",
    fontSize: "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    marginBottom: "0.35rem",
  },
  forecastHigh: {
    color: "#0f172a",
    fontSize: "1.2rem",
    fontWeight: 800,
    lineHeight: 1,
  },
  forecastLow: {
    color: "#64748b",
    fontSize: "0.78rem",
    fontWeight: 600,
    marginTop: "0.25rem",
  },
  forecastActions: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    marginTop: "1rem",
  },
  sourceLink: {
    color: "#2563eb",
    fontSize: "0.78rem",
    fontWeight: 600,
    textDecoration: "none",
  },
  footer: {
    borderTop: "1px solid #e2e8f0",
    marginTop: "2rem",
    paddingTop: "1.5rem",
    textAlign: "center" as const,
  },
  footerLink: {
    color: "#2563eb",
    fontSize: "0.875rem",
    fontWeight: 700,
    textDecoration: "none",
  },
};

const comorbidities = MODEL_CONFIG.comorbidities;
const DEFAULT_WEATHER_LOCATION = "New York City, New York";

const initialComorbidities: Record<string, boolean> = {};
comorbidities.forEach((c) => (initialComorbidities[c.key] = false));

function computeProbability(
  age: string,
  sex: string,
  race: string,
  comorbs: Record<string, boolean>,
  maxVal: number
): number {
  const { intercept, coefficients, comorbidities: comorbList } = MODEL_CONFIG;
  let eta = intercept;
  eta += coefficients.age[age]?? 0;
  eta += maxVal * coefficients.max;
  eta += coefficients.sex[sex] ?? 0;
  eta += coefficients.race[race] ?? 0;
  comorbList.forEach(({ key, coefficient }) => {
    if (comorbs[key]) eta += coefficient;
  });
  return 1 / (1 + Math.exp(-eta));
}

function formatForecastDate(date: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatTemp(value: number): string {
  return `${Math.round(value)}°F`;
}

const FORECAST_COLOR_LOW_F = 65;
const FORECAST_COLOR_HIGH_F = 104;
const FORECAST_COLOR_ICE_BLUE = { r: 224, g: 247, b: 255 };
const FORECAST_COLOR_ORANGE = { r: 249, g: 115, b: 22 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function mixChannel(start: number, end: number, amount: number): number {
  return Math.round(start + (end - start) * amount);
}

function mixRgb(
  start: typeof FORECAST_COLOR_ICE_BLUE,
  end: typeof FORECAST_COLOR_ICE_BLUE,
  amount: number,
): string {
  return `rgb(${mixChannel(start.r, end.r, amount)}, ${mixChannel(
    start.g,
    end.g,
    amount,
  )}, ${mixChannel(start.b, end.b, amount)})`;
}

function getForecastTemperatureStyle(highF: number): React.CSSProperties {
  const heatAmount = clamp(
    (highF - FORECAST_COLOR_LOW_F) / (FORECAST_COLOR_HIGH_F - FORECAST_COLOR_LOW_F),
    0,
    1,
  );

  return {
    backgroundColor: mixRgb(FORECAST_COLOR_ICE_BLUE, FORECAST_COLOR_ORANGE, heatAmount),
    borderColor: mixRgb(
      { r: 125, g: 211, b: 252 },
      FORECAST_COLOR_ORANGE,
      heatAmount,
    ),
  };
}

export default function Calculator() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [race, setRace] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [comorbs, setComorbs] = useState<Record<string, boolean>>({ ...initialComorbidities });
  const [result, setResult] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [weatherLocation, setWeatherLocation] = useState(DEFAULT_WEATHER_LOCATION);
  const [forecast, setForecast] = useState<TemperatureForecast | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState("");

  const toggleComorbidity = (key: string) => {
    setComorbs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setMaxTemperatureFromForecast = (temperature: number) => {
    setMaxTemp(temperature.toFixed(1));
    setErrors((prev) => {
      if (!prev.maxTemp) return prev;
      const next = { ...prev };
      delete next.maxTemp;
      return next;
    });
  };

  const loadForecast = async (location: string) => {
    setForecastError("");
    setForecastLoading(true);

    try {
      const nextForecast = await fetchTenDayTemperatureForecast(location);
      setForecast(nextForecast);
    } catch (error) {
      setForecast(null);
      setForecastError(error instanceof Error ? error.message : "Unable to load forecast.");
    } finally {
      setForecastLoading(false);
    }
  };

  useEffect(() => {
    void loadForecast(DEFAULT_WEATHER_LOCATION);
  }, []);

  const handleForecastSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loadForecast(weatherLocation);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    //if (!age || isNaN(Number(age)) || Number(age) < 0 || Number(age) > 120)
    //  e.age = "Enter a valid age (0-120)";
    if (!age) e.age = "Select age group";
    if (!sex) e.sex = "Select biological sex";
    if (!race) e.race = "Select race/ethnicity";
    if (!maxTemp || isNaN(Number(maxTemp))) e.maxTemp = "Enter a valid MAX value";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const prob = computeProbability(
      //Number(age),
      age,
      sex,
      race,
      comorbs,
      Number(maxTemp)
    );
    setResult(prob);
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setAge("");
    setSex("");
    setRace("");
    setMaxTemp("");
    setComorbs({ ...initialComorbidities });
    setResult(null);
    setSubmitted(false);
    setErrors({});
  };

  const THRESHOLD = MODEL_CONFIG.threshold;
  const isElevated = result !== null && result >= THRESHOLD;
  const pct = result !== null ? (result * 100).toFixed(1) : null;
  const gaugeLeft = result !== null ? `${Math.min(result * 100, 99)}%` : "0%";

  const getRiskLevel = (p: number) => {
    if (p < 0.2) return { label: "Low Risk", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" };
    if (p < 0.4) return { label: "Moderate Risk", color: "#d97706", bg: "#fffbeb", border: "#fde68a" };
    return { label: "High Risk", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" };
  };

  const riskLevel = result !== null ? getRiskLevel(result) : null;

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#2563eb";
    e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#e2e8f0";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={styles.root}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <div style={styles.navIcon}>H</div>
          <div>
            <div style={styles.navTitle}>HRI Risk Calculator</div>
            <div style={styles.navSubtitle}>Prediction Tool for HRI (emergency department visit with heat related illness) </div>
          </div>
        </div>
        {/*<div style={styles.navBadge}>Research Use Only</div> */}
      </nav>

      <main style={styles.main}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>NYC Heat Risk Calculator</h1>
          <p style={styles.pageSubtitle}>
            {/* HRI stands for heat related emergency department visit.*/}
            Enter your demographics, comorbidities, and environmental exposure index 
            to estimate the probability of a Heat-Related emergency hospital visit using 
            a validated elastic-net logistic regression model.
          </p>
          <div style={styles.auc}>
            <span>&#10003;</span> Validated AUC: 0.7957 · 10-fold Cross-Validation
          </div>
        </div>


        {/* Weather Forecast */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>
            <div
              style={{
                ...styles.sectionIcon,
                backgroundColor: "#ecfeff",
                color: "#0e7490",
              }}
            >
              °F
            </div>
            Predicted Daily Temperatures
            <span
              style={{
                fontSize: "0.75rem",
                color: "#94a3b8",
                fontWeight: 400,
                marginLeft: "4px",
              }}
            >
              Next 10 days
            </span>
          </div>

          <form onSubmit={handleForecastSubmit} style={styles.forecastForm}>
            <div style={styles.forecastInputWrap}>
              <label htmlFor="forecast-location" style={styles.label}>
                Forecast Location
              </label>
              <input
                id="forecast-location"
                type="text"
                placeholder="e.g. Phoenix, AZ"
                value={weatherLocation}
                onChange={(e) => setWeatherLocation(e.target.value)}
                style={styles.input}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
            <button
              type="submit"
              disabled={forecastLoading}
              style={
                forecastLoading
                  ? { ...styles.compactButton, ...styles.compactButtonDisabled }
                  : styles.compactButton
              }
            >
              {forecastLoading ? "Loading..." : "Get Forecast"}
            </button>
          </form>

          {forecastError && (
            <div style={styles.forecastError} role="alert">
              {forecastError}
            </div>
          )}

          {forecast && (
            <>
              <div style={styles.forecastMeta} aria-live="polite">
                <span>{forecast.locationLabel}</span>
                {forecast.hottestHighF !== null && (
                  <span>Hottest daily high in 10 days: {formatTemp(forecast.hottestHighF)}</span>
                )}
              </div>

              <div style={styles.forecastGrid}>
                {forecast.days.map((day) => {
                  const isHottest = forecast.hottestHighF === day.highF;
                  return (
                    <button
                      key={day.date}
                      type="button"
                      onClick={() => setMaxTemperatureFromForecast(day.highF)}
                      style={
                        isHottest
                          ? {
                              ...styles.forecastDay,
                              ...getForecastTemperatureStyle(day.highF),
                              ...styles.forecastDayHot,
                            }
                          : {
                              ...styles.forecastDay,
                              ...getForecastTemperatureStyle(day.highF),
                            }
                      }
                      title="Use this high temperature as MAX"
                    >
                      <div style={styles.forecastDate}>{formatForecastDate(day.date)}</div>
                      <div style={styles.forecastHigh}>{formatTemp(day.highF)}</div>
                      <div style={styles.forecastLow}>Low {formatTemp(day.lowF)}</div>
                    </button>
                  );
                })}
              </div>

              <div style={styles.forecastActions}>
                {forecast.hottestHighF !== null && (
                  <button
                    type="button"
                    onClick={() => setMaxTemperatureFromForecast(forecast.hottestHighF!)}
                    style={styles.secondaryCompactButton}
                  >
                    Use Hottest Daily High as "MAX — Environmental Exposure Index"
                  </button>
                )}
                <a
                  href={forecast.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.sourceLink}
                >
                  Forecast source: Open-Meteo
                </a>
              </div>

            </>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* HeatIndex */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <div
                style={{
                  ...styles.sectionIcon,
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                }}
              >
                ☁
              </div>
              Heat Index 
                <span
                style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  fontWeight: 400,
                  marginLeft: "4px",
                }}
              >
                (click on the above forecast to set value, OR input your own value below)
              </span>
            </div>

            <div style={styles.formGrid}>
              <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
                <label style={styles.label}>
                  MAX — Environmental Exposure Index
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "0.72rem",
                      color: "#94a3b8",
                      fontWeight: 400,
                    }}
                  >
                    (Maximum daily temperature in Fahrenheit, °F)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 98.6"
                  value={maxTemp}
                  onChange={(e) => setMaxTemp(e.target.value)}
                  style={{
                    ...styles.input,
                    borderColor: errors.maxTemp ? "#ef4444" : "#e2e8f0",
                    maxWidth: "260px",
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                {errors.maxTemp && (
                  <span style={{ fontSize: "0.75rem", color: "#ef4444" }}>{errors.maxTemp}</span>
                )}
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <div
                style={{
                  ...styles.sectionIcon,
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                }}
              >
                👤
              </div>
              Patient Demographics
            </div>
            
            <div style={styles.formGrid}>

              <div style={styles.formGroup}>
                <label style={styles.label}>Age Group</label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={{
                    ...styles.input,
                    borderColor: errors.age ? "#ef4444" : "#e2e8f0",
                    cursor: "pointer",
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                >
                  <option value="">Select age</option>
                  <option value="Adult (>64)">Adult (64+)</option>
                  <option value="Adult (45-64)">Adult (45-64)</option>
                  <option value="Adult (18-44)">Adult (18-44)</option>
                  <option value="Children (<18)">Children (below 18)</option>
                </select>
                {errors.sex && (
                  <span style={{ fontSize: "0.75rem", color: "#ef4444" }}>{errors.age}</span>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Biological Sex</label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  style={{
                    ...styles.input,
                    borderColor: errors.sex ? "#ef4444" : "#e2e8f0",
                    cursor: "pointer",
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                >
                  <option value="">Select sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.sex && (
                  <span style={{ fontSize: "0.75rem", color: "#ef4444" }}>{errors.sex}</span>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Race / Ethnicity</label>
                <select
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  style={{
                    ...styles.input,
                    borderColor: errors.race ? "#ef4444" : "#e2e8f0",
                    cursor: "pointer",
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                >
                  <option value="">Select race/ethnicity</option>
                  <option value="White non-Hispanic">White non-Hispanic</option>
                  <option value="Black non-Hispanic">Black non-Hispanic</option>
                  <option value="Hispanic">Hispanic</option>
                  <option value="Asian">Asian</option>
                  <option value="Other">Other</option>
                </select>
                {errors.race && (
                  <span style={{ fontSize: "0.75rem", color: "#ef4444" }}>{errors.race}</span>
                )}
              </div>

            </div>
          </div>

          {/* Comorbidities */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <div
                style={{
                  ...styles.sectionIcon,
                  backgroundColor: "#fdf4ff",
                  color: "#9333ea",
                }}
              >
                🩺
              </div>
              Comorbidities
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  fontWeight: 400,
                  marginLeft: "4px",
                }}
              >
                — Toggle Yes / No
              </span>
            </div>
            <div style={styles.comorbidityGrid}>
              {comorbidities.map((c) => {
                const active = comorbs[c.key];
                return (
                  <div
                    key={c.key}
                    style={active ? { ...styles.toggleRow, ...styles.toggleRowActive } : styles.toggleRow}
                    onClick={() => toggleComorbidity(c.key)}
                  >
                    <span
                      style={
                        active
                          ? { ...styles.toggleLabel, ...styles.toggleLabelActive }
                          : styles.toggleLabel
                      }
                    >
                      {c.label}
                    </span>
                    <div style={styles.toggle}>
                      <div
                        style={{
                          ...styles.toggleTrack,
                          backgroundColor: active ? "#2563eb" : "#cbd5e1",
                        }}
                      />
                      <div
                        style={{
                          ...styles.toggleThumb,
                          left: active ? "16px" : "2px",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            style={styles.submitBtn}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#1d4ed8")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#2563eb")
            }
          >
            Calculate HRI Risk Probability
          </button>
          <button type="button" onClick={handleReset} style={styles.resetBtn}>
            Reset All Fields
          </button>
        </form>

        {/* Results */}
        {submitted && result !== null && riskLevel && (
          <div id="result-section" style={{ marginTop: "2rem" }}>
            <div style={styles.resultCard}>
              <div style={styles.resultTitle}>Estimated HRI Risk</div>
              <div
                style={{
                  ...styles.resultProbability,
                  color: riskLevel.color,
                }}
              >
                {pct}%
              </div>
              <div style={styles.resultSubtext}>Predicted probability of Heat-Related Illness</div>

              {/* Gauge */}
              <div style={styles.gaugeContainer}>
                <div style={styles.gaugeBar}>
                  <div style={{ ...styles.gaugeMarker, left: gaugeLeft }} />
                </div>
                <div style={styles.gaugeLabels}>
                  <span>0% — Low</span>
                  <span>50% — Moderate</span>
                  <span>100% — High</span>
                </div>
              </div>

              {/* Classification */}
              <div
                style={{
                  ...styles.classificationBadge,
                  backgroundColor: riskLevel.bg,
                  color: riskLevel.color,
                  border: `1.5px solid ${riskLevel.border}`,
                }}
              >
                <span>{isElevated ? "⬆" : "⬇"}</span>
                {isElevated
                  ? "Elevated Risk — Above Threshold (≥31.4%)"
                  : "Below Threshold (<31.4%)"}
              </div>

              {/* Interpretation */}
              <div style={styles.interpretationBox}>
                {isElevated ? (
                  <>
                    <strong>Elevated HRI risk detected.</strong> This patient's predicted
                    probability ({pct}%) exceeds the Youden-optimal threshold of 31.4%. The model
                    has higher sensitivity (77.6%) than specificity (68.0%) at this cutoff, meaning
                    it is more likely to flag at-risk patients than to miss them. Clinical judgment
                    should guide next steps.
                  </>
                ) : (
                  <>
                    <strong>HOORAY! Risk below threshold.</strong> This patient's predicted probability (
                    {pct}%) is below the Youden-optimal threshold of 31.4%. The model's negative
                    predictive value is 86.4%, meaning most patients below this threshold do not
                    experience an HRI event. 
                  </>
                )}
              </div>


              {/* Model metrics */}
              <div style={styles.metricRow}>
                <div style={styles.metricChip}>
                  <div style={styles.metricValue}>0.796</div>
                  <div style={styles.metricLabel}>AUC</div>
                </div>
                <div style={styles.metricChip}>
                  <div style={styles.metricValue}>77.6%</div>
                  <div style={styles.metricLabel}>Sensitivity</div>
                </div>
                <div style={styles.metricChip}>
                  <div style={styles.metricValue}>68.0%</div>
                  <div style={styles.metricLabel}>Specificity</div>
                </div>
                <div style={styles.metricChip}>
                  <div style={styles.metricValue}>86.4%</div>
                  <div style={styles.metricLabel}>NPV</div>
                </div>
              </div>

               <br />
              {/* Interpretation */}
              <div style={styles.interpretationBox}>
                {isElevated ? (
                  <>

                  <strong>Recommendations</strong>

                  <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                    <li>
                      Do outdoor activities early morning or after sunset, and reserve the
                      hottest hours for indoor, air-conditioned places.
                    </li>

                    <li>
                      When outdoors, one can find nearby NYC cooling centers through the <a
                      href="https://finder.nyc.gov/coolingcenters/"
                      target="_blank"
                      rel="noreferrer"
                      style={styles.footerLink}
                    >
                    NYC Cool Options Finder 
                    </a> or call 311 if needed.
                    </li>

                    <li>
                      Remember to carry water, drink regularly before feeling thirsty, and
                      avoid heavy alcohol intake during the day. Heat exhaustion is
                      associated with excessive loss of water and salt, and CDC lists
                      thirst, heavy sweating, dizziness, weakness, nausea, and headache as
                      warning signs.
                    </li>

                    <li>
                      If you feel dizzy, nauseated, weak, confused, or stop sweating
                      normally, stop immediately and seek help—call 911 for confusion,
                      fainting, or severe symptoms.
                    </li>
                  </ul>

                  <strong><span style={{ color: "red" }}>!!! Warning signs !!!</span></strong>
                  <br />
                  Stop immediately, go indoors and cool down if one has:

                  <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                    <li>
                      Heavy sweating
                    </li>

                    <li>
                      Dizziness or weaknes
                    </li>

                    <li>
                      Headache
                    </li>

                    <li>
                      Nausea
                    </li>

                    <li>
                      Muscle cramps
                    </li>

                    <li>
                      Unusual fatigue
                    </li>                                        
                  </ul>                  

                  These are common heat exhaustion symptoms. CDC recommends moving to a cool place,
                  loosening clothing, cooling the body, sipping water, and getting medical help if symptoms
                  worsen, vomiting occurs, or symptoms last more than 1 hour.
                  <br /><br />
                  <strong>Call 911 immediately if one has:</strong>
                  <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                    <li>
                      Confusion, slurred speech, fainting, seizure, or loss of consciousness
                    </li>

                    <li>
                      Hot skin or very high body temperature
                    </li>

                    <li>
                      Rapid worsening symptoms
                    </li>
                                   
                  </ul>                    
                  CDC states that heat stroke is a medical emergency and can cause permanent disability or
                  death without emergency treatment.
                  </>
                ) : (
                  <> Note: This result does not rule out risk — use clinical judgment. </>
                )}
              </div>


            </div>
          </div>
        )}

        <footer style={styles.footer}>
        {/* Disclaimer */}
        <div style={styles.disclaimer}>
          <span style={styles.disclaimerIcon}>⚠️</span>
          <div style={styles.disclaimerText}>
            <div style={styles.disclaimerTitle}>Important Disclaimer</div>
            This tool is for <strong>research and educational purposes only</strong> — not for
            clinical diagnosis or treatment decisions. The underlying dataset was outcome-sampled 
            from all ED visits during May to September at NYC during 2017-2024;
            raw predicted probabilities may not reflect population-level base rates without
            recalibration. The model was built on a specific inpatient population and performance
            may vary in other settings.{" "}
            <strong>Consult qualified clinical staff before acting on any output.</strong>
          </div>
        </div>          
        </footer>
      </main>
    </div>
  );
}
