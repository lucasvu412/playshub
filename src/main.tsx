import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import { config } from "./wagmi.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./layouts/Dashboard.tsx";
import Wallet from "./pages/Wallet.tsx";
import { TwaAnalyticsProvider } from "@tonsolutions/telemetree-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./styles/overrides.css";
import App from "./pages/App.tsx";
import Earn from "./pages/Earn.tsx";
import Rank from "./pages/Rank.tsx";
import Invite from "./pages/Invite.tsx";
import NotificationProvider from "./providers/NotificationProvider.tsx";
import ReactGA from "react-ga4";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <App /> },
      { path: "/wallet", element: <Wallet /> },
      { path: "/earn", element: <Earn /> },
      { path: "/rank", element: <Rank /> },
      { path: "/invite", element: <Invite /> },
    ],
  },
]);

ReactGA.initialize("G-LTBMLDFDRK");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TwaAnalyticsProvider
          projectId="16b7a2e2-d85b-486f-9334-b0f08e8f1664"
          apiKey="e3928651-c938-4432-8109-10b230919675"
          appName="Plays Hub"
        >
          <TonConnectUIProvider manifestUrl="https://game.playshub.io/tonconnect-manifest.json">
            <NotificationProvider>
              <RouterProvider router={router} />
            </NotificationProvider>
          </TonConnectUIProvider>
        </TwaAnalyticsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
