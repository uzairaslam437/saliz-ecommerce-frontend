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

const Navbar = () => {
  return (
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
                <Link to="/" className="hover:text-blue-500">
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
        <Link to="/cart" className="hover:text-blue-500">
          <ShoppingCart size={26} />
        </Link>
        <Link to="/profile" className="hover:text-blue-500">
          <User size={26} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
