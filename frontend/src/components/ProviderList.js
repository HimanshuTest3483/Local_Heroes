@@ .. @@
 import React from 'react';
+import './ProviderList.css';
 
-const ProviderList = ({ providers }) => {
+const ProviderList = ({ providers, onProviderClick, onProviderHover, selectedProvider }) => {
+  const getCategoryIcon = (category) => {
+    const icons = {
+      'Plumber': '🔧',
+      'Electrician': '⚡',
+      'Tiffin Service': '🍱',
+      'Tailor': '✂️',
+      'Carpenter': '🔨',
+    };
+    return icons[category] || '🏠';
+  };
+
+  const formatRating = (rating) => {
+    if (rating === 0) return 'New';
+    return '⭐'.repeat(Math.floor(rating)) + ` ${rating.toFixed(1)}`;
+  };
+
   return (
-    <div>
-      <h2>Service Providers</h2>
-      <ul>
+    <div className="provider-list-container">
+      <div className="provider-list-header">
+        <h2>Service Providers</h2>
+        <span className="provider-count">{providers.length} found</span>
+      </div>
+      
+      {providers.length === 0 ? (
+        <div className="no-providers">
+          <div className="no-providers-icon">🔍</div>
+          <h3>No providers found</h3>
+          <p>Try adjusting your search or category filter</p>
+        </div>
+      ) : (
+        <div className="provider-list">
         {providers.map(provider => (
-          <li key={provider._id}>
-            <strong>{provider.name}</strong> - {provider.category} - {provider.contact}
-          </li>
+          <div
+            key={provider._id}
+            className={`provider-card ${selectedProvider?._id === provider._id ? 'selected' : ''}`}
+            onClick={() => onProviderClick(provider)}
+            onMouseEnter={() => onProviderHover(provider)}
+            onMouseLeave={() => onProviderHover(null)}
+          >
+            <div className="provider-header">
+              <div className="provider-icon">
+                {getCategoryIcon(provider.category)}
+              </div>
+              <div className="provider-info">
+                <h3 className="provider-name">{provider.name}</h3>
+                <span className="provider-category">{provider.category}</span>
+              </div>
+              <div className="provider-rating">
+                {formatRating(provider.rating || 0)}
+              </div>
+            </div>
+            
+            <div className="provider-details">
+              <div className="provider-contact">
+                <span className="contact-icon">📞</span>
+                <span className="contact-number">{provider.contact}</span>
+              </div>
+              <div className="provider-hours">
+                <span className="hours-icon">🕒</span>
+                <span className="hours-text">{provider.operatingHours}</span>
+              </div>
+            </div>
+            
+            <div className="provider-footer">
+              <span className="click-hint">Click to view on map</span>
+            </div>
+          </div>
         ))}
-      </ul>
+        </div>
+      )}
     </div>
   );
 };