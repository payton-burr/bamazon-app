const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazonApp'
});

connection.connect(function(error) {
  if (error) throw error;
  start();
});

let start = function() {
  connection.query('SELECT * FROM products', function(error, result) {
    if (error) throw error;
    for (let i = 0; i < result.length; i++) {
      console.log(
        result[i].item_id +
          ' | ' +
          result[i].product_name +
          ' | ' +
          result[i].department_name +
          ' | ' +
          result[i].price +
          ' | ' +
          result[i].stock_quantity +
          '\n'
      );
    }

    promptUser(result);
  });
};
