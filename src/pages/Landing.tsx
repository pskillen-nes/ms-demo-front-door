import React from "react";
import {TurasSection} from "@nes-digital-service/turas.design-system-react/dist/components/layout/TurasSection";

import SiteBaseScreen from "./SiteBaseScreen";

export default function LandingPage(): React.ReactElement {
  return <SiteBaseScreen pageTitle="NDP Media Store"
                         pageSubtitle="This is the 'front door' to the NDP's shiny new Media Store"
                         sideNav="off"
  >
    <TurasSection>

      <h2>Getting started</h2>

    </TurasSection>
  </SiteBaseScreen>;
}
