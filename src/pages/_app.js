import { PermissionsProvider } from "@/contexts/PermissionsContext";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5 minutes
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
});
export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PermissionsProvider>
        <Component {...pageProps} />
      </PermissionsProvider>
    </QueryClientProvider>
  );
}
