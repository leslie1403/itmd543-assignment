const songs = [
  {
    id: 1,
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    genres: ['Pop'],
    moods: ['Happy', 'Energetic'],
    image: 'media/shape-of-you.png'
  },
  {
    id: 2,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    genres: ['Pop', 'Synthwave'],
    moods: ['Energetic'],
    image: 'media/blinding-lights.png'
  },
  {
    id: 3,
    title: 'Someone Like You',
    artist: 'Adele',
    genres: ['Pop', 'Soul'],
    moods: ['Sad', 'Reflective'],
    image: 'media/someone-like-you.jpg'
  },
  {
    id: 4,
    title: 'Thunderstruck',
    artist: 'AC/DC',
    genres: ['Rock'],
    moods: ['Energetic'],
    image: 'media/thunderstruck.png'
  },
  {
    id: 5,
    title: 'Canon in D',
    artist: 'Johann Pachelbel',
    genres: ['Classical'],
    moods: ['Calm', 'Reflective'],
    image: 'media/canon-in-d.png'
  }
];

const allGenres = ['Pop', 'Rock', 'Classical', 'Jazz', 'Hip-Hop', 'Synthwave', 'Soul'];
const allMoods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Reflective'];

const genreButtonsContainer = document.getElementById('genre-buttons');
const moodButtonsContainer = document.getElementById('mood-buttons');
const generateButton = document.getElementById('generate-button');
const playlistContainer = document.getElementById('playlist-container');

let selectedGenres = [];
let selectedMoods = [];

function generateGenreButtons() {
  allGenres.forEach(genre => {
    const button = document.createElement('button');
    button.textContent = genre;
    button.value = genre;
    button.addEventListener('click', () => toggleSelection(button, 'genre'));
    genreButtonsContainer.appendChild(button);
  });
}

function generateMoodButtons() {
  allMoods.forEach(mood => {
    const button = document.createElement('button');
    button.textContent = mood;
    button.value = mood;
    button.addEventListener('click', () => toggleSelection(button, 'mood'));
    moodButtonsContainer.appendChild(button);
  });
}

function toggleSelection(button, type) {
  button.classList.toggle('active');
  const value = button.value;

  if (type === 'genre') {
    if (selectedGenres.includes(value)) {
      selectedGenres = selectedGenres.filter(item => item !== value);
    } else {
      selectedGenres.push(value);
    }
  } else if (type === 'mood') {
    if (selectedMoods.includes(value)) {
      selectedMoods = selectedMoods.filter(item => item !== value);
    } else {
      selectedMoods.push(value);
    }
  }
}

function displayPlaylist(songsToDisplay) {
  playlistContainer.innerHTML = '';

  if (songsToDisplay.length === 0) {
    playlistContainer.innerHTML = '<p>No songs match your selection.</p>';
    return;
  }

  songsToDisplay.forEach(song => {
    const card = document.createElement('div');
    card.classList.add('song-card');

    const songImage = document.createElement('img');
    songImage.src = song.image;
    songImage.alt = song.title;

    const songTitle = document.createElement('h4');
    songTitle.textContent = song.title;

    const songArtist = document.createElement('p');
    songArtist.textContent = `Artist: ${song.artist}`;

    const songGenres = document.createElement('p');
    songGenres.textContent = `Genres: ${song.genres.join(', ')}`;

    const songMoods = document.createElement('p');
    songMoods.textContent = `Moods: ${song.moods.join(', ')}`;

    card.appendChild(songImage);
    card.appendChild(songTitle);
    card.appendChild(songArtist);
    card.appendChild(songGenres);
    card.appendChild(songMoods);

    playlistContainer.appendChild(card);
  });
}

function filterSongs() {
  let filteredSongs = songs;

  if (selectedGenres.length > 0) {
    filteredSongs = filteredSongs.filter(song =>
      song.genres.some(genre => selectedGenres.includes(genre))
    );
  }

  if (selectedMoods.length > 0) {
    filteredSongs = filteredSongs.filter(song =>
      song.moods.some(mood => selectedMoods.includes(mood))
    );
  }

  displayPlaylist(filteredSongs);
}

generateButton.addEventListener('click', filterSongs);

generateGenreButtons();
generateMoodButtons();
displayPlaylist(songs);