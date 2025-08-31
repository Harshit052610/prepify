import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
        <nav className=" p-0 m-0">
            <div className="-mt-12"> {/* Push content 3rem (48px) up */}
                <Link href="#" className="flex items-center gap-2">
                    <Image src="/NEWLOGOGOLD.png" alt="MockMate Logo" width={210} height={22} />
                </Link>
            </div>
        </nav>







        {children}
    </div>
  );
};

export default Layout;
