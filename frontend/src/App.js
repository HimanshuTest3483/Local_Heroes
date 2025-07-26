import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import FilterBar from './components/FilterBar';
import ProviderList from './components/ProviderList';
import MapContainer from './components/MapContainer';
import AddProviderModal from './components/AddProviderModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useAuth } from './contexts/AuthContext';
import './App.css';

const HomePage = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [hoveredProvider, setHoveredProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isAuthenticated } = useAuth();

  // Fetch providers from backend
  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/providers');
      setProviders(response.data);
      setFilteredProviders(response.data);
    } catch (err) {
      setError('Failed to load service providers. Please check if the server is running.');
      console.error('Error fetching providers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // Filter providers based on category and search term
  useEffect(() => {
    let filtered = providers;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(provider => provider.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  }, [providers, selectedCategory, searchTerm]);

  const handleAddProvider = async (providerData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/providers', providerData);
      const newProvider = response.data;
      setProviders(prev => [...prev, newProvider]);
      return newProvider;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add provider');
    }
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
  };

  const handleProviderHover = (provider) => {
    setHoveredProvider(provider);
  };

  if (loading) {
    return (
      <div className="app">
        <LoadingSpinner message="Loading service providers..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <ErrorMessage message={error} onRetry={fetchProviders} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">🏘️ Neighbourhood Service Finder</h1>
        <p className="app-subtitle">Find trusted local service providers in your area</p>
        
        {isAuthenticated && (
          <button 
            className="add-service-btn"
            onClick={() => setIsModalOpen(true)}
          >
            ➕ Add a Service
          </button>
        )}
      </div>

      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="main-content">
        <div className="providers-section">
          <ProviderList
            providers={filteredProviders}
            onProviderClick={handleProviderClick}
            onProviderHover={handleProviderHover}
            selectedProvider={selectedProvider}
          />
        </div>
        
        <div className="map-section">
          <MapContainer
            providers={filteredProviders}
            selectedProvider={selectedProvider}
            hoveredProvider={hoveredProvider}
            onProviderClick={handleProviderClick}
          />
        </div>
      </div>

      <AddProviderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProvider}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;