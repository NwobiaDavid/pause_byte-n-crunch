"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const launchDate = '2024-05-06T09:00:00';

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(launchDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]); // Update timer when timeLeft changes

  return (
    <main>
     <div className="h-screen flex justify-center items-center overflow-hidden flex-col w-screen">
      <div className=" border relative w-full flex bg-orange-300 justify-center items-center h-full " >

        <div className=" absolute w-[95%] h-[95%] " >
          <Image className=" blur-sm object-cover " src={"/bg.jpg"} fill alt="background image" />
        </div>

        <div className="z-10 text-white flex flex-col justify-center items-center  ">
          <h1 className=" xl:text-3xl text-center text-lg md:text-xl font-semibold " >
            Currently Byte&Crunch is temporally paused, but we will be back soon
          </h1>
          <div className=" mt-10 lg:text-4xl md:text-2xl text-xl xl:text-7xl text-center  " >
            {timeLeft.days && `${timeLeft.days} days`} {timeLeft.hours && `${timeLeft.hours} hours`} {timeLeft.minutes && `${timeLeft.minutes} minutes`} {timeLeft.seconds && `${timeLeft.seconds} seconds`}
          </div>
        </div>

      </div>
     </div>
    </main>
  );
}
