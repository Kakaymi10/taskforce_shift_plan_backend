# TaskForce
# Shift Plan - Employee Management System

# Node.js Backend with Docker

This repository contains a Node.js backend project built with Express.js, ESLint, Tests, Husky for pre-commit checks, and a connected Postgres database. The server operates on port 3000.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
5. [Contributing](#contributing)
6. [License](#license)

## 1. Introduction
Shift Plan is an employee management web application designed to help companies efficiently manage employee shifts, working hours, departments, and absences. The system supports multiple companies, each with its own dedicated dashboard.


## 2. Prerequisites
Install:
- Node.js and npm (https://nodejs.org/)
- Docker (https://www.docker.com/)

## 3. Getting Started


3.1 Clone the repository to your local machine:

```bash
   git clone https://github.com/Kakaymi10/taskforce_shift_plan_backend.git
   cd backend-repo
```

3.2 Running the Application

Install Node.js dependencies:

```bash
npm install
```
Build the Docker container:

```bash
docker build -t my-node-app .
```
   
Start the Docker container:

```bash
docker run -p 3000:3000 my-node-app
```
    
Access the backend at http://localhost:3000.

## 4. Project Structure 
The project directory structure is organized as follows:

```bash
backend/
  ├── config/
  ├── models/
  ├── migrations/
  ├── tests/
  ├── src/
  │   ├── controllers/
  │   ├── middlewares/
  │   ├── routes/
  │   └── utils/
  ├── index.js
  ├── Dockerfile
  ├── package.json
  ├── .eslintrc.json
  └── .huskyrc
```
Here is a breakdown of the key directories and files:

```bash
config/: Configuration files for the project.
models/: Database models and schema definitions.
migrations/: Database migration scripts.
tests/: Test scripts and test-related files.
src/: Source code for the application.
index.js: Entry point for the Node.js application.
package.json: Project configuration and dependencies.
.eslintrc.json: ESLint configuration.
.huskyrc: Configuration for Husky pre-commit hooks.
Dockerfile: Configuration for building a Docker image.
```
## 5. Contibuting
    It provides guidelines for users who want to contribute to the project. Explains the process for making contributions, such as forking the repository, creating branches, making changes, and submitting pull requests.

```bash
To contribute to this project, follow these steps:

Create a new branch for your changes:


git checkout -b feature/your-feature-name
Make changes and commit with clear messages:


git commit -m "Add feature: your-feature-name"
Push changes to the repository:


git push origin feature/your-feature-name
Submit a pull request against the main branch.

```
OR

```bash
Fork the repo on GitHub.
Create a new branch for your changes.
Make changes and commit with clear messages.
Push changes to your fork.
Submit a pull request to the main branch.
```
## 6. License
