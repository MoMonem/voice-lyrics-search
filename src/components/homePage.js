import LogoutBtn from "./logoutBtn";

const HomePage = () => {
  return (
    <>
      <div className="absolute p-4 container flex justify-end items-center mx-auto">
        <LogoutBtn />
      </div>
      <div class="container h-screen flex flex-col gap-6 justify-center items-center mx-auto py-4 max-w-md">
        <div>
          <p class="text-center">
            Write the name of the song or the artist OR use the microphone icon
          </p>
        </div>
        <form class="flex gap-4">
          <input
            type="text"
            name="search"
            id="search"
            class="px-4 py-2 rounded-lg text-black"
          />
          <div class="grid grid-cols-2 gap-3">
            <button type="submit">
              <i class="fa-solid fa-magnifying-glass text-2xl"></i>
            </button>
            <button>
              <i class="fa-solid fa-microphone text-2xl"></i>
            </button>
          </div>
        </form>
        <div>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomePage;
