const userdb = require("./schema");

module.exports = {
  save(arraydata) {
    return new Promise((resolve, reject) => {
      userdb.findOneAndUpdate(
        { email: arraydata.email },
        { $push: { mycodes: arraydata.payload } },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  getherAllData(data) {
    return new Promise((resolve, reject) => {
      userdb.find({ email: data.email }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getherData(data) {
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
      userdb.find({ email: data.email }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          result[0].mycodes.splice(data.index, 1);
          userdb.update(
            { email: data.email },
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
      userdb.find({ email: info.email }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // console.log("===>>>", result[0].mycodes);
          result[0].mycodes[info.index].information = info.data;
          console.log(result[0].mycodes);
          userdb.update(
            { email: info.email },
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
  },
  register(data) {
    console.log("The Data Comin are", data);
    return new Promise((resolve, reject) => {
      userdb.create(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("===>", result);
          resolve(result);
        }
      });
    });
  }
};
