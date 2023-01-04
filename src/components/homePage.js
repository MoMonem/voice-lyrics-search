import LogoutBtn from "./logoutBtn";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState(""),
    [resultItems, setResultItems] = useState([]),
    [songLyrics, setSongLyrics] = useState(""),
    [prevLink, setPrevLink] = useState(""),
    [nextLink, setNextLink] = useState("");

  // Search by song or artist
  async function searchSongs() {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${search}`),
      data = await res.json();

    if (data.data.length === 0) {
      alert("No results found, try again");
    }

    if (data.prev) {
      setPrevLink(data.prev);
    }

    if (data.next) {
      setNextLink(data.next);
    }

    setResultItems(data.data);
  }

  // Get prev and next songs
  async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    return data;
  }

  // Get lyrics for song
  function getLyrics(artist, songTitle) {
    fetch(`https://api.lyrics.ovh//v1/${artist}/${songTitle}`)
      .then((res) => res.json())
      .then((data) => {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
        setSongLyrics(lyrics);
      })
      .catch((err) => {
        setSongLyrics("No lyrics found");
      });
  }

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
      <div className="container flex flex-col gap-6 justify-center items-center mx-auto py-4">
        <div className="mt-40">
          <p className="text-center max-w-sm md:max-w-lg">
            Write the name of the song or the artist OR use the microphone icon
          </p>
        </div>
        <form
          className="flex gap-4 bg-white rounded-lg p-2"
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
            className="text-black"
          />
          <div className="grid grid-cols-2 gap-3">
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass text-2xl text-black"></i>
            </button>
            <button>
              <i className="fa-solid fa-microphone text-2xl text-black"></i>
            </button>
          </div>
        </form>
        <div className="mx-auto">
          {songLyrics ? (
            <div>
              <p className="text-lg text-red-500">{songLyrics}</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {resultItems.map((item) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => getLyrics(item.artist.name, item.title)}
                    className="max-w-sm border rounded-lg p-2 hover:border-blue-500 hover:cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <img
                        src={
                          item.album
                            ? item.album.cover
                            : "https://via.placeholder.com/150"
                        }
                        alt={item.title}
                      />
                      <div>
                        <h3 className="text-lg">{item.title}</h3>
                        <p className="underline">By {item.artist.name}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {resultItems.length > 0 ? (
            songLyrics ? (
              <button
                className="text-white underline mt-10"
                onClick={() => setSongLyrics("")}
              >
                Go Back
              </button>
            ) : (
              <div className="container mx-auto max-w-sm flex justify-between my-10">
                <button
                  className="text-white underline"
                  onClick={() => {
                    getMoreSongs(prevLink).then((data) => {
                      setResultItems(data.data);
                      setNextLink(data.next);
                      setPrevLink(data.prev);
                    });
                  }}
                >
                  Prev
                </button>
                <button
                  className="text-white underline"
                  onClick={() => {
                    getMoreSongs(nextLink).then((data) => {
                      setResultItems(data.data);
                      setNextLink(data.next);
                      setPrevLink(data.prev);
                    });
                  }}
                >
                  Next
                </button>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
