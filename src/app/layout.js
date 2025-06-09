import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.syncfusion.com/ej2/material.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <GoogleOAuthProvider clientId="427600206998-lb3mfkc31r6nvhcp3kpls40e36v0mmd6.apps.googleusercontent.com">
          <div id="app-root">{children}</div>
        </GoogleOAuthProvider>
        <div id="app-modal">

        </div>
      </body>
    </html>
  );
}
