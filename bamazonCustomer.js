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

let promptUser = function(result) {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'list',
        message: '------------------------------------------\nWhat would you like to do?',
        choices: ['Buy a product', 'Exit']
      }
    ])
    .then(function(answer) {
      switch (answer.action) {
        case 'Buy a product':
          console.log('BUYING A PRODUCT');
          promptInput(result);
          break;
        case 'Exit':
          console.log('Exiting...');
          process.exit();
          break;
      }
    });
};

let promptInput = function(result) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'item',
        message: 'What item would you like to buy? (Type "Exit" to exit)'
      }
    ])
    .then(function(answer) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].product_name === answer.item) {
          correct = true;
          let product = answer.item;
          let id = i;
          inquirer
            .prompt({
              type: 'input',
              name: 'quantity',
              message: 'How many would you like to buy?',
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            })
            .then(function(answer) {
              if (result[id].stock_quantity - answer.quantity > 0) {
                connection.query(
                  "UPDATE products SET stock_quantity='" +
                    (result[id].stock_quantity - answer.quantity) +
                    "'WHERE product_name='" +
                    product +
                    "'",
                  function(err, result2) {
                    console.log('Purchase Successful!');
                    start();
                  }
                );
              } else {
                console.log('Input not valid');
                promptInput(result);
              }
            });
        } else if ('Exit' === answer.item) {
          process.exit();
        }
      }
    });
};
