const userdb = require("./schema");

module.exports = {
  save(arraydata) {
    return new Promise((resolve, reject) => {
      console.log("inside the api", arraydata);
      userdb.update(
        ({ name: "Prashant" }, { $push: { mycodes: arraydata.datatosend } }),
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  getherAllData() {
    return new Promise((resolve, reject) => {
      userdb.find({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  delete(data) {
    return new Promise((resolve, reject) => {
      userdb.find({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          result[0].mycodes.splice(data.index, 1);
          userdb.update(
            { name: "Prashant" },
            { $set: { mycodes: result[0].mycodes } },
            (req, result) => {
              resolve(result);
            }
          );
          resolve(result);
        }
      });
    });
  },
  edit(info) {
    console.log("Data coming are", info);
    return new Promise((resolve, reject) => {
      userdb.find({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("===>>>", result[0].mycodes);
          result[0].mycodes[info.index].information = info.data;
          console.log(result[0].mycodes);
          userdb.update(
            { name: "Prashant" },
            { $set: { mycodes: result[0].mycodes } },
            (req, result) => {
              console.log(result);
              resolve(result);
            }
          );
          resolve(result);
        }
      });
    });
  }
};
