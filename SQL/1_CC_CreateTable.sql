USE [master]

IF db_id('CreatureCare') IS NULl
  CREATE DATABASE [CreatureCare]
GO

USE [CreatureCare]
GO

DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Specialty];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Creature];
DROP TABLE IF EXISTS [Appointment];
DROP TABLE IF EXISTS [Report];
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) UNIQUE NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [Address] nvarchar(255) NOT NULL,
  [Telephone] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255),
  [DateCreated] datetime NOT NULL,
  [UserTypeId] int NOT NULL,
  [SpecialtyId] int
)
GO

CREATE TABLE [Creature] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Type] nvarchar(255) NOT NULL,
  [Origin] nvarchar(255) NOT NULL,
  [Gender] nvarchar(255) NOT NULL,
  [Birthdate] datetime NOT NULL,
  [UserProfileId] int NOT NULL,
  [ImageLocation] nvarchar(255),
  [Description] varchar(800),
  [isActive] bit NOT NULL DEFAULT (1)
)
GO

CREATE TABLE [Appointment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserProfileDocId] int NOT NULL,
  [CreatureId] int NOT NULL,
  [DateRequested] datetime NOT NULL,
  [AmountDue] decimal,
  [DateDue] datetime,
  [PaidAmount] decimal,
  [InvoiceSentOnDate] datetime
)
GO

CREATE TABLE [Report] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [AppointmentId] int NOT NULL,
  [DateCreated] datetime NOT NULL,
  [Content] nvarchar(255)
)
GO

CREATE TABLE [Specialty] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Report] ADD FOREIGN KEY ([AppointmentId]) REFERENCES [Appointment] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Appointment] ADD FOREIGN KEY ([UserProfileDocId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Appointment] ADD FOREIGN KEY ([CreatureId]) REFERENCES [Creature] ([Id])
GO

ALTER TABLE [Creature] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([SpecialtyId]) REFERENCES [Specialty] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO
