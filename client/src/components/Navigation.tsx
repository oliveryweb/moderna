import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Productos", href: "#productos" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Premios", href: "#premios" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/logo_3c3f794f.jpeg"
            alt="Olivery Logo"
            className="h-10 w-auto"
          />
          <a href="/" className="text-2xl font-bold text-primary">
            Olivery
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors duration-300 font-medium text-sm"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-300 group"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />
              )}
            </button>
          )}

          <a
            href="/carrito"
            className="relative p-2 hover:bg-muted rounded-lg transition-colors duration-300 group"
          >
            <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-300"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
