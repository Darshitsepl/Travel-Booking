import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-primary-100 p-5 flex overflow-hidden">
      <div className="max-w-5xl m-auto w-full sm:h-[500px]  rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
        <div className="flex flex-col lg:flex-row h-[100%]">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2 h-full lg:h-auto relative hidden sm:block">
            <Image
              alt="Authentication Banner"
              src="/auth_banner.png"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute z-10 text-white p-8 bottom-0">
              <h2 className="text-3xl font-bold">Travelista Tours</h2>
              <p className="mt-2 text-sm">Travel is the only purchase that enriches you in ways beyond material wealth</p>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12  flex flex-col items-center bg-white h-full right_block_login">
            <div className="max-w-md mx-auto w-full text-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
