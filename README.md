# Lotus Query
Lotus Query is a group project started in July of 2024 for the senior elective class TCSS 445: Database Systems Design at University of Washington Tacoma. The objective of this project was to implement a working Magic the Gathering database and searching application using React and MySQL.

## Members
Lotus query's founding members are:
 - Jeremiah Brenio
 - Abraham Engebretson
 - Conner Webber

## Installation
Before anything on this project can be run, it is necessary to first initialize and run the MySQL Database. You should first follow the steps on the [MySQL website](https://www.mysql.com/) to install MySQL server. After that is installed, download the latest Lotus Query table initialization code at it's [designated repo](https://github.com/westerntoad/lotus-query-code-gen)'s release tab.

Once this is downloaded, you have a few options. The first option is to download a MySQL GUI for the following steps, or by running it through the command line with MySQL Server. Because different MySQL GUIs vary from one another, these steps will be shown using the command prompt and MySQL Server.

All following code has been tested on MySQL Server version `8.0.37-0ubuntu0.22.04.3`, and has not been tested on other distributions. First, open a Bash command prompt in the folder where you downloaded the initialization MySQL script. For the purposes of this demonstration, I will assume it is called `lite-v1_0.sql`, but any name works. Then, log in to MySQL server using your username and password. If you need help with this step, please look at the [MySQL Documentation](https://dev.mysql.com/doc/refman/8.4/en/connecting.html). 

After you are logged into MySQL server, run the following command to create the database:

```bash
CREATE DATABASE lotus_query;
```

and then use it:

```bash
USE lotus_query
```

Finally we can source the table initialization code to create all necessary tables and import the tuples:

```bash
SOURCE lite-v1_0.sql
```

Depending on which release version you chose and your machine's hardware, this operation can take upwards of 30 minutes; but, once it's done, it should not need to be done again.

The next step to installing and running this application is cloning the remote Git repository to your machine. First navigate to the folder in which you want the repository downloaded to in a command prompt and run:

```bash
git clone https://github.com/cnlwebber/Lotus-Query.git
```

Afterwards, navigate to the repository's backend folder:

```bash
cd ./Lotus-Query/backend
```

Next, you need to generate a token unique token used by our backend, and include it in a `.env` file. In order to generate it, run the code:

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));" >> ./.env
```

Then, open that `.env` file in the following fashion:

```env
DB_HOST=localhost
DB_USER=your_username_here
DB_PASS=your_password_here
DB_NAME=lotus_query
JWT_SECRET=your_token_here
PORT=5000
```

With `your_username_here`, `your_password_here`, and `your_token_here` replaced with your mysql username, password, and generated token respectively.

After saving and closing that file, still in the backend folder, initialize the backend code with:

```bash
node server.js
```

The final step to run the project is to navigate once again to the project's repository in a secondary bash command prompt, cd into the frontend, and start the application:

```bash
cd ./frontend
npm start
```

A new tab in your browser should now open, and you can use the application!
