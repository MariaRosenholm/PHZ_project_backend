# PHZ questionnaire project backend

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

- tests/ for tests
- src/storage/ creating the database

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

The database creation tools are in the dbtools folder.

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

## 7. Problems

### 7.1. Environments

### 7.2. Coding

### 7.3. Dependencies

Add here TODO and blockers that you have found related to upgrading to newer versions.
List the library/framework/service, version, and then the error message.
