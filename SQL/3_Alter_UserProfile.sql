ALTER TABLE UserProfile
DROP COLUMN LastName;

ALTER TABLE UserProfile
DROP COLUMN FirstName;

ALTER TABLE UserProfile
ADD FullName varchar (300);