let url = `https://get-teched.herokuapp.com/profiles`;

export async function getProfile(email) {
  console.log("getting profile is running");
  return fetch(`${url}/show/${email}`).then(function (res) {
    return res.json();
  });
}

export async function createProfile(profile) {
  return fetch(`${url}/show/${email}/create`, "POST", profile).then(function (
    res
  ) {
    return res.json();
  });
}
