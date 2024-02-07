from app import  db,app
from models import User, Account, Transaction, Admin



def seed_users():
    users_data = [
        {"first_name": "John", "last_name": "Doe", "username": "user1", "email": "user1@example.com", "password": "password1"},
        {"first_name": "Jane", "last_name": "Smith", "username": "user2", "email": "user2@example.com", "password": "password2"},
        {"first_name": "Bob", "last_name": "Johnson", "username": "user3", "email": "user3@example.com", "password": "password3"}
    ]

    for user_data in users_data:
        existing_user = User.query.filter_by(username=user_data['username']).first()
        if not existing_user:
            user = User(**user_data)
            db.session.add(user)
            db.session.commit()

def seed_accounts():
    users = User.query.all()
    for user in users:
        existing_account = Account.query.filter_by(user_id=user.id).first()
        if not existing_account:
            account = Account(user=user)
            db.session.add(account)
            db.session.commit()

def seed_transactions():
    users = User.query.all()
    for user in users:
        account = user.accounts[0] if user.accounts else None
        if account:
            transaction_data = {
                "account_id": account.id,
                "description": "Initial deposit",
                "amount": 1000.00  
            }
            transaction = Transaction(**transaction_data)
            db.session.add(transaction)
            db.session.commit()
def seed_admins():
    admins_data = [
        {"first_name": "Admin", "last_name": "One", "username": "admin1", "email": "admin1@example.com", "password": "adminpassword1", "user_username": "user1"},
    ]

    for admin_data in admins_data:
        user_username = admin_data.pop("user_username")
        user = User.query.filter_by(username=user_username).first()

        if user:
            admin_data["user"] = user
            admin = Admin(**admin_data)
            db.session.add(admin)
            db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_users()
        seed_admins()
        seed_transactions()

    print("Seed data added successfully.")
