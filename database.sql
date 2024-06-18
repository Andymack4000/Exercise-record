create table exercise_record(
    id integer primary key auto_increment,
    exercise_name varchar(100) not null,
    weight_in_kgs integer not null,
    set_num integer not null,
    reps integer not null,
    notes text,
    created timestamp not null default now()
);

insert into exercise_record (exercise_name, weight_in_kgs, set_num, reps)
    values("bench press", 50, 3, 30), ("rows", 50, 3, 30);
    
