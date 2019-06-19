BEGIN;

    TRUNCATE
    rehearsalspace_listings,
    rehearsalspace_users
    RESTART IDENTITY CASCADE;

    INSERT INTO rehearsalspace_users
        (user_name, full_name, password)
    VALUES
        ('sarah.drew', 'Sarah Drew', '$2a$12$sUNarAt8/Bm6IA7Sygh5Se0ntTkzn.UIIZIid9heCxJ1vFMzs/.6.'),
        ('cheddar.cat', 'Cheddar Cat', '$2a$12$8Y.amvqjngk9Mj1Xg147me40JZJ73/WydXBi7dWfebwLLQAHCDFBO'),
        ('luckythedog', 'Lucky Dog', '$2a$12$9nU/okymV1Ox6U/AVR1ChO2x0u8pRCbqANqCwmN6MLZ6.U2B5AIm6')

    INSERT INTO rehearsalspace_listings
        (location, size, description)
    VALUES
        ('Chicago', 2, 'lovely space in Uptown. Former storefront, now empty!'),
        ('Denver', 1, 'a room in the elementary school, open late just for performers.'),
        ('New York City', 1, ' a rinky-dink little space with the ability to host performers for music or a play. there are plenty of outlets.'),
        ('Chicago', 3, '3 room space just for perfomers to hone their craft. 3 rooms to test things out.');

    COMMIT;
