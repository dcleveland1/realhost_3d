import React from 'react';
import { Canvas } from '@react-three/fiber';
import ModelViewer from './Components/ModelViewer'; // Asegúrate de que la ruta sea correcta
import './App.css';

const App = () => {
  return (
    <div className="model-container">
        <ModelViewer />
    </div>
  );
};

export default App;
