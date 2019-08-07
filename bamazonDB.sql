drop database if exists bamazonApp;
create database bamazonApp;
use bamazonApp;

create table products (
	item_id int not null auto_increment,
    product_name varchar(45) not null,
    department_name varchar(45),
    price int default 0,
    stock_quantity int default 0,
    primary key (item_id)
);

select * from products;

insert into products (product_name, department_name, price, stock_quantity)
values ("Nike Zoom Pegasus", "Shoes", 79, 2),
	   ("Clifton 6", "Shoes", 120, 2),
       ("Corsair K70", "Computer", 80, 1),
       ("Steelseries Arctis 7", "Computer", 90, 3),
       ("Logitech MX Sound", "Audio/Stereo", 70, 5),
       ("HyperX Cloud Flight", "Audio/Stereo", 120, 4),
       ("Pavlov VR", "Video Games", 15, 10),
       ("Borderlands 2", "Video Games", 20, 10),
       ("Alex Drawers", "Furniture", "90", 8),
       ("Karlby Countertop", "Furniture", 129, 1);
       
select * from products;