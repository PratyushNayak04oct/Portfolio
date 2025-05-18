import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <title>Pratyush Nayak | PORTFOLIO</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
