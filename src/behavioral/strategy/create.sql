drop schema if exists design_patterns cascade;
create schema if not exists design_patterns;

create table design_patterns.parking_ticket(
    plate text,
    checkin_date timestamp,
    checkout_date timestamp,
    fare numeric,
    location text
);