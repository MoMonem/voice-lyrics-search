import LogoutBtn from "./logoutBtn";

const HomePage = () => {
  const apiURL = "https://api.lyrics.ovh";

  // Search by song or artist
  async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    return data;
  }

  // Get prev and next songs
  async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    return data;
  }

  // Get lyrics for song
  async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

    more.innerHTML = "";
  }

  // Event listeners
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
      alert("Please type in a search term");
    } else {
      searchSongs(searchTerm);
    }
  });

  // Get lyrics button click
  result.addEventListener("click", (e) => {
    const clickedEl = e.target;

    if (clickedEl.tagName === "BUTTON") {
      const artist = clickedEl.getAttribute("data-artist");
      const songTitle = clickedEl.getAttribute("data-songtitle");

      getLyrics(artist, songTitle);
    }
  });

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
