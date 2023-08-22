import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter, Route, Routes} from "react-router-dom";

import LandingPage from "./pages/Landing";
import {
  GPImageCaptureChooseUpload,
  GPImageCaptureLanding,
  GPImageCaptureUpload,
  GPImageSendPatientRequest,
  GPImageSendPatientRequestEmail,
  GPImageSendPatientRequestPatientUpload
} from "./pages/GPImageCapture";

import '@nes-digital-service/turas.design-system-react/dist/turas.css';
import './turas-overrides.css';

function App(): React.ReactElement {
  return (
    <HashRouter basename={'/'}>
      <Routes>

        <Route path="/" element={<LandingPage/>}/>

        <Route path="/gp-image-capture" element={<GPImageCaptureLanding/>}/>
        <Route path="/gp-image-capture/choose-upload" element={<GPImageCaptureChooseUpload/>}/>
        <Route path="/gp-image-capture/upload" element={<GPImageCaptureUpload/>}/>
        <Route path="/gp-image-capture/patient-request" element={<GPImageSendPatientRequest/>}/>
        <Route path="/gp-image-capture/patient-request/email" element={<GPImageSendPatientRequestEmail/>}/>
        <Route path="/gp-image-capture/patient-upload" element={<GPImageSendPatientRequestPatientUpload/>}/>

        <Route path="*" element={<LandingPage/>}/>

      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
