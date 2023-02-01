USE [CreatureCare];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) 
VALUES (1, 'Doctor'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [Specialty] on
insert into [Specialty] ([Id], [Name])
values (1, 'Horses'), (2, 'Surgical'), (3, 'Alien Lifeforms'), (4, 'Mythical Creatures');
set identity_insert [Specialty] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (1, 'HKXuZjEc3yN3KifWuSKvIVgi7zq2', 'Doctor', 'Who', 'doctorwho@gmail.comx', '123 Universe Lane, Planet Earth, the Solar System', '222-222-2222', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', '2023-01-03', '1', '4');
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (2, '4Dnog5iB7jUEB9iUo8QEktK9HBJ2', 'Leonard', 'McCoy', 'startrek@gmail.comx', '345 Future Avenue, Planet Earth, the Solar System', '333-333-3333', 'https://robohash.org/nisiautemet.png?size=150x150&set=set1', '2022-09-05', '1', '3');
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (3, 'Fj45hkmL12atvtxynJiOVpK1Kn52', 'Christopher', 'Turk', 'scrubs@gmail.comx', '678 Vanity Street, Planet Earth, the Solar System', '444-444-4444', 'https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1', '2022-09-05', '1', '2');
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (4, '2kXP2YZAx7UjfS7n7nYvTOvExty1', 'Beth', 'Smith', 'rickandmorty@gmail.comx', '978 Highway Ave, Planet Earth, the Solar System', '555-555-5555', 'https://robohash.org/doloremfugiatrerum.png?size=150x150&set=set1', '2022-09-05', '1', '1');
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (5, 'sHhExjAFjrM6KGzRi0cX2qdV9oj2', 'Morty', 'Smith', 'mortyandrick@gmail.comx', '978 Highway Ave, Planet Earth, the Solar System', '555-555-5557', 'https://robohash.org/hicnihilipsa.png?size=150x150&set=set1', '2023-01-06', '2', NULL);
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (6, 'XpDtLvV0JzbgEuK91UvHRBxgtyy2', 'Luna', 'Lovegood', 'harrypotter@gmail.comx', '369 Quibbler Lane, Planet Earth, the Solar System', '223-445-5567', 'https://robohash.org/deseruntutipsum.png?size=150x150&set=set1', '2022-11-03', '2', NULL);
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (7, 'AVQB9cytwrR3qPSYpxRBRyuZ13K3', 'Cho', 'Chang', 'harrypotter4@gmail.comx', '666 Ravenclaw Way, Planet Earth, the Solar System', '888-888-8888', 'https://robohash.org/quiundedignissimos.png?size=150x150&set=set1', '2022-11-30', '2', NULL);
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (8, 'cJGBjUSOT0VHvDp8g0DFYn67DY92', 'Wednesday', 'Addams', 'addamsfamily@gmail.comx', '001 Cemetery Lane, Planet Earth, the Solar System', '666-666-6666', 'https://robohash.org/quidemearumtenetur.png?size=150x150&set=set1', '2023-01-07', '2', NULL);
insert into UserProfile (Id, FirebaseUserId, FirstName, LastName, Email, Address, Telephone, ImageLocation, DateCreated, UserTypeId, SpecialtyId) 
values (9, 'l5XpJb4suKRXQiGdyhVrjOZshSv2', 'Tim', 'Goodman', 'detectivepikachu@gmail.comx', '258 Pokemon Avenue, Planet Earth, the Solar System', '777-777-7777', 'https://robohash.org/blanditiismaioresest.png?size=150x150&set=set1', '2023-01-08', '2', NULL);
set identity_insert [UserProfile] off

set identity_insert [Creature] on
insert into Creature (Id, Name, Type, Origin, Gender, Birthdate, UserProfileId, ImageLocation, Description, isActive) 
values (1, 'Snuffles', 'Dog', 'Planet Earth', 'Male', '2019-09-19', '5', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', NULL, '1');
insert into Creature (Id, Name, Type, Origin, Gender, Birthdate, UserProfileId, ImageLocation, Description, isActive) 
values (2, 'Pepper', 'Niffler', 'Wizarding World', 'Female', '2018-07-11', '6', 'https://robohash.org/nisiautemet.png?size=150x150&set=set1', NULL, '1');
insert into Creature (Id, Name, Type, Origin, Gender, Birthdate, UserProfileId, ImageLocation, Description, isActive) 
values (3, 'Friday', 'Griffin', 'Wizarding World', 'Male', '2020-09-19', '7', 'https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1', NULL, '1');
insert into Creature (Id, Name, Type, Origin, Gender, Birthdate, UserProfileId, ImageLocation, Description, isActive) 
values (4, 'Nightmare', 'Cat: Maine Coon', 'Planet Earth', 'Male', '2021-10-01', '8', 'https://robohash.org/doloremfugiatrerum.png?size=150x150&set=set1', NULL, '1');
insert into Creature (Id, Name, Type, Origin, Gender, Birthdate, UserProfileId, ImageLocation, Description, isActive) 
values (5, 'Buddy', 'Pikachu', 'Pokemon Universe', 'Male', '2020-05-19', '9', 'https://robohash.org/hicnihilipsa.png?size=150x150&set=set1', NULL, '1');
set identity_insert [Creature] off

set identity_insert [Appointment] on
insert into Appointment (Id, UserProfileDocId, CreatureId, DateRequested, AmountDue, DateDue, PaidAmount, InvoiceSentOnDate) 
values (1, '4', '1', '2023-01-20', NULL, NULL, NULL, NULL);
insert into Appointment (Id, UserProfileDocId, CreatureId, DateRequested, AmountDue, DateDue, PaidAmount, InvoiceSentOnDate) 
values (2, '4', '1', '2023-02-20', NULL, NULL, NULL, NULL);
insert into Appointment (Id, UserProfileDocId, CreatureId, DateRequested, AmountDue, DateDue, PaidAmount, InvoiceSentOnDate) 
values (3, '3', '4', '2023-02-21', NULL, NULL, NULL, NULL);
set identity_insert [Appointment] off

set identity_insert [Report] on
insert into [Report] ([Id], [AppointmentId], [DateCreated], [Content])
values (1, '1', '2023-01-20', NULL);
set identity_insert [Report] off