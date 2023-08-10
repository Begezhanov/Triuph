
// Empty your mind. Be formless, shapeless, like water. You put water into a cup, it becomes the cup. You put water into a bottle, it becomes the bottle. You put it into a teapot, it becomes the teapot. Now water can flow or it can crash. Be water, my friend


export default function Landing() {
  return (
    <main className="relative overflow-hidden flex flex-row-reverse justify-around ext-center w-full h-screen" >
      <div className="h-max w-max bgvideo absolute"><video src="fight.mp4" autoPlay={true} loop muted></video></div>

      <div className="z-20 flex flex-col md:flex-row h-screen text-white text-right items-center gap-24">
        <section className="bg-stone-950/90 h-full flex items-center px-16 font-extrabold">
          <h1 className="text-5xl text-center">Welcome to <br /><span className="text-red-500">Triumph</span></h1>
        </section>
        <section className="flex flex-col gap-4 mb-24 md:mb-0">
          <blockquote className="max-w-md ">
            Empty your mind. Be formless, shapeless, like water. You put water into a cup, it becomes the cup. You put water into a bottle, it becomes the bottle. You put it into a teapot, it becomes the teapot. Now water can flow or it can crash. Be water, my friend
          </blockquote>
          <span className="font-bold">- Bruce Lee</span>
        </section>
      </div>
    </main>
  );
}
