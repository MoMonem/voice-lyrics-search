import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState(""),
    [resultItems, setResultItems] = useState([]),
    [songLyrics, setSongLyrics] = useState(""),
    [prevLink, setPrevLink] = useState(""),
    [nextLink, setNextLink] = useState(""),
    { logout } = useAuth0();

  async function searchSongs(searchtext) {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${searchtext}`),
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

  async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    return data;
  }

  function getLyrics(artist, songTitle) {
    fetch(`https://api.lyrics.ovh//v1/${artist}/${songTitle}`)
      .then((res) => res.json())
      .then((data) => {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
        setSongLyrics(lyrics);
      })
      .catch((err) => {
        setSongLyrics("No lyrics found in our the database");
      });
  }

  // Speech recognition
  function startVoiceSearch() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new window.SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = function (e) {
      recognition.stop();
      searchSongs(e.results[0][0].transcript);
      setSearch(e.results[0][0].transcript);
    };
  }

  return (
    <div data-testid="home-page">
      <div className="absolute p-4 container flex justify-end items-center mx-auto">
        <button
          className="bg-blue-600 py-2 px-6 font-bold rounded-lg hover:bg-blue-700"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      </div>
      <div className="container flex flex-col gap-6 justify-center items-center mx-auto py-4">
        <div className="mt-40">
          <p className="text-center max-w-sm md:max-w-lg">
            Write the name of the song or the artist OR use the microphone icon
          </p>
        </div>
        <div className="flex gap-4 bg-white rounded-lg p-2">
          <form
            className="flex gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              searchSongs(e.target.search.value);
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              id="search"
              className="text-black px-2"
            />
            <button type="submit" data-testid="search-icon">
              <i className="fa-solid fa-magnifying-glass text-2xl text-black"></i>
            </button>
          </form>
          <button onClick={startVoiceSearch} data-testid="search-mic">
            <i className="fa-solid fa-microphone text-2xl text-black"></i>
          </button>
        </div>
        <div className="mx-auto text-center">
          {songLyrics ? (
            <div>
              <p className="text-lg text-red-500">{songLyrics}</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {resultItems.map((item) => {
                return (
                  <li
                    id="result-item"
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
    </div>
  );
};

export default HomePage;
