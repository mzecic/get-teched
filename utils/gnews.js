let apikey = "fdd50a1dfc5be6f20e67338e5d073829";
console.log(apikey);
let url = `https://gnews.io/api/v4/search?q=technology&token=${apikey}&lang=en&country=us&max=20`;
let gamingUrl = `https://gnews.io/api/v4/search?q=gaming&token=${apikey}&lang=en&country=us&max=20`;
let audioUrl = `https://gnews.io/api/v4/search?q="audio-technology"&token=${apikey}&lang=en&country=us&max=20`;
let mobileUrl = `https://gnews.io/api/v4/search?q=phones&token=${apikey}&lang=en&country=us&max=20`;

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
