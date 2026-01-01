import Image from "next/image";

export const QualitySection = () => {
  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-foreground md:h-[600px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://cdn.shopify.com/s/files/1/0568/7843/2302/files/IMG_1502.jpg?v=1760597564"
          alt="Union Made is Well Made"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-12 left-6 z-10 w-full max-w-4xl text-left md:bottom-20 md:left-12">
        <h2 className="mb-2 font-sans text-xl font-bold uppercase text-white drop-shadow-md md:text-xl lg:text-2xl">
          UNION MADE IS WELL MADE
        </h2>

        <p className="font-sans text-sm font-normal text-white/80 md:text-base">
          Our cakes are crafted with premium ingredients to guarantee quality in
          every bite.
        </p>
      </div>
    </section>
  );
};
