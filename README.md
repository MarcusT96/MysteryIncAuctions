MysteryInc Auctions! 

En handelsplats med mystery boxes där MysteryInc köpt produkter billigt från stora företag som behöver tömma sitt lager för att sedan autkionera ut det till kunder. 

SQL query för att skapa databasen vi kört: 

"""
create table categories
(
    id            int auto_increment
        primary key,
    category_name text not null
);

create table mystery_boxes
(
    id          int auto_increment
        primary key,
    name        varchar(255)   not null,
    weight      decimal(10, 2) not null,
    price       int            not null,
    time        datetime       not null,
    description text           not null,
    category    int            not null,
    image       varchar(255)   not null,
    constraint mystery_boxes_ibfk_1
        foreign key (category) references categories (id)
);

create index category
    on mystery_boxes (category);

create table payment_options
(
    id              int auto_increment
        primary key,
    card_number     text not null,
    expiration_date text not null,
    CVC             text not null,
    type            text not null,
    cardholder_name text not null,
    user_id         text not null
);

create table reviews
(
    id          int auto_increment
        primary key,
    score       int          not null,
    title       varchar(255) not null,
    description text         not null
);

create table users
(
    id        int auto_increment
        primary key,
    email     varchar(255) not null,
    password  varchar(255) not null,
    firstName varchar(255) null,
    lastName  varchar(255) null,
    address   varchar(255) null,
    city      varchar(255) null,
    zipCode   varchar(50)  null,
    country   varchar(100) null,
    phone     varchar(50)  null,
    isAdmin   tinyint(1)   null,
    constraint email
        unique (email)
);

create table bids
(
    id     int auto_increment
        primary key,
    value  int not null,
    userid int not null,
    boxId  int not null,
    constraint bids_ibfk_1
        foreign key (userid) references users (id),
    constraint bids_ibfk_2
        foreign key (boxId) references mystery_boxes (id)
);

create index boxId
    on bids (boxId);

create index userid
    on bids (userid);

create table bought_boxes
(
    id          int auto_increment
        primary key,
    name        varchar(255)   not null,
    weight      decimal(10, 2) not null,
    price       decimal        not null,
    time        datetime       not null,
    description text           not null,
    image       varchar(255)   not null,
    buyer_id    int            not null,
    paid        tinyint(1)     not null,
    delivered   tinyint(1)     not null,
    constraint bought_boxes_ibfk_1
        foreign key (buyer_id) references users (id)
);

create index buyer_id
    on bought_boxes (buyer_id);

"""
