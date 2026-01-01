import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-foreground px-6 pt-12 pb-6 text-white md:px-12 md:pt-16 md:pb-6">
      <div className="mx-auto ">
        {" "}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <div className="flex flex-col space-y-6">
            {" "}
            <h3 className="font-sans text-[10px] font-medium uppercase opacity-70">
              UNION BAKERY
            </h3>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/shop"
                className="font-sans text-xs font-semibold uppercase  text-white transition-colors hover:text-gray-300"
              >
                SHOP
              </Link>
              <div className="cursor-pointer font-sans text-xs font-semibold uppercase  text-white transition-colors hover:text-gray-300">
                GROUP ORDER
              </div>
              <div className="cursor-pointer font-sans text-xs font-semibold uppercase  text-white transition-colors hover:text-gray-300">
                FAQ
              </div>
            </nav>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="font-sans text-[10px] font-medium uppercase opacity-70">
              GET IN TOUCH
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-2 font-sans text-xs tracking-wide">
                <span className="font-normal opacity-70">WA.</span>
                <span className="font-semibold text-white">
                  (+62)882 1157 3980
                </span>
              </div>
              <div className="flex items-start gap-3 font-sans text-xs tracking-wide">
                <span className="font-normal opacity-70">E.</span>
                <a
                  href="mailto:bakery@unionjkt.com"
                  className="font-semibold uppercase text-white hover:text-gray-300"
                >
                  BAKERY@UNIONJKT.COM
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="font-sans text-[10px] font-medium uppercase opacity-70">
              CONNECT WITH US
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="cursor-pointer font-sans text-xs font-semibold uppercase  text-white hover:text-gray-300">
                @UNIONJKT
              </div>
              <div className="cursor-pointer font-sans text-xs font-semibold uppercase  text-white hover:text-gray-300">
                @UNION.SBY
              </div>
              <div className="cursor-pointer font-sans text-xs font-semibold  text-white hover:text-gray-300">
                WhatsApp
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="font-sans text-[10px] font-medium uppercase opacity-70">
              LINKS
            </h3>
            <nav className="flex flex-col space-y-4">
              <div className="cursor-pointer font-sans text-xs font-semibold uppercase  text-white hover:text-gray-300">
                TERMS OF SERVICE
              </div>
              <div className="cursor-pointer font-sans text-xs font-semibold uppercase  text-white hover:text-gray-300">
                PRIVACY POLICY
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-20 border-t opacity-70 pt-5 text-left">
          <p className="font-sans text-[10px] opacity-70 tracking-wide">
            &copy; 2025 The Union Group. All rights reserved.{" "}
            <span className="ml-1">Site by Antikode.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
