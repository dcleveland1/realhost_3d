import { Stats, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { useState, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export default function App() {
  const gltf = useLoader(GLTFLoader, './models/Barn_Testing.glb');
  const meshsWithHighlightRef = useRef([]);

  const meshArray = ['LoftedBarn_6Wall_10x12_None_Wall1','LoftedBarn_6Wall_10x12_None_Wall2','LoftedBarn_6Wall_10x12_None_Wall3','LoftedBarn_6Wall_10x12_None_Wall4']

  const [highlightedMesh, setHighlightedMesh] = useState({LoftedBarn_6Wall_10x12_None_Wall1: false, LoftedBarn_6Wall_10x12_None_Wall2: false, LoftedBarn_6Wall_10x12_None_Wall3: false, LoftedBarn_6Wall_10x12_None_Wall4: false});
  useEffect(() => {
    gltf.scene.traverse((child) => {
      console.log(child.name)
      const meshExists = meshsWithHighlightRef.current.find(
        (meshData) => meshData.mesh === child
      );
      if (!meshExists) {
        if (child.isMesh && child.name === 'LoftedBarn_6Wall_10x12_None_Wall4') {
          meshsWithHighlightRef.current.push({
            mesh: child,
            originalMaterial: child.material,
          });
        }
        // Agregar otros meshes por nombre aquí
        if (child.isMesh && child.name === 'LoftedBarn_6Wall_10x12_None_Wall1') {
          meshsWithHighlightRef.current.push({
            mesh: child,
            originalMaterial: child.material,
          });
        }
        if (child.isMesh && child.name === 'LoftedBarn_6Wall_10x12_None_Wall2') {
          meshsWithHighlightRef.current.push({
            mesh: child,
            originalMaterial: child.material,
          });
        }
        if (child.isMesh && child.name === 'LoftedBarn_6Wall_10x12_None_Wall3') {
          meshsWithHighlightRef.current.push({
            mesh: child,
            originalMaterial: child.material,
          });
        }
      }
    });
  }, [gltf.scene]);

  const toggleMeshHighlight = (meshName) => {
    setHighlightedMesh((prevHighlightedMesh) => {
      const newHighlightedMesh = {
        ...prevHighlightedMesh,
        [meshName]: !prevHighlightedMesh[meshName],
      };
  
      meshsWithHighlightRef.current.forEach(({ mesh, originalMaterial }) => {
        if (mesh.name === meshName) {
          if (!prevHighlightedMesh[meshName]) {
            // Apply the red material
            mesh.material = new THREE.MeshStandardMaterial({ color: 'red' });
          } else {
            // Restore the original material
            mesh.material = originalMaterial;
          }
        }
      });
  
      return newHighlightedMesh;
    });
  };
  
  console.log(highlightedMesh[meshArray[3]])
  return (
    <div className='model-container'>
      <button className='floating floating_left' onClick={() => toggleMeshHighlight(meshArray[3])}>
        {highlightedMesh.LoftedBarn_6Wall_10x12_None_Wall4
          ? 'Quitar resaltado Left'
          : 'Resaltar Left'}
      </button>
      <button className='floating floating_front' onClick={() => toggleMeshHighlight(meshArray[2])}>
        {highlightedMesh[meshArray[2]]
          ? 'Quitar resaltado Front'
          : 'Resaltar Front'}
      </button>
      <button className='floating floating_right' onClick={() => toggleMeshHighlight(meshArray[1])}>
        {highlightedMesh[meshArray[1]]
          ? 'Quitar resaltado Right'
          : 'Resaltar Right'}
      </button>
      <button className='floating floating_back' onClick={() => toggleMeshHighlight(meshArray[0])}>
        {highlightedMesh[meshArray[0]]
          ? 'Quitar resaltado Back'
          : 'Resaltar Back'}
      </button>
      <Canvas camera={{ position: [-1.5, 1, 7] }}>
        <pointLight position={[5, 10, -5]} intensity={1} color="#fff" />
        <pointLight position={[-5, 10, 5]} intensity={1} color="#fff" />

        <primitive position={[0, 0, -2]} object={gltf.scene} />

        <OrbitControls />
        <Stats />
      </Canvas>
    </div>
  );
}
