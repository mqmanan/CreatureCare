# CreatureCare

CreatureCare is a full-stack web application that organizations can use to manage & organize their files, appointments, & clients. This application will be focusing on a pet clinic as its subject.

## Stack

### Front End

- [React.js](https://reactjs.org/)
- [React Router](https://reactrouter.com/en/main)
- [Material UI](https://mui.com/)
- [LottieFiles](https://lottiefiles.com/)

### Back End

- [C# .NET](https://dotnet.microsoft.com/en-us/languages/csharp)
- [ASP.NET Web API](https://dotnet.microsoft.com/en-us/apps/aspnet/apis)
- [Microsoft SQL Server](https://learn.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server?view=sql-server-ver16)
- [Google Firebase (Authentication)](https://console.firebase.google.com/)
  
## API

![ERD](https://www.dropbox.com/s/0mtbl2nhd36qcgr/CreatureCare.png?dl=0)
This is a visual representation of the Database.  

# Installation

### Step 1
Clone the repository from command line  

### Step 2
Change to the **`client`** directory, and type `npm install`  

### Step 3
Run all of the sql scripts **IN ORDER**  

### Step 4
Open the `.sln` file in Visual Studio and run the **`CreatureCare`** profile  

### Step 5
Back in the **`client`** directory, type `npm start`

## How does it work?

### Users

When the user first enters the website, they are prompted to Register or Login.

Once logged in, the user sees a welcome screen that displays their username & the functionalities of the applicaiton (including stretch goals). 

For now, the main functionalities for the user is the `Add Patient` & `Schedule Appointment` features. The user is able to add a pet & schedule an appointment (but only for their pets). 

To view the list of pets they added, a user can see their profile at `Profile` which will also show them a list of their pets. (Future stretch goals includes an appointment list for each pet here.)


### Admins

Along with being able to `Add Patient` & `Schedule Appointment`, Admins are able to see a list of all patients and appointments from every user. They are also able to `Edit Patient`, `Delete Patient`, & `Add Patient` -- for any user. (Future stretch goals includes an Edit & Delete functions for appointments.)

Currently, there is a search function under `Appointment Tracker` that is being worked on. (Futre stretch goals includes implementing a similar search bar or a filters select menu under `Patient Records`.) 
