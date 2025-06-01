import React from 'react';

import './App.css';
import FormComponent from './component/FormComponent';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      
      <FormComponent />
    </div>
  );
}

export default App;
