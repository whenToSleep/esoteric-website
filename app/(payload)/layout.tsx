import "@payloadcms/next/css";
import React from "react";

export const metadata = {
  title: "Esoteric CMS",
  description: "Admin panel",
};

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
