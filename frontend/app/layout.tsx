import type { PropsWithChildren } from "react";
// import Script from "next/script";
// import { MiroSDKInit } from "@/components/SDKInit";
import "@/assets/style.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" data-panda-theme="asagi">
      <body>
        {/* <Script
          src="https://miro.com/app/static/sdk/v2/miro.js"
          strategy="beforeInteractive"
        /> */}
        {/* <MiroSDKInit /> */}
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
