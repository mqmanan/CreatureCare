ALTER TABLE Creature
ALTER COLUMN Birthdate NVARCHAR (255);

ALTER TABLE Creature
ALTER COLUMN Birthdate VARCHAR NOT NULL;

UPDATE Creature
SET Birthdate = '2018-05-10'
WHERE Creature.Id = 1

UPDATE Creature
SET Birthdate = '2020-07-14'
WHERE Creature.Id = 2

UPDATE Creature
SET Birthdate = '2015-03-11'
WHERE Creature.Id = 3

UPDATE Creature
SET Birthdate = '2021-10-01'
WHERE Creature.Id = 4

UPDATE Creature
SET Birthdate = '2019-04-21'
WHERE Creature.Id = 5

UPDATE Creature
SET Birthdate = '2021-08-17'
WHERE Creature.Id = 11