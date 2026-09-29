import { useState } from "react";
import { Layers, MapPin } from "lucide-react";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { getFarm } from "../../services/data";

const mapLibrary = import("maplibre-gl").then((library) => {
  library.setWorkerUrl(maplibreWorkerUrl);
  return library;
});

type MapLayer = "base" | "climate" | "vegetation" | "soil";

const layers: { id: MapLayer; label: string }[] = [
  { id: "base", label: "Base map" },
  { id: "climate", label: "Climate" },
  { id: "vegetation", label: "Vegetation" },
  { id: "soil", label: "Soil" },
];
const mapStyle = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster" as const,
      source: "osm",
    },
  ],
};
export function FarmMap() {
  const farm = getFarm();
  const [activeLayer, setActiveLayer] = useState<MapLayer>("base");
  const [showLayers, setShowLayers] = useState(false);

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
      <Map
        mapLib={mapLibrary}
        initialViewState={{
          longitude: farm.location.longitude,
          latitude: farm.location.latitude,
          zoom: 11,
        }}
        mapStyle={mapStyle}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="bottom-right" />

        <Marker
          longitude={farm.location.longitude}
          latitude={farm.location.latitude}
          anchor="bottom"
        >
          <div className="flex flex-col items-center">
            <div className="rounded-full border-2 border-white bg-[var(--color-green-800)] p-2 shadow-lg">
              <MapPin
                size={18}
                strokeWidth={2}
                className="text-white"
              />
            </div>

            <div className="mt-1 h-2 w-2 rounded-full bg-[var(--color-green-800)]" />
          </div>
        </Marker>
      </Map>

      {/* Map label */}
      <div className="absolute left-4 top-4 max-w-xs rounded-[var(--radius-md)] border border-white/50 bg-[var(--color-surface)]/95 px-4 py-3 shadow-sm backdrop-blur-sm">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
          Selected farm
        </p>

        <p className="mt-1 text-sm font-medium text-[var(--color-ink)]">
          {farm.name}
        </p>

        <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">
          {farm.location.district}, Bangladesh
        </p>
      </div>

      {/* Layer control */}
      <div className="absolute right-4 top-4">
        <button
          type="button"
          onClick={() => setShowLayers((value) => !value)}
          className="flex items-center gap-2 rounded-[var(--radius-md)] border border-white/60 bg-[var(--color-surface)]/95 px-3 py-2 text-xs font-medium text-[var(--color-ink)] shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          aria-expanded={showLayers}
        >
          <Layers size={15} />
          Layers
        </button>

        {showLayers && (
          <div className="mt-2 min-w-40 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-lg">
            {layers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => {
                  setActiveLayer(layer.id);
                  setShowLayers(false);
                }}
                className={[
                  "block w-full rounded px-3 py-2 text-left text-xs transition-colors",
                  activeLayer === layer.id
                    ? "bg-[var(--color-surface-muted)] font-medium text-[var(--color-green-800)]"
                    : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)]",
                ].join(" ")}
              >
                {layer.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current layer */}
      <div className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-[var(--color-surface)]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)] shadow-sm backdrop-blur-sm">
        {layers.find((layer) => layer.id === activeLayer)?.label}
      </div>

      {/* Demo data indicator */}
      <div className="absolute bottom-4 right-4 rounded-full bg-[var(--color-ink)]/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/80">
        Demo data
      </div>
    </div>
  );
}
