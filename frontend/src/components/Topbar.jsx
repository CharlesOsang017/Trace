"use client";
import { useState } from "react";
import { Bug, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const pathname = usePathname(); // Use the hook inside the component

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];

  const [isOpen, setIsOpen] = useState(false); // State to control Sheet
  const user = false; // Change this to false to test logged-out state

  return (
    <header className="h-16 border-b border-gray-300 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Logo & Navigation */}
      <div className="flex items-center gap-4 md:gap-6">
        <Bug className="w-6 h-6" />
        <h1 className="text-xl md:text-2xl font-bold">Trace</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-blue-500 transition ${
                pathname === link.href
                  ? "text-blue-500 border-b border-blue-500 transition duration-100 "
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: User Actions / Mobile Menu */}
      <div className="flex items-center gap-4 md:gap-6">
        {user ? (
          <div className="hidden md:flex items-center gap-3">
            <LogOut className="cursor-pointer" />
            <img
              src="https://i.pravatar.cc/150"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold">John Doe</span>
          </div>
        ) : (
          <div className="hidden md:flex gap-3">
            <Button variant="outline">
              <Link href={"/login"}> Login</Link>
            </Button>
            <Button>
              <Link href={"/signup"}>Register</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu (Sheet Sidebar) */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              className="cursor-pointer md:hidden"
              onClick={() => setIsOpen(true)}
            />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6">
            <nav className="flex flex-col space-y-4 text-lg">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-blue-500 transition"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="gap-3 mt-6">
                  <LogOut className="cursor-pointer" />
                  <div className="flex gap-3 items-center py-4">
                    <img
                      src="https://i.pravatar.cc/150"
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-lg font-semibold">John Doe</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <Link href={"/login"}> Login</Link>
                  </Button>
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    <Link href={"/signup"}>Register</Link>
                  </Button>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Topbar;
