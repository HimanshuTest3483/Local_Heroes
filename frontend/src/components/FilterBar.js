@@ .. @@
 import React from 'react';
+import './FilterBar.css';
 
 const FilterBar = ({ selectedCategory, setSelectedCategory, searchTerm, setSearchTerm }) => {
   const categories = ['All', 'Plumber', 'Electrician', 'Tiffin Service', 'Tailor', 'Carpenter'];
 
   return (
-    <div style={{ marginBottom: '20px' }}>
-      <input
-        type="text"
-        placeholder="Search providers..."
-        value={searchTerm}
-        onChange={(e) => setSearchTerm(e.target.value)}
-        style={{ marginRight: '10px', padding: '5px' }}
-      />
-      <select
-        value={selectedCategory}
-        onChange={(e) => setSelectedCategory(e.target.value)}
-        style={{ padding: '5px' }}
-      >
-        {categories.map(category => (
-          <option key={category} value={category}>{category}</option>
-        ))}
-      </select>
+    <div className="filter-bar">
+      <div className="search-container">
+        <div className="search-input-wrapper">
+          <span className="search-icon">🔍</span>
+          <input
+            type="text"
+            placeholder="Search providers or services..."
+            value={searchTerm}
+            onChange={(e) => setSearchTerm(e.target.value)}
+            className="search-input"
+          />
+        </div>
+      </div>
+      
+      <div className="category-container">
+        <div className="category-buttons">
+          {categories.map(category => (
+            <button
+              key={category}
+              onClick={() => setSelectedCategory(category)}
+              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
+            >
+              {category === 'All' ? '🏠' : getCategoryIcon(category)} {category}
+            </button>
+          ))}
+        </div>
+      </div>
     </div>
   );
 };
 
+const getCategoryIcon = (category) => {
+  const icons = {
+    'Plumber': '🔧',
+    'Electrician': '⚡',
+    'Tiffin Service': '🍱',
+    'Tailor': '✂️',
+    'Carpenter': '🔨',
+  };
+  return icons[category] || '🏠';
+};
+
 export default FilterBar;