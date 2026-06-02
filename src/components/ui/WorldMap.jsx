import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useTheme } from "../../context/ThemeContext";

// Natural Earth 110m country polygons from world-atlas (CDN)
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MARKERS = [
  {
    id: "hq",
    name: "Ellisville, MO",
    sub: "HQ · USA",
    coordinates: [-90.5, 38.6],
    isHQ: true,
  },
  {
    id: "ottawa",
    name: "Ottawa",
    sub: "Canada",
    coordinates: [-75.7, 45.4],
    isHQ: false,
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    sub: "India",
    coordinates: [78.5, 17.4],
    isHQ: false,
  },
  {
    id: "pune",
    name: "Pune",
    sub: "India",
    coordinates: [73.9, 18.5],
    isHQ: false,
  },
  {
    id: "manila",
    name: "Manila",
    sub: "Philippines",
    coordinates: [121.0, 14.6],
    isHQ: false,
  },
];

export default function WorldMap() {
  const { isDark } = useTheme();

  const landFill    = isDark ? "#1e3259" : "#c7d9f5";
  const landStroke  = isDark ? "#2a4a80" : "#a0bde8";
  const dotFill     = "#1A56DB";
  const dotStroke   = isDark ? "#111318" : "#F2F0EB";
  const labelColor  = isDark ? "#e2e8f0" : "#0D1B3E";
  const subColor    = isDark ? "#93c5fd" : "#1A56DB";

  return (
    <div className="w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 130, center: [20, 25] }}
        style={{ width: "100%", height: "auto", background: "transparent" }}
        height={460}
      >
        {/* Country fills — no ZoomableGroup so the map is completely static */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={landFill}
                  stroke={landStroke}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover:   { outline: "none", fill: isDark ? "#2d5080" : "#bfdbfe" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Office markers */}
          {MARKERS.map((m, idx) => (
            <Marker key={m.id} coordinates={m.coordinates}>
              {/* Pulse ring */}
              <circle
                r={m.isHQ ? 14 : 10}
                fill={dotFill}
                fillOpacity={0.15}
              >
                <animate
                  attributeName="r"
                  values={m.isHQ ? "8;18;8" : "6;13;6"}
                  dur="2.6s"
                  begin={`${idx * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  values="0.2;0;0.2"
                  dur="2.6s"
                  begin={`${idx * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Solid dot */}
              <circle
                r={m.isHQ ? 5 : 3.5}
                fill={dotFill}
                stroke={dotStroke}
                strokeWidth={1.5}
              />

              {/* Label */}
              <text
                textAnchor="middle"
                y={-(m.isHQ ? 12 : 10)}
                style={{
                  fontSize: m.isHQ ? "7px" : "6px",
                  fontWeight: "700",
                  fontFamily: "system-ui, sans-serif",
                  fill: labelColor,
                  pointerEvents: "none",
                }}
              >
                {m.name}
              </text>
              <text
                textAnchor="middle"
                y={-(m.isHQ ? 3 : 2)}
                style={{
                  fontSize: "5px",
                  fontFamily: "system-ui, sans-serif",
                  fill: subColor,
                  pointerEvents: "none",
                }}
              >
                {m.sub}
              </text>
            </Marker>
          ))}
      </ComposableMap>
    </div>
  );
}
