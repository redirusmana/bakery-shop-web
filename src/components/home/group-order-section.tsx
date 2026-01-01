import Image from "next/image";

export const GroupOrderSection = () => {
  return (
    <section className="bg-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col items-start text-left">
          <div className="mb-4 flex flex-col items-center">
            <Image
              src="/union-bakery-strip.png"
              alt="Union Bakery Logo"
              priority
              className="w-[130px] md:w-[162px] lg:w-[190px] h-auto mb-3 md:mb-5"
              width={162}
              height={50}
            />
          </div>

          <h2 className="mb-6 font-sans text-2xl font-bold uppercase md:text-3xl">
            Group Order
          </h2>

          <p className="mb-8 max-w-lg font-sans text-sm leading-loose md:text-base">
            Whether you&apos;re treating clients or celebrating a company
            milestone, our cakes are sure to impress. We offer a variety of
            sizes to suit any occasion.
          </p>

          <div className="bg-primary cursor-pointer px-6 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-primary">
            Discover More
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="https://cdn.shopify.com/s/files/1/0568/7843/2302/files/IMG_9536-2_3.jpg?v=1751606313"
            alt="Group Order Cakes"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};
