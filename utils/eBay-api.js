// GET https://api.ebay.com/buy/browse/v1/item_summary/search?
// q=string&
// gtin=string&
// charity_ids=string&
// fieldgroups=string&
// compatibility_filter=CompatibilityFilter&
// auto_correct=string&
// category_ids=string&
// filter=FilterField&
// sort=SortField&
// limit=string&
// offset=string&
// aspect_filter=AspectFilter&
// epid=string
import { EBAY_TEST_TOKEN, IOS_CLIENT_ID, CUSTOM_SEARCH_API_KEY } from "@env";

const url = `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=`;
const customSearchUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${CUSTOM_SEARCH_API_KEY}&cx=3508d7b220fa84a7e&q=`;

export async function getItem(text) {
  const result = await fetch(`${url}/${text}`, {
    headers: {
      Authorization: "Bearer " + process.env.EBAY_TEST_TOKEN,
      "Content-Type": "application/json",
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
    },
  });
  return result.json();
}

export function testToken() {
  console.log(EBAY_TEST_TOKEN);
}

export async function customSearch(keyword) {
  console.log(customSearchUrl);
  const result = await fetch(`${customSearchUrl}/${keyword}`);
  return result.json();
}
