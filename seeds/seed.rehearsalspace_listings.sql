INSERT INTO rehearsalspace_listings
    (location, size, description)
VALUES
    ('Chicago', 2, 'lovely space in Uptown. Former storefront, now empty!'),
    ('Denver', 1, 'a room in the elementary school, open late just for performers.'),
    ('New York City', 1, ' a rinky-dink little space with the ability to host performers for music or a play. there are plenty of outlets.'),
    ('Chicago', 3, '3 room space just for perfomers to hone their craft. 3 rooms to test things out.');

ALTER TABLE rehearsalspace_listings
ADD COLUMN
    author INTEGER REFERENCES rehearsalspace_users
(id)
    ON
DELETE
SET NULL;

TRUNCATE rehearsalspace_listings, rehearsalspace_users RESTART IDENTITY CASCADE