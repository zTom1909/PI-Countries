const server = require("./src/server");
const { conn } = require('./src/db.js');
const startCountriesDb = require("./src/functions/startCountryDb");
const PORT = 3001;

conn.sync({ force: true }).then(() => {
startCountriesDb()
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
