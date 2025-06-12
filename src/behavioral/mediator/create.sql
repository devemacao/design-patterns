drop schema if exists  cascade;
create schema if not exists design_patterns;

create table design_patterns.grades(
    student_id integer,
    exam text,
    value numeric
);

create table design_patterns.averages(
    student_id integer,
    value numeric
);