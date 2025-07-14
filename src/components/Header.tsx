import { HomeIcon, File, UsersRound, LogOut } from "lucide-react";
import Link from "next/link";

import { NavButton } from "@/components/NavButton";
import { logout } from "@/app/login/actions";
import { ModeToggle } from "@/components/ModeToggle";
import { NavButtonMenu } from "@/components/NavButtonMenu";

export function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/tickets" label="Home" icon={HomeIcon} />

          <Link
            href="/tickets"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton href="/tickets" label="Tickets" icon={File} />

          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
          />

          <ModeToggle />

          <NavButton
            className="size-4 cursor-pointer m-2"
            onClick={logout}
            label="Logout"
            icon={LogOut}
          />
        </div>
      </div>
    </header>
  );
}
