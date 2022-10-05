create database if not exists s4f;
use s4f;
create table profile(profileID int auto_increment NOT NULL, username varchar(45) NOT NULL, password varchar(255) NOT NULL, firstName varchar(100) NOT NULL, lastName varchar(100) NOT NULL, mail varchar(345) NOT NULL, bio varchar(150), img LONGBLOB NOT NULL ,PRIMARY KEY (profileID));
create table post(postID int auto_increment NOT NULL, profileID int NOT NULL, title varchar(255) NOT NULL, text varchar(1000) NOT NULL, date timestamp default CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (postID), FOREIGN KEY (profileID) references profile(profileID));
create table resetpassword(resetID int auto_increment, profileID int, link varchar(255), PRIMARY KEY(resetID), FOREIGN KEY(profileID) REFERENCES profile(profileID));