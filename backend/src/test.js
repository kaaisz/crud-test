const CsvDb = require('csv-db');
const csvDb = new CsvDb('./../database/csvtest.csv', ['id', 'name', 'pass']);

// to get the data
csvDb.get().then((data) => {
  console.log('GET data: ', data);
}, (err) => {
  console.log(err);
});

// // to insert new data
// const newData = {
//   id: 2,
//   name: 'Isabella',
//   pass: 'secretkey'
// }
// csvDb.insert(newData).then((data) => {
//   console.log('INSERT data: ', data);
// }, (err) => {
//   console.log(err);
// })

// // to update existing data (parameter: data, id)
// const updateData = {
//   id: 15,
//   name: 'Rickey',
//   pass: 'secret',
// }
// csvDb.update(updateData, 14).then((data) => {
//   console.log('UPDATE data: ', data);
// }, (err) => {
//   console.log(err);
// });

// // to delete existing data (parameter: id)
// csvDb.delete(17).then((data) => {
//   console.log('DELETE data: ', data);
// }, (err) => {
//   console.log(err);
// })