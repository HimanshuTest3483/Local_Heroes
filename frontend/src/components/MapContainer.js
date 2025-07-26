@@ .. @@
 import React, { useEffect, useRef } from 'react';
 import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
 import L from 'leaflet';
+import './MapContainer.css';
 
 // Fix for default markers in React-Leaflet
 delete L.Icon.Default.prototype._getIconUrl;
@@ -9,7 +10,65 @@
   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
 });
 
-const MapContainer = ({ providers }) => {
+// Custom marker icons for different categories
+const createCustomIcon = (category, isSelected = false, isHovered = false) => {
+  const icons = {
+    'Plumber': '🔧',
+    'Electrician': '⚡',
+    'Tiffin Service': '🍱',
+    'Tailor': '✂️',
+    'Carpenter': '🔨',
+  };
+  
+  const icon = icons[category] || '🏠';
+  const size = isSelected || isHovered ? 40 : 30;
+  const color = isSelected ? '#667eea' : isHovered ? '#28a745' : '#dc3545';
+  
+  return L.divIcon({
+    html: `
+      <div style="
+        background: ${color};
+        width: ${size}px;
+        height: ${size}px;
+        border-radius: 50%;
+        display: flex;
+        align-items: center;
+        justify-content: center;
+        font-size: ${size * 0.5}px;
+        border: 3px solid white;
+        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
+        transition: all 0.3s ease;
+        animation: ${isSelected || isHovered ? 'bounce 0.6s ease-out' : 'none'};
+      ">
+        ${icon}
+      </div>
+      <style>
+        @keyframes bounce {
+          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
+          40% { transform: translateY(-10px); }
+          60% { transform: translateY(-5px); }
+        }
+      </style>
+    `,
+    className: 'custom-marker',
+    iconSize: [size, size],
+    iconAnchor: [size / 2, size / 2],
+  });
+};
+
+const formatRating = (rating) => {
+  if (rating === 0) return 'New Service';
+  return '⭐'.repeat(Math.floor(rating)) + ` ${rating.toFixed(1)}`;
+};
+
+const MapContainer = ({ providers, selectedProvider, hoveredProvider, onProviderClick }) => {
+  const mapRef = useRef();
+
+  // Pan to selected provider
+  useEffect(() => {
+    if (selectedProvider && mapRef.current) {
+      const map = mapRef.current;
+      map.setView([selectedProvider.location.lat, selectedProvider.location.lon], 16, {
+        animate: true,
+        duration: 1,
+      });
+    }
+  }, [selectedProvider]);
+
   return (
-    <div style={{ height: '400px', width: '100%' }}>
+    <div className="map-container">
       <LeafletMap
+        ref={mapRef}
         center={[19.2183, 72.9781]} // Thane coordinates
-        zoom={13}
-        style={{ height: '100%', width: '100%' }}
+        zoom={12}
+        className="leaflet-map"
       >
         <TileLayer
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
@@ -17,11 +76,39 @@
         />
         {providers.map(provider => (
           <Marker
             key={provider._id}
             position={[provider.location.lat, provider.location.lon]}
+            icon={createCustomIcon(
+              provider.category,
+              selectedProvider?._id === provider._id,
+              hoveredProvider?._id === provider._id
+            )}
+            eventHandlers={{
+              click: () => onProviderClick(provider),
+            }}
           >
-            <Popup>
-              <strong>{provider.name}</strong><br />
-              {provider.category}<br />
-              Contact: {provider.contact}
+            <Popup className="custom-popup">
+              <div className="popup-content">
+                <div className="popup-header">
+                  <h3 className="popup-title">{provider.name}</h3>
+                  <span className="popup-category">{provider.category}</span>
+                </div>
+                
+                <div className="popup-details">
+                  <div className="popup-contact">
+                    <span className="popup-icon">📞</span>
+                    <span className="popup-text">{provider.contact}</span>
+                  </div>
+                  <div className="popup-hours">
+                    <span className="popup-icon">🕒</span>
+                    <span className="popup-text">{provider.operatingHours}</span>
+                  </div>
+                  <div className="popup-rating">
+                    <span className="popup-icon">⭐</span>
+                    <span className="popup-text">{formatRating(provider.rating || 0)}</span>
+                  </div>
+                </div>
+                
+                <div className="popup-footer">
+                  <a href={`tel:${provider.contact}`} className="call-button">
+                    📞 Call Now
+                  </a>
+                </div>
+              </div>
             </Popup>
           </Marker>
         ))}