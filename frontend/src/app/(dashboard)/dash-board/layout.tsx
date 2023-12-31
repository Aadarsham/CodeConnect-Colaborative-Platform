"use client";

import { Inter } from "next/font/google";
import ThemeProvider from "@/mui/provider/themeProvider";
import { Box, alpha, lighten } from "@mui/system";
import { useTheme } from "@mui/material";
import Headers from "@/components/Navbars/header";
import Sidebar from "@/components/Navbars/topHeader";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <>
      <ThemeProvider>
        <Box
          sx={{
            flex: 1,
            height: "100%",

            ".MuiPageTitle-wrapper": {
              background:
                theme.palette.mode === "dark"
                  ? theme.colors.alpha.trueWhite[5]
                  : theme.colors?.alpha.white[50],
              marginBottom: `${theme.spacing(4)}`,
              boxShadow:
                theme.palette.mode === "dark"
                  ? `0 1px 0 ${
                      alpha(lighten(theme.colors.primary.main, 0.7), 0.15) || ""
                    }, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                  : `0px 2px 4px -3px ${alpha(
                      theme.colors?.alpha.black[100] || "#FFFFFF",
                      0.1
                    )}, 0px 5px 12px -4px ${alpha(
                      theme.colors?.alpha.black[100] || "#FFFFFF",
                      0.05
                    )}`,
            },
          }}
        >
          <Headers />
          <Sidebar />
          <Box
            sx={{
              position: "relative",
              zIndex: 5,
              display: "block",
              flex: 1,
              pt: `80px`,
              [theme.breakpoints.up("lg")]: {
                ml: `290px`,
              },
            }}
          >
            <Box display="block">{children}</Box>
          </Box>
        </Box>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
