import { useState } from "react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import AdvancedFilters from "@/components/AdvancedFilters";
import SearchBar from "@/components/SearchBar";
import { awards } from "@/lib/products";
import { ChevronRight } from "lucide-react";
import { useProductFilters } from "@/hooks/useProductFilters";

export default function Home() {
  const {
    filteredProducts,
    selectedIntensity,
    setSelectedIntensity,
    selectedVarieties,
    setSelectedVarieties,
    searchQuery,
    setSearchQuery,
    resetFilters,
  } = useProductFilters();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:text-left text-center">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-secondary uppercase tracking-widest">
                  Aceites de Oliva Premium
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  El Arte del <span className="text-secondary">Olivo</span> en
                  tu Mesa
                </h1>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed md:max-w-lg mx-auto md:mx-0">
                Descubrí nuestra selección curada de los mejores aceites de
                oliva virgen extra de Argentina y acetos balsámicos artesanales.
              </p>
              <div className="flex gap-4 pt-4 md:justify-start justify-center">
                <button className="button-primary flex items-center gap-2">
                  Explorar Catálogo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/olivery-hero-banner-AibHKzcbZKEU3XyuYu9R7A.webp"
                alt="Aceites de Oliva Premium"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Products Section */}
      <section id="productos" className="py-20">
        <div className="container">
          <div className="mb-12 text-center md:text-left">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">
              Nuestra Selección
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Aceites <span className="text-secondary">Premium</span>
            </h2>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar por marca, nombre, sabor, intensidad..."
            />
            <AdvancedFilters
              selectedIntensity={selectedIntensity}
              selectedVarieties={selectedVarieties}
              onIntensityChange={setSelectedIntensity}
              onVarietiesChange={setSelectedVarieties}
              onReset={resetFilters}
            />
          </div>

          {/* Results Info */}
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Mostrando{" "}
              <span className="font-semibold text-foreground">
                {filteredProducts.length}
              </span>{" "}
              producto{filteredProducts.length !== 1 ? "s" : ""}
            </p>
            {(searchQuery ||
              selectedIntensity.length > 0 ||
              selectedVarieties.length > 0) && (
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Limpiar todo
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground mb-2">
                No se encontraron productos
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Intenta ajustar tus filtros o búsqueda
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-muted/20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="hidden md:block order-2">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/olivery-about-section-GDJaCJKGHVBVdmaoVn3SwC.webp"
                alt="Sobre Nosotros"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 text-center md:text-left">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-secondary uppercase tracking-widest">
                  Sobre Nosotros
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Pasión por lo{" "}
                  <span className="text-secondary">Auténtico</span>
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En Olivery seleccionamos cuidadosamente los mejores aceites de
                oliva virgen extra de las bodegas más prestigiosas de Argentina.
                Cada producto que ofrecemos cuenta una historia de tradición,
                tierra y dedicación artesanal.
              </p>

              {/* Features */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      Calidad Premium
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Solo trabajamos con productores certificados y premiados
                      internacionalmente.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      Envío a Domicilio
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Entregamos en toda Córdoba con el cuidado que tus
                      productos merecen.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">
                      Atención Personal
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Te asesoramos para que encuentres el aceite perfecto para
                      cada ocasión.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Awards Section */}
      <section id="premios" className="py-20">
        <div className="container">
          <div className="mb-12 text-center md:text-left">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">
              Premios Internacionales
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Reconocimientos que{" "}
              <span className="text-secondary">respaldan</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 md:max-w-2xl mx-auto md:mx-0">
              Seleccionamos aceites que se distinguen en los certámenes más
              exigentes del mundo, con un legado de calidad y consistencia
              reconocida.
            </p>
          </div>

          {/* Awards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="bg-card rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {award.brand}
                  </h3>
                  <p className="text-secondary font-semibold">{award.title}</p>
                </div>

                <ul className="space-y-3">
                  {award.achievements.map((achievement, aidx) => (
                    <li key={aidx} className="flex gap-3">
                      <span className="text-secondary font-bold flex-shrink-0">
                        •
                      </span>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-muted/20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 text-center md:text-left">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-secondary uppercase tracking-widest">
                  Contacto
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Hacé tu <span className="text-secondary">Pedido</span>
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nos encantaría ayudarte a encontrar el aceite perfecto.
                Contáctanos a través de cualquiera de estos canales.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-secondary font-bold">📍</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Ubicación</p>
                    <p className="text-muted-foreground">Córdoba, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-secondary font-bold">✉️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href="mailto:oliveryweb@gmail.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      oliveryweb@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-secondary font-bold">📱</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/3512402359"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      +54 351 240 2359
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="hidden md:block">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/olivery-contact-background-KtjGwFy4Z8EZQVH3pzg37V.webp"
                alt="Contacto"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="py-8 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 text-center">
                🚚 Envío a Domicilio sin Cargo
              </h3>
              <p className="text-muted-foreground mb-6 text-center">
                Si vivís en{" "}
                <span className="font-semibold text-foreground">
                  Barrio Parque Vélez Sarsfield
                </span>
                ,
                <span className="font-semibold text-foreground">
                  {" "}
                  Colinas de Vélez Sarsfield
                </span>
                ,
                <span className="font-semibold text-foreground">
                  {" "}
                  Residencial Vélez Sarsfield
                </span>{" "}
                o
                <span className="font-semibold text-foreground">
                  {" "}
                  Altos de Vélez Sarsfield
                </span>
                , podés comprar aceites de oliva premium con entrega a domicilio
                sin cargo.
              </p>

              <div className="bg-background rounded-lg p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-3 text-center">
                  🕐 Horarios de Entrega
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground">
                      Lunes a viernes
                    </p>
                    <p className="text-muted-foreground">15:00 hs a 19:00 hs</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Sábados</p>
                    <p className="text-muted-foreground">10:00 hs a 13:00 hs</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                  ⏱️ Los pedidos recibidos hasta las{" "}
                  <span className="font-semibold text-foreground">
                    14:00 hs
                  </span>{" "}
                  se despachan en el día y se entregan hasta las 19:00 hs. Los
                  pedidos posteriores a ese horario se despachan al día
                  siguiente, siempre con entrega por la tarde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4">Olivery</h3>
              <p className="text-background/80 text-sm leading-relaxed">
                Aceites de oliva virgen extra premium de Argentina,
                seleccionados con pasión y dedicación.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li>
                  <a
                    href="#productos"
                    className="hover:text-background transition-colors"
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <a
                    href="#nosotros"
                    className="hover:text-background transition-colors"
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#premios"
                    className="hover:text-background transition-colors"
                  >
                    Premios
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="hover:text-background transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li>
                  <a
                    href="mailto:oliveryweb@gmail.com"
                    className="hover:text-background transition-colors"
                  >
                    oliveryweb@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/3512402359"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-background transition-colors"
                  >
                    +54 351 240 2359
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8">
            <p className="text-center text-sm text-background/60">
              © 2026 Olivery. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
