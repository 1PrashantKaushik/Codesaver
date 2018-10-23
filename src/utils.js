export function isLoggedIn() {
  let session = getObject("user");

  let accessToken = session && session.accessToken;

  return accessToken;
}

export function getObject(key) {
  if (window && window.localStorage) {
    return window.localStorage.getItem(key);
  }

  return null;
}

export const addtodb = payload => {
  let datatosave = {
    email: localStorage.getItem("Userlogged"),
    payload: payload
  };
  let options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datatosave)
  };
  console.log("options", options);
  fetch("http://localhost:8081/userdata", options)
    .then(res => {
      console.log("response==>", res);
      return res.json();
    })
    .then(data => {
      console.log("data return in then react---->", data);
    })
    .catch(err => {
      console.log("error in fetch call===>", err);
    });
};

export const registerapi = state => {
  let alldata;
  let { name, email, password, phone } = state;
  const registerdata = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    mycodes: []
  };

  let options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registerdata)
  };

  return fetch("http://localhost:8081/register", options)
    .then(res => {
      console.log("response==>", res);
      return res.json();
    })
    .then(data => {
      console.log("data return in then react---->", data);
      alldata = data;
      return data;
    })
    .catch(err => {
      console.log("error in fetch call===>", err);
    });
};
