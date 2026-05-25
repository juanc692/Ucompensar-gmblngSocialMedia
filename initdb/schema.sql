create table users(
	id int primary key auto_increment not null,
	name varchar(50) not null,
	points int default 0,
	description varchar(255),
	email varchar(255) not null,
	photo_profile blob,
	password varchar(255) not null
);

create table threads(
	id int primary key auto_increment not null,
	category varchar(50) not null,
	title varchar(255) not null,
	body text not null,
	created_at timestamp not null,
	media blob,
	author_id int not null,
	foreign key (author_id) references users(id)
);

create table comments(
	id int primary key auto_increment not null,
	created_at timestamp not null,
	body text not null,
	media blob,
	author_id int not null,
	thread_id int not null,
	parent_id int,
	foreign key (author_id) references users(id),
	foreign key (thread_id) references threads(id),
	foreign key (parent_id) references comments(id)
);

create table activity(
	id int primary key auto_increment not null,
	name_activity varchar(50) not null,
	description text not null,
	cost_points int default 0,
	create_at timestamp not null,
	creator_id int not null,
	foreign key (creator_id) references users (id)
);

create table members_activity(
	joined_at timestamp not null,
	id_users int not null,
	id_activity int not null,
	foreign key (id_users) references users(id),
	foreign key (id_activity) references activity(id)
);