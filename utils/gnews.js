let apikey = "fdd50a1dfc5be6f20e67338e5d073829";
console.log(apikey);
let url = `https://gnews.io/api/v4/search?q=example&token=${apikey}&lang=en&country=us&max=10`;

export async function getTechNews(keyword) {
  return fetch(url)
    .then(function (res) {
      return res.json();
    })
}
