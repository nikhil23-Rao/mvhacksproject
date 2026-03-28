export const metadata = {
  title: "AquaStudy",
  description: "Study Tool with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          http-equiv={`Content-Security-Policy" content="default-src 'self'
 data: gap: https://ssl.gstatic.com ${"http://localhost:3001/"} 'unsafe-eval';
 style-src 'self' unsafe-inline'; media-src *`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
