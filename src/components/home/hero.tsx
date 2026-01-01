import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0 animate-intro-zoom transform-gpu">
        <Image
          src="https://cdn.shopify.com/s/files/1/0568/7843/2302/files/IMG_5193.jpg?v=1755171909"
          alt="Delicious Cake Display"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      <div className="absolute bottom-12 right-3 z-10 text-left md:bottom-[12%] md:right-[4%] lg:right-[8%]">
        <h1 className="font-sans text-xl font-bold leading-snug tracking-wide text-white drop-shadow-md md:text-2xl lg:text-3xl">
          HANDCRAFTED DELIGHTS
          <br />
          FOR EVERY OCCASION.
        </h1>
        <p className="font-sans text-xl font-bold tracking-wide text-white drop-shadow-md md:text-2xl lg:text-3xl">
          MADE FRESH DAILY.
        </p>
      </div>
    </section>
  );
};
