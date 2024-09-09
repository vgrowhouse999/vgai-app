import React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{ uri: 'vgai-app-production.up.railway.app' }}  // Replace with your web app URL
      style={{ flex: 1 }}
    />
  );
}
