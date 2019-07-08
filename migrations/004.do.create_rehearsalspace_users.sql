CREATE TABLE rehearsalspace_users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password TEXT,
    date_created TIMESTAMP DEFAULT now
() NOT NULL
);