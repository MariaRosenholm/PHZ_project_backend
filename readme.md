# PHZ survey project backend

## 1. Project Description

Business College Helsinki school project with PHZ Full Stack. Embeddable surveys' backend with NodeJS, Express and mariadb/mysql.

### 1.1. Business Vision

To make simple backend for storing survey data.

### 1.2. Task Management

- Jira
- Slack
- Teams
- GitHub

### 1.3. Personas

- Mahalete Haile @Mahalete
- Rakhi Chirayil Chandran @rakhicc
- Trang Nguyen @nguyenminhtrang2206
- Maria Rosenholm @MariaRosenholm

### 1.4. Use Cases

Store data collected from the survey and provide the data for the dashboard where the NPS Score results are shown.

## 2. Architecture

### 2.1. Technologies

Coding languages/frameworks/databases/testing

- NodeJS
- Express
- mariadb/mysql
- Jest

Production (not in production right now)

- Google Cloud --> use the googleCloudDeployed branch

- Others ---> You can choose if you wish to use main or googleCloudDeployed for production. In the googleCloudDeployed the connection to mariadb/mysql is made using createPool and socketPath. In main the connection is made using createConnection.

### 2.2. Directory structure

- `__test__`/ for tests
- src/storage/createDatabase for creating the database

## 3. Development Environment

### 3.1. Prerequisites

Environmental variables should have fields named as follows:

- DB_host="your host"
- DB_port=3306
- DB_user="user for the mysql/maridb database"
- DB_password="password for the above user"
- DB_database="database name"
- DB_admin="mariadb/mysql root user name"
- DB_adminpassword="mariadb/mysql root user password

### 3.2. Start the Application

After pulling the newest code from Git.

- npm install
- make sure you have .env file with correct information in the root
- npm start

### 3.3. Run Tests

- npm test

### 3.4. Databases and Migrations

The database creation tools are in the src/storage/createDatabase.

- `node createdatabase.js` to create new database with the information you have given in the enviromental variables

## 5. Deployment

### 5.1. Prerequisites

To deploy you need to have:

- npm
- node
- mysql/mariadb

Environmental variables should have fields named as follows:

- DB_host="your host"
- DB_port=3306
- DB_user="user for the mysql/maridb database"
- DB_password="password for the above user"
- DB_database="database name"
- DB_admin="mariadb/mysql root user name"
- DB_adminpassword="mariadb/mysql root user password

1. Open mysql/mariadb and
2. Go to src/storage/createDatabase folder
3. Run command node createdatabase.js
4. Run command npm start

#### 5.1.1. Google Cloud

1. First create SQL database
2. And create user for the database
3. Use Cloud Shell to clone the backend repo from github and clone the branch googleCloudDeployed
4. Instead of .env file you need app.standard.yaml file (standard or some other tier depending on your App Engine tier level)
5. app.standard.yaml should have:

   ```yaml
   runtime: nodejs14

   env_variables:
     DB_USER: user name that you created in SQL just before
     DB_PASS: password you gave to that user in SQl just before
     DB_NAME: database name that you just created in SQL before
     INSTANCE_CONNECTION_NAME: SQL instance connection name
   ```

   Instance connection name can be found in the SQL dashboard --> Overview --> Connect to this instance --> Connection name

6. Run the backend in the App Engine
