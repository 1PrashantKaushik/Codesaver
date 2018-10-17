export const addtodb = payload => {
  let options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ datatosend: payload })
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