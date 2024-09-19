import { http, createConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [bscTestnet],
  connectors: [
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [bscTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
