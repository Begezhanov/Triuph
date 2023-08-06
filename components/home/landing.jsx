import Balancer from "react-wrap-balancer";


export default function Landing() {
  return (
    <main className="relative overflow-hidden flex flex-row-reverse justify-around  px-12 text-center w-full h-screen" >
      <div className="h-max w-max bgvideo absolute"><video src="fight.mp4" autoPlay={true} loop muted></video></div>

      <div className="flex flex-col space-y-36 text-justify justify-center items-end">
        {/* <div className="flex">
          <div className=" text-white text-3xl max-w-xl">
            <div className="font-light">
              <Balancer>
                "Don't stop when you're tired. Stop when you're done"
              </Balancer>
              <div className="text-right py-8 font-bold">- David Goggins</div>
            </div>
          </div>
        </div> */}


        <div className="flex">
          <div className="flex flex-col justify-center text-white text-xl max-w-xl ">
            <div className="font-light">
              <Balancer>
                Empty your mind. Be formless, shapeless, like water.
                You put water into a cup, it becomes the cup. You put water into a bottle, it becomes the bottle.
                You put it into a teapot, it becomes the teapot.
                Now water can flow or it can crash.
                Be water, my friend
              </Balancer>
              <div className="text-right py-8 font-bold">- Bruce Lee</div>
            </div>
          </div>
        </div>
      </div>


      <div
        className="flex justify-center t-0 relative z-10 w-full max-w-xl px-5 xl:px-0 ">
        <div className="absolute inset-0 bg-black opacity-70 "></div> {/* Dark overlay */}
        <div className="relative w-full flex flex-col justify-center items-center px-4 py-5">
          <h1
            className="animate-fade-up  bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem] text-white "
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <Balancer>Welcome to the <span className="animatedText">Triumph</span></Balancer>
          </h1>
          <p
            className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl text-white"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Register and you will be met by our two best Coaches
            </Balancer>
          </p>
          <div
            className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <path
              d="M12 4L20 20H4L12 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
