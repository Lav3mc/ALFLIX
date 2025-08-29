// Mock data for Netflix clone - will be replaced with real TMDB API data later

export const mockMovieData = {
  trending: [
    {
      id: 1,
      title: "Stranger Things",
      overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      poster_path: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      vote_average: 8.7,
      release_date: "2016-07-15",
      genre_ids: [18, 14, 27],
      media_type: "tv",
      youtube_key: "b9EkMc79ZSU"
    },
    {
      id: 2,
      title: "The Witcher",
      overview: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
      poster_path: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
      vote_average: 8.2,
      release_date: "2019-12-20",
      genre_ids: [18, 14, 28],
      media_type: "tv",
      youtube_key: "ndl1W4ltcmg"
    },
    {
      id: 3,
      title: "Wednesday",
      overview: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
      poster_path: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
      vote_average: 8.5,
      release_date: "2022-11-23",
      genre_ids: [35, 80, 14],
      media_type: "tv",
      youtube_key: "Di310WS8zLk"
    }
  ],

  popular: [
    {
      id: 4,
      title: "Avatar: The Way of Water",
      overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
      poster_path: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
      vote_average: 7.6,
      release_date: "2022-12-14",
      genre_ids: [878, 28, 12],
      media_type: "movie",
      youtube_key: "d9MyW72ELq0"
    },
    {
      id: 5,
      title: "Black Panther: Wakanda Forever",
      overview: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death.",
      poster_path: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg",
      vote_average: 7.3,
      release_date: "2022-11-09",
      genre_ids: [28, 12, 18],
      media_type: "movie",
      youtube_key: "_Z3QKkl1WyM"
    },
    {
      id: 6,
      title: "Top Gun: Maverick",
      overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
      poster_path: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
      vote_average: 8.3,
      release_date: "2022-05-24",
      genre_ids: [28, 18],
      media_type: "movie",
      youtube_key: "qSqVVswa420"
    }
  ],

  topRated: [
    {
      id: 7,
      title: "The Shawshank Redemption",
      overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
      poster_path: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
      vote_average: 9.3,
      release_date: "1994-09-23",
      genre_ids: [18, 80],
      media_type: "movie",
      youtube_key: "6hB3S9bIaco"
    },
    {
      id: 8,
      title: "The Godfather",
      overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
      poster_path: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
      vote_average: 9.2,
      release_date: "1972-03-14",
      genre_ids: [18, 80],
      media_type: "movie",
      youtube_key: "sY1S34973zA"
    }
  ],

  action: [
    {
      id: 9,
      title: "John Wick: Chapter 4",
      overview: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
      poster_path: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
      vote_average: 7.8,
      release_date: "2023-03-22",
      genre_ids: [28, 80, 53],
      media_type: "movie",
      youtube_key: "qEVUtrk8_B4"
    },
    {
      id: 10,
      title: "Fast X",
      overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge.",
      poster_path: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
      vote_average: 7.1,
      release_date: "2023-05-17",
      genre_ids: [28, 80, 53],
      media_type: "movie",
      youtube_key: "32RAq6JzY-w"
    }
  ],

  comedy: [
    {
      id: 11,
      title: "Guardians of the Galaxy Vol. 3",
      overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
      poster_path: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3Ga4T7lc.jpg",
      vote_average: 8.0,
      release_date: "2023-05-03",
      genre_ids: [28, 12, 35],
      media_type: "movie",
      youtube_key: "u3V5KDHRQvk"
    }
  ],

  horror: [
    {
      id: 12,
      title: "Scream VI",
      overview: "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.",
      poster_path: "https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
      backdrop_path: "https://image.tmdb.org/t/p/original/b9UCfDzwiWw7mIFsIQR9ZJUeh7q.jpg",
      vote_average: 7.3,
      release_date: "2023-03-08",
      genre_ids: [27, 9648, 53],
      media_type: "movie",
      youtube_key: "h74AXqw4Opc"
    }
  ]
};