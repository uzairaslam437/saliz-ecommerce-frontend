// components/Navbar.tsx
import React, { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow font-poppins">
        {/* Left Section: Logo + Navigation */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            Saliz
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6 text-lg">
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/home" className="hover:text-blue-500">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Categories */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-blue-500">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 bg-white shadow rounded">
                  <ul className="flex flex-col space-y-2 text-base">
                    <li>
                      <NavigationMenuLink href="/category/electronics">
                        Electronics
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="/category/clothing">
                        Clothing
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="/category/accessories">
                        Accessories
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full text-base"
          />
        </div>

        {/* Right Section: Cart and Profile */}
        <div className="flex items-center space-x-6 text-lg">
          {/* Cart with Badge - Now opens drawer instead of navigating */}
          <button 
            onClick={handleCartClick}
            className="relative hover:text-blue-500 cursor-pointer p-1"
          >
            <ShoppingCart size={26} />
            {state.totalItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
              >
                {state.totalItems > 99 ? '99+' : state.totalItems}
              </Badge>
            )}
          </button>
          
          <Link to="/profile" className="hover:text-blue-500">
            <User size={26} />
          </Link>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );
};

export default Navbar;