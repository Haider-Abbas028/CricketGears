import { Link } from "react-router-dom";

const Homepage = () => {
  const stats = [
    { value: "10,000+", label: "Products" },
    { value: "500+", label: "Brands" },
    { value: "50,000+", label: "Happy Customers" },
  ];

  const categories = [
    { title: "Bats", to: "/bats", description: "Powerful match-ready bats", img: "/Images/bat.jpg" },
    { title: "Balls", to: "/balls", description: "Precision seam and swing", img: "/Images/ball.png" },
    { title: "Kits", to: "/kits", description: "Complete cricket kits", img: "/Images/kits.webp" },
  ];

  const brands = ["SG", "Kookaburra", "Gray-Nicolls", "SS", "MRF", "Adidas", "Puma", "New Balance", "Nike", "Reebok"];

  const testimonials = [
    { name: "Jahanzaib", rating: "★★★★★", message: "Best gear collection in one place. Quality is premium and delivery was fast." },
    { name: "Haider", rating: "★★★★★", message: "Love the helmet range here. The fit feels secure and the style is sharp." },
    { name: "Ahmad", rating: "★★★★★", message: "Great prices for top brands. I found my favourite bat and the service was excellent." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="py-20 px-6 sm:px-10">
        <div className="mx-auto max-w-7xl flex flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-300">
              Premium Cricket Gear
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Gear Up Like a Pro
            </h1>
            <p className="text-lg text-slate-300">
              Shop the best cricket essentials in a modern blue and gold theme.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/bats" className="rounded-full bg-blue-500 px-8 py-3 font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-400 transition">
                Shop Now
              </Link>
              <Link to="/kits" className="rounded-full border border-amber-400/40 bg-white/5 px-8 py-3 font-semibold text-amber-300 hover:bg-amber-400/10 transition">
                Explore Kits
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-3xl font-bold text-amber-300">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-wide text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="max-w-xl rounded-4xl border border-white/10 bg-slate-900/80 p-8">
            <div className="rounded-3xl border border-white/5 bg-slate-950/90 p-8 text-center">
              <p className="text-sm uppercase tracking-wide text-blue-300">Featured Collection</p>
              <h2 className="mt-4 text-3xl font-bold">Match-ready kits</h2>
              <p className="mt-3 text-slate-300">Top-rated bats, balls and protective gear.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="rounded-3xl border border-blue-400/10 bg-blue-500/10 p-4 text-center">
                <p className="font-semibold">Pro Bats</p>
              </div>
              <div className="rounded-3xl border border-amber-400/10 bg-amber-400/10 p-4 text-center">
                <p className="font-semibold">Gold Grip</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - CENTERED */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-wide text-blue-300">Shop by category</p>
          <h2 className="mt-4 text-3xl font-semibold">Explore our top cricket categories</h2>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {categories.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group rounded-3xl border border-white/10 bg-slate-900/80 overflow-hidden transition hover:-translate-y-1 hover:border-blue-500/30"
              >
                <div className="h-48 w-full bg-slate-800 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-slate-400">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-slate-900/90 py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-wide text-blue-300">Trusted brands</p>
            <h2 className="mt-4 text-3xl font-semibold">Brands you know and trust</h2>
          </div>

          <div className="overflow-hidden rounded-full border border-white/10 bg-slate-950/60 py-4">
            <div className="flex w-[200%] gap-10 px-6" style={{ animation: "marquee 22s linear infinite" }}>
              {brands.concat(brands).map((brand, index) => (
                <div key={`${brand}-${index}`} className="min-w-40 rounded-3xl border border-white/5 bg-slate-900/80 px-6 py-4 text-center font-semibold">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-wide text-blue-300">What our customers say</p>
          <h2 className="mt-4 text-3xl font-semibold">Customer Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-center">
              <p className="text-amber-300 text-2xl">{item.rating}</p>
              <p className="mt-5 text-slate-300">“{item.message}”</p>
              <div className="mt-6 border-t border-white/10 pt-5 text-sm text-slate-400">
                <span className="font-semibold text-white">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;