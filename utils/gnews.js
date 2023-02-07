let url = `https://get-teched.herokuapp.com/articles`;
let gamingUrl = `https://get-teched.herokuapp.com/gaming-articles`;
let audioUrl = `https://get-teched.herokuapp.com/audio-articles`;
let audioUrlDev = "localhost:3000/audio-articles";
let mobileUrl = `https://get-teched.herokuapp.com/mobile-articles`;

export async function getTechNews(keyword) {
  return fetch(url).then(function (res) {
    return res.json();
  });
}

export async function getGamingNews(keyword) {
  return fetch(gamingUrl).then(function (res) {
    return res.json();
  });
}

export async function getAudioNews(keyword) {
  return fetch(audioUrl).then(function (res) {
    return res.json();
  });
}

export async function getMobileNews(keyword) {
  return fetch(mobileUrl).then(function (res) {
    return res.json();
  });
}
