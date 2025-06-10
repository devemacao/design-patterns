drop schema if exists design_patterns cascade;
create schema if not exists design_patterns;

create table design_patterns.rooms (
    room_id integer,
    category text,
    price numeric,
    status text
);

create table design_patterns.bookings (
    code text,
    room_id integer,
    email text,
    checkin_date timestamp,
    checkout_date timestamp,
    duration integer,
    price numeric,
    status text
);

insert into design_patterns.rooms (room_id, category, price, status) values (1, 'suite', 500, 'available');
insert into design_patterns.rooms (room_id, category, price, status) values (2, 'suite', 500, 'available');
insert into design_patterns.rooms (room_id, category, price, status) values (3, 'standard', 300, 'available');
insert into design_patterns.rooms (room_id, category, price, status) values (4, 'standard', 300, 'maintenance');
insert into design_patterns.rooms (room_id, category, price, status) values (5, 'suite', 500, 'available');
insert into design_patterns.rooms (room_id, category, price, status) values (6, 'suite', 500, 'available');

insert into design_patterns.bookings values ('abc', 1, 'john.doe@teste.com', '2021-03-10T10:00:00', '2021-03-12T10:00:00', 2, 1000, 'confirmed');
insert into design_patterns.bookings values ('def', 2, 'john.doe@teste.com', '2021-03-10T10:00:00', '2021-03-12T10:00:00', 2, 1000, 'confirmed');