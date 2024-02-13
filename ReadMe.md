# Bank Application README
## Overview
   - Welcome to the Bank Application! This web application serves as a banking platform with two main roles: Admin and User. The Admin has access to all user information, account details, and has the ability to manage users. Users can perform actions such as signing up, logging in, viewing their dashboard, managing accounts, and conducting transactions.

## Table of Contents
   1. Getting Started
   2. Admin Features
   3. User Features
   4. Usage
   5. Dependencies
   6. Contributing
   7. License
## Getting Started
1. Clone the Repository:
  - git clone [https://github.com/MaxLubale/Vaulted_Wealth.git]
  - cd bank-application

2. Install Dependencies:
  - npm install(in the client folder)
  - pipenv install

3. Start the Application:
  - python3 server/app.py
  - npm start

4. Access the Application:
  - Open your browser and navigate to http://localhost:3000.

## Admin Features
1. Sign Up: Admin can sign up for an account.
2. Log In: Admin can log in to access the admin dashboard.
3. View User Information: Admin can view details of all users, including their accounts and transactions.
4. Delete User: Admin can delete a user, including their accounts and transactions.

## User Features
1. Sign Up: Users can sign up for an account.
2. Log In: Users can log in to access their user dashboard.
3. View Dashboard: Users can view their details, accounts, and transactions.
4. Create Account: Users can create a new account.
5. Create Transaction: Users can perform transactions within their accounts.
6. Delete Account: Users can delete an existing account.
7. Update Account Name: Users can update the name of an existing account.

## Usage
- Admin:
    Sign up as an admin.
    Log in to the admin dashboard.
    Access user information, accounts, and transactions.
    Delete a user.

- User:
    Sign up as a user.
    Log in to the user dashboard.
    View personal details, accounts, and transactions.
    Create a new account.
    Perform transactions within accounts.
    Delete an existing account.
    Update the name of an account.

## Dependencies
    React
    React Router
    werkzeug
    SQLAlchemy
    flask

## Contributing
    Contributions are welcome! Feel free to submit issues or pull requests.

## License
    This project is licensed under the MIT License.