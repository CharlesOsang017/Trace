"use client";

import { useState } from "react";
import { Bug, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Topbar = () => {
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
          <Link href="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link href="/issues" className="hover:text-blue-500 transition">
            Issues
          </Link>
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
            <Button variant="outline">Login</Button>
            <Button>Register</Button>
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
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500 transition"
              >
                Home
              </Link>
              <Link
                href="/issues"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500 transition"
              >
                Issues
              </Link>

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
                  >
                    Login
                  </Button>
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    Register
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
