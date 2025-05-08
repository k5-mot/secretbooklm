import "@/assets/style.css";
import type { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" data-panda-theme="asagi">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
