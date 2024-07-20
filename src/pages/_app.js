import { PermissionsProvider } from "@/contexts/PermissionsContext";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Poppins } from "next/font/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5 minutes
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
});

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
    <style jsx global>
      {`
      html {
        font-family: ${poppins.style.fontFamily}
      }
      `}
    </style>
      <QueryClientProvider client={queryClient}>
        <PermissionsProvider>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
        </PermissionsProvider>
      </QueryClientProvider>
    </>
  );
}
