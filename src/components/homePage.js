import LogoutBtn from "./logoutBtn";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState("");

  // Search by song or artist
  async function searchSongs() {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${search}`),
      data = await res.json();
    console.log(data);
    return data;
  }

  // // Get prev and next songs
  // async function getMoreSongs(url) {
  //   const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  //   const data = await res.json();

  //   return data;
  // }

  // // Get lyrics for song
  // async function getLyrics(artist, songTitle) {
  //   const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  //   const data = await res.json();

  //   const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  //   result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  // <span>${lyrics}</span>`;

  //   more.innerHTML = "";
  // }

  // // Event listeners
  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   const searchTerm = search.value.trim();

  //   if (!searchTerm) {
  //     alert("Please type in a search term");
  //   } else {
  //     searchSongs(searchTerm);
  //   }
  // });

  // // Get lyrics button click
  // result.addEventListener("click", (e) => {
  //   const clickedEl = e.target;

  //   if (clickedEl.tagName === "BUTTON") {
  //     const artist = clickedEl.getAttribute("data-artist");
  //     const songTitle = clickedEl.getAttribute("data-songtitle");

  //     getLyrics(artist, songTitle);
  //   }
  // });

  return (
    <>
      <div className="absolute p-4 container flex justify-end items-center mx-auto">
        <LogoutBtn />
      </div>
      <div className="container h-screen flex flex-col gap-6 justify-center items-center mx-auto py-4 max-w-md">
        <div>
          <p className="text-center">
            Write the name of the song or the artist OR use the microphone icon
          </p>
        </div>
        <form
          className="flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            searchSongs();
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            id="search"
            className="px-4 py-2 rounded-lg text-black"
          />
          <div className="grid grid-cols-2 gap-3">
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass text-2xl"></i>
            </button>
            <button>
              <i className="fa-solid fa-microphone text-2xl"></i>
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
