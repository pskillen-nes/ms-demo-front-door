import React from "react";

import {BaseScreen, BaseScreenProps} from "@nes-digital-service/turas.design-system-react/dist/screens/BaseScreen";

import {SiteConfig} from "../siteConfig";
import NavbarItems from "../navbarItems";

export default function SiteBaseScreen(props: BaseScreenProps): JSX.Element {

  return <BaseScreen {...SiteConfig}
                     {...NavbarItems}
                     {...props}
  />
}
