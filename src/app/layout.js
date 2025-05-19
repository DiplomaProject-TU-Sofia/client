import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" type="text/css"/>
      </head>
      <body>
        <div id="app-root">
        {children}
        </div>
      </body>
    </html>
  );
}
