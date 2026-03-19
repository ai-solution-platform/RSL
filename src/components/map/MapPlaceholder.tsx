'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { properties } from '@/data/properties';
import {
  MapPin,
  Layers,
  Building2,
  Wine,
  Landmark,
  Map as MapIcon,
  X,
  Navigation,
  SquareStack,
} from 'lucide-react';

// Mock pin positions relative to the container (percentage-based)
const mockPins = [
  { id: 'prop-001', x: 45, y: 35, price: 350000 },
  { id: 'prop-002', x: 42, y: 52, price: 180000 },
  { id: 'prop-005', x: 38, y: 55, price: 65000 },
  { id: 'prop-006', x: 62, y: 40, price: 120000 },
  { id: 'prop-007', x: 48, y: 20, price: 35000 },
  { id: 'prop-009', x: 35, y: 48, price: 150000 },
  { id: 'prop-010', x: 60, y: 38, price: 85000 },
  { id: 'prop-013', x: 28, y: 30, price: 45000 },
  { id: 'prop-023', x: 70, y: 60, price: 18000 },
];

const layerOptions = [
  { key: 'spaces', en: 'Available Spaces', th: 'พื้นที่ว่าง', icon: Building2, active: true },
  { key: 'zoning', en: 'Zoning', th: 'โซนนิ่ง', icon: Layers, active: false },
  { key: 'alcohol', en: 'Alcohol Zones', th: 'โซนแอลกอฮอล์', icon: Wine, active: false },
  { key: 'govt', en: 'Gov. Offices', th: 'สำนักงานรัฐ', icon: Landmark, active: false },
  { key: 'land', en: 'Land Parcels', th: 'แปลงที่ดิน', icon: SquareStack, active: false },
];

interface MapPlaceholderProps {
  className?: string;
  onPinClick?: (propertyId: string) => void;
}

export default function MapPlaceholder({ className = '', onPinClick }: MapPlaceholderProps) {
  const { language } = useTranslation();
  const [layers, setLayers] = useState(layerOptions);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [showLayers, setShowLayers] = useState(false);

  const toggleLayer = (key: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.key === key ? { ...l, active: !l.active } : l))
    );
  };

  const selectedProperty = selectedPin
    ? properties.find((p) => p.id === selectedPin)
    : null;

  const handlePinClick = (pinId: string) => {
    setSelectedPin(pinId === selectedPin ? null : pinId);
    onPinClick?.(pinId);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Bangkok-themed gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(187,222,214,0.6) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(187,214,222,0.5) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 50%, rgba(210,230,210,0.4) 0%, transparent 70%),
            linear-gradient(180deg, #E8F0E8 0%, #D4E4D4 30%, #C8DCD0 60%, #B8CCB8 100%)
          `,
        }}
      >
        {/* Grid lines to simulate map streets */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {/* Horizontal streets */}
          {[20, 35, 45, 55, 65, 80].map((y) => (
            <line key={`h-${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#8B9E8B" strokeWidth="1" />
          ))}
          {/* Vertical streets */}
          {[15, 30, 42, 55, 68, 85].map((x) => (
            <line key={`v-${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#8B9E8B" strokeWidth="1" />
          ))}
          {/* Diagonal - simulating Chao Phraya river */}
          <path d="M 10% 10% Q 25% 30%, 20% 50% Q 15% 70%, 25% 90%" stroke="#93B8C8" strokeWidth="8" fill="none" opacity="0.4" />
          {/* Some block fills */}
          <rect x="32%" y="22%" width="8%" height="10%" fill="#C8D8C0" opacity="0.3" rx="2" />
          <rect x="45%" y="40%" width="12%" height="8%" fill="#C8D8C0" opacity="0.3" rx="2" />
          <rect x="60%" y="30%" width="6%" height="12%" fill="#C8D8C0" opacity="0.3" rx="2" />
        </svg>
      </div>

      {/* Mock Property Pins */}
      {layers[0].active &&
        mockPins.map((pin) => (
          <button
            key={pin.id}
            onClick={() => handlePinClick(pin.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-full z-10 transition-all duration-200 ${
              selectedPin === pin.id ? 'scale-125 z-20' : 'hover:scale-110'
            }`}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div
              className={`relative px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-md ${
                selectedPin === pin.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              ฿{(pin.price / 1000).toFixed(0)}K
              <div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                  selectedPin === pin.id ? 'bg-orange-500' : 'bg-white border-r border-b border-gray-200'
                }`}
              />
            </div>
          </button>
        ))}

      {/* Zoning overlay (when active) */}
      {layers[1].active && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[30%] h-[25%] left-[30%] top-[30%] bg-red-400/15 border border-red-400/30 rounded-lg" />
          <div className="absolute w-[20%] h-[20%] left-[55%] top-[25%] bg-orange-400/15 border border-orange-400/30 rounded-lg" />
          <div className="absolute w-[25%] h-[15%] left-[20%] top-[60%] bg-yellow-400/15 border border-yellow-400/30 rounded-lg" />
        </div>
      )}

      {/* Alcohol zone overlay (when active) */}
      {layers[2].active && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[15%] h-[15%] left-[58%] top-[35%] bg-purple-400/20 border-2 border-dashed border-purple-400/40 rounded-full" />
          <div className="absolute w-[12%] h-[12%] left-[35%] top-[50%] bg-purple-400/20 border-2 border-dashed border-purple-400/40 rounded-full" />
        </div>
      )}

      {/* Layer Toggle Panel */}
      <div className="absolute right-3 top-3 z-20">
        <button
          onClick={() => setShowLayers(!showLayers)}
          className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50"
        >
          <Layers size={18} className="text-gray-700" />
        </button>
        {showLayers && (
          <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-w-[160px]">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <button
                  key={layer.key}
                  onClick={() => toggleLayer(layer.key)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors ${
                    layer.active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} />
                  <span className="flex-1 text-left">
                    {language === 'th' ? layer.th : layer.en}
                  </span>
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      layer.active ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                    }`}
                  >
                    {layer.active && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Current location button */}
      <button className="absolute right-3 bottom-20 z-20 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50">
        <Navigation size={18} className="text-blue-600" />
      </button>

      {/* Selected Property Popup */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 z-30">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3">
            <button
              onClick={() => setSelectedPin(null)}
              className="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <X size={12} className="text-gray-500" />
            </button>
            <div className="flex gap-3">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-900 truncate pr-6">
                  {language === 'th' ? selectedProperty.titleTh : selectedProperty.title}
                </h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={10} />
                  {language === 'th'
                    ? selectedProperty.location.districtTh
                    : selectedProperty.location.district}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-blue-600 font-bold text-sm">
                    {formatPrice(selectedProperty.price)}/{language === 'th' ? 'เดือน' : 'mo'}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {selectedProperty.size} {language === 'th' ? 'ตร.ม.' : 'sqm'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Note */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
        <p className="text-[9px] text-gray-400 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
          Interactive map with Leaflet - coming soon
        </p>
      </div>
    </div>
  );
}
