let url = `https://get-teched.herokuapp.com/profiles`;
let localUrl = "localhost:3000/profiles";

export async function getProfile(email) {
  console.log("getting profile is running");
  return fetch(`${url}/${email}`).then(function (res) {
    return res.json();
  });
}

export async function createProfile(profile) {
  return fetch(`${url}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  }).then(function (res) {
    console.log("create profile is running", profile);
    return res.json();
  });
}

export async function updateProfile(email, profileUpdate) {
  return fetch(`${url}/${email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileUpdate),
  }).then(function (res) {
    console.log("put profile is running", profileUpdate);
    return res.json();
  });
}
