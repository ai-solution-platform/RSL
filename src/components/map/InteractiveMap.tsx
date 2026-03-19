'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import type { Property } from '@/types';

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Zoning color map
const zoningColors: Record<string, string> = {
  commercial: '#EF4444',
  mixed_use: '#F97316',
  residential_commercial: '#EAB308',
  industrial: '#6B7280',
  special_economic: '#8B5CF6',
};

// Alcohol zone color
const alcoholZoneColor = '#A855F7';

function createPriceIcon(price: number, isSelected: boolean) {
  const priceLabel = price >= 1000 ? `฿${(price / 1000).toFixed(0)}K` : `฿${price.toLocaleString()}`;
  return L.divIcon({
    className: 'custom-price-marker',
    html: `
      <div style="
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 4px 8px;
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        cursor: pointer;
        transform: translate(-50%, -100%);
        ${isSelected
          ? 'background: #F97316; color: white;'
          : 'background: white; color: #1F2937; border: 1.5px solid #E5E7EB;'
        }
      ">
        ${priceLabel}
        <div style="
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          ${isSelected
            ? 'background: #F97316;'
            : 'background: white; border-right: 1.5px solid #E5E7EB; border-bottom: 1.5px solid #E5E7EB;'
          }
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

// Component to fit bounds when properties change
function FitBounds({ properties }: { properties: Property[] }) {
  const map = useMap();
  useEffect(() => {
    if (properties.length > 0) {
      const bounds = L.latLngBounds(
        properties.map((p) => [p.location.lat, p.location.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [properties, map]);
  return null;
}

interface InteractiveMapProps {
  properties: Property[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string | null) => void;
  showSpaces: boolean;
  showZoning: boolean;
  showAlcohol: boolean;
}

export default function InteractiveMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  showSpaces,
  showZoning,
  showAlcohol,
}: InteractiveMapProps) {
  const { language } = useTranslation();

  const selectedProperty = useMemo(
    () => properties.find((p) => p.id === selectedPropertyId) ?? null,
    [properties, selectedPropertyId]
  );

  // Group unique zoning areas for the overlay
  const zoningAreas = useMemo(() => {
    if (!showZoning) return [];
    const seen = new Set<string>();
    return properties
      .filter((p) => {
        const key = `${p.location.district}-${p.zoning.type}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((p) => ({
        lat: p.location.lat,
        lng: p.location.lng,
        type: p.zoning.type,
        color: zoningColors[p.zoning.type] || '#6B7280',
      }));
  }, [properties, showZoning]);

  // Properties that allow alcohol
  const alcoholZones = useMemo(() => {
    if (!showAlcohol) return [];
    return properties.filter((p) => p.zoning.allowAlcohol);
  }, [properties, showAlcohol]);

  return (
    <MapContainer
      center={[13.7563, 100.5018]}
      zoom={12}
      className="w-full h-full z-0"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Zoning overlay circles */}
      {zoningAreas.map((zone, i) => (
        <CircleMarker
          key={`zone-${i}`}
          center={[zone.lat, zone.lng]}
          radius={40}
          pathOptions={{
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.12,
            weight: 1.5,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Alcohol zone highlights */}
      {alcoholZones.map((prop) => (
        <Circle
          key={`alcohol-${prop.id}`}
          center={[prop.location.lat, prop.location.lng]}
          radius={300}
          pathOptions={{
            color: alcoholZoneColor,
            fillColor: alcoholZoneColor,
            fillOpacity: 0.1,
            weight: 2,
            dashArray: '6 4',
            opacity: 0.5,
          }}
        />
      ))}

      {/* Property markers */}
      {showSpaces &&
        properties.map((property) => {
          const isSelected = selectedPropertyId === property.id;
          return (
            <Marker
              key={property.id}
              position={[property.location.lat, property.location.lng]}
              icon={createPriceIcon(property.price, isSelected)}
              eventHandlers={{
                click: () => {
                  onSelectProperty(isSelected ? null : property.id);
                },
              }}
            >
              <Popup
                offset={[0, -10]}
                closeButton={false}
                className="property-popup"
              >
                <div className="w-[240px] p-0 -m-[13px] -mb-[14px]">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-28 object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-gray-900 leading-tight line-clamp-1">
                      {language === 'th' ? property.titleTh : property.title}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={10} className="shrink-0" />
                      {language === 'th'
                        ? property.location.districtTh
                        : property.location.district}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-blue-600 font-bold text-sm">
                        {formatPrice(property.price)}/{language === 'th' ? 'ด.' : 'mo'}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {property.size} {language === 'th' ? 'ตร.ม.' : 'sqm'}
                      </span>
                    </div>
                    {property.trafficScore && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${property.trafficScore}%`,
                              backgroundColor:
                                property.trafficScore >= 80
                                  ? '#22C55E'
                                  : property.trafficScore >= 60
                                  ? '#EAB308'
                                  : '#EF4444',
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {property.trafficScore}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

      <style>{`
        .custom-price-marker {
          background: none !important;
          border: none !important;
        }
        .property-popup .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }
        .property-popup .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        .property-popup .leaflet-popup-tip {
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
      `}</style>
    </MapContainer>
  );
}
