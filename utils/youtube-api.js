import { CUSTOM_SEARCH_API_KEY } from "@env";

// const url = `https://youtube.googleapis.com/youtube/v3/search?q=tech&key=${CUSTOM_SEARCH_API_KEY}`;

const url = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&maxResults=200&videoCategoryId=28&key=${CUSTOM_SEARCH_API_KEY}`;

export async function getYouTubeList() {
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return result.json();
}
