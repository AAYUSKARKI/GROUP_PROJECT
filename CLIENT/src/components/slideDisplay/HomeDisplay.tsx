import { useEffect, useState } from "react";

import banner1 from "../../../../assests/banner3.jpeg";
import banner2 from "../../../../assests/banner4.jpeg";
import bigbanner1 from "../../../../assests/homebanner.jpeg";
import bigbanner2 from "../../../../assests/banner2.jpeg";
import { useSelector } from "react-redux";

function HomeDisplay() {
  const {theme} = useSelector((state : any) => state.theme);
  const [currentImage, setCurrentImage] = useState(0);

  const DesktopImages = [bigbanner1, bigbanner2, banner1, banner2];

  const nextImage = () => {
    if (DesktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (DesktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className={`${theme === 'dark' ? 'bg-slate-950' : 'bg-white'} hidden md:flex`}>
    <div className="container mt-2">
      <div className={`flex flex-col gap-8 justify-center h-[70vh] ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'} p-5`}>
        <div className="flex gap-2  ">
          <div className=" h-60 w-full">
            <img src={banner1} alt="" className="h-full w-full object-fill" />
          </div>
          <div className="h-60 w-full">
            <img src={banner2} alt="" className="h-full w-full object-fill" />
          </div>
        </div>
        <div className=" flex h-96  overflow-hidden object-cover">
          {DesktopImages.map((imageUrl, index) => {
            return (
              <div
                key={index}
                className="w-full h-full min-w-full min-h-full transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomeDisplay;
