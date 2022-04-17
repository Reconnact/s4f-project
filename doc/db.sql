create database if not exists s4f;
use s4f;
create table profile(profileID int auto_increment, username varchar(45), password varchar(255), firstName varchar(100), lastName varchar(100), PRIMARY KEY (profileID));
create table post(postID int auto_increment, profileID int, title varchar(255), text varchar(1000), date timestamp default CURRENT_TIMESTAMP, PRIMARY KEY (postID), FOREIGN KEY (profileID) references profile(profileID));
