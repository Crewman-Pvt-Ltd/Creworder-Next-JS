import { PermissionsProvider } from "@/contexts/PermissionsContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <PermissionsProvider>
      <Component {...pageProps} />
    </PermissionsProvider>
  );
}
