import Navbar from "./Navbar";
import Hero from "./HeroSection";

function Join({ postDetails, homeAds }) {
  return (
    // this is the main code for the responsive width
    <div className="bg-white dark:bg-darkMode flex items-center flex-col w-full ">
      <Navbar />
      <div className="mt-[6rem] w-[90%] xl:w-[90%] 2xl:w-[80%] flex flex-col gap-y-4">
        {homeAds && homeAds.image1 !== "" ? (
          <>
            <a href={homeAds.link1}>
              <img src={homeAds.image1} className=" object-cover " />
            </a>
          </>
        ) : (
          <>
            <img
              src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791130/space_yct71p.gif"
              className=" object-cover "
            />
          </>
        )}
        {homeAds && homeAds.image2 !== "" ? (
          <>
            <a href={homeAds.link2}>
              <img src={homeAds.image2} className=" object-cover " />
            </a>
          </>
        ) : (
          <>
            <img
              src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791130/space_yct71p.gif"
              className=" object-cover "
            />
          </>
        )}
        {homeAds && homeAds.image3 !== "" ? (
          <>
            <a href={homeAds.link3}>
              <img src={homeAds.image3} className=" object-cover " />
            </a>
          </>
        ) : (
          <>
            <img
              src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791130/space_yct71p.gif"
              className=" object-cover "
            />
          </>
        )}
      </div>

      <Hero postDetails={postDetails} />
    </div>
  );
}

export default Join;
