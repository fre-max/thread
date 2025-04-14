
import Bottombar from "@/Components/shared/Bottombar";
import LeftSidebar from "@/Components/shared/LeftSidebar";
import RightSidebar from "@/Components/shared/RightSidebar";
import Topbar from "@/Components/shared/Topbar";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title:"Threads",
  description:"A Next/js 13 Meta Threads Application"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={``}
        >
        <Topbar/>
        <main className="flex flex-row">
        <LeftSidebar/>
        
        <section className="main-container">
          <div className="w-full max-w-4xl">
         {children}
          </div>
        </section>
        
        <RightSidebar/>

        </main>

        <Bottombar/>

      </body>
    </html>
     </ClerkProvider>
  );
}
