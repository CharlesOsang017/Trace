"use client";
import { useState } from "react";
import { Bug, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { handleAuthRequest } from "./utils/apiRequest";
import { toast } from "sonner";
import { BASE_API_URL } from "@/server";

const Topbar = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];

  // Fetch user data
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await handleAuthRequest(async () => {
        const response = await axios.get(`${BASE_API_URL}/users/me`, {
          withCredentials: true,
        });
        return response.data;
      }, setIsLoading);
    },
  });

  // Handle Logout
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${BASE_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      return response.data; // Ensure the result is returned
    },
    onSuccess: () => {
      toast.success("User logged out successfully");
      queryClient.setQueryData(["user"], null); // Refresh user query
      router.push("/login"); // Redirect after logout
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });

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
                  ? "text-blue-500 border-b border-blue-500"
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
            <LogOut onClick={() => mutate()} className="cursor-pointer" />
            <img
              src={user.profileImg || "https://i.pravatar.cc/150"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold">{user.name}</span>
          </div>
        ) : (
          <div className="hidden md:flex gap-3">
            <Button variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/signup">Register</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu className="cursor-pointer md:hidden" />
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
                  <LogOut onClick={() => mutate()} className="cursor-pointer" />
                  <div className="flex gap-3 items-center py-4">
                    <img
                      src={user.profileImg || "https://i.pravatar.cc/150"}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-lg font-semibold">{user.name}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Button variant="outline" className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="w-full">
                    <Link href="/signup">Register</Link>
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
