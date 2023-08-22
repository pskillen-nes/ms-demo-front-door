import {BreadcrumbConfig} from "@nes-digital-service/turas.design-system-react/dist/components/layout/Breadcrumbs";


export const breadcrumbConfig: BreadcrumbConfig = {
  "home": {
    title: "Home", url: "/",
    children: {
      "layout": {
        title: "Layout",
        children: {
          "page-banner": {title: "Page banner", url: "/layout/page-banner"},
          "global-navigation": {title: "Global navigation", url: "/layout/global-nav"},
          "application-navigation": {title: "Application navigation", url: "/layout/app-nav"},
          "breadcrumbs": {title: "Breadcrumbs", url: "/layout/breadcrumbs"},
          "base-screen": {title: "Base screen", url: "/layout/base-screen"},
          "side-nav": {title: "Side nav", url: "/layout/side-nav"},
          "sections": {title: "Sections", url: "/layout/sections"},
          "footer": {title: "Footer", url: "/layout/footer"},
        }
      },
      "components": {
        title: "Components",
        children: {
          "alert-boxes": {title: "Alert boxes", url: "/components/alerts"},
          "accordion": {title: "Accordion", url: "/components/accordion"},
          "cards": {title: "Cards", url: "/components/cards"},
          "code-panel": {title: "Code panel", url: "/components/code-panel"},
          "landing-block": {title: "Landing block", url: "/components/landing-block"},
          "loading": {title: "Loading", url: "/components/loading"},
          "tab-panel": {title: "Tab panel", url: "/components/tab-panel"},
          "table-basic": {title: "Table - basic", url: "/components/table/basic"},
          "table-row-column": {title: "Table - row/column", url: "/components/table/row-col"},
        }
      },
      "forms": {
        title: "Forms",
        children: {
          "turas-form": {title: "Turas form", url: "/forms/form"},
          "components": {title: "Components", url: "/forms/components"},
          "layout": {title: "Layout", url: "/forms/layout"},
        }
      },
      "modals": {
        title: "Modals",
        children: {
          "confirm-modal": {title: "Confirm modal", url: "/modals/confirm"},
        }
      },
    }
  },
};
