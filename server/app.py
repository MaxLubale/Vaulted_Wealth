from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User, Account, Transaction, Admin
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bank.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)



@app.route('/')
def home():
    return '<h1>Welcome to the Bank App API</h1>'


# Add route to get user by ID
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.get_user_by_id(user_id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# Add route to get admin by ID
@app.route('/admin/<int:admin_id>', methods=['GET'])
def get_admin(admin_id):
    admin = Admin.get_admin_by_id(admin_id)
    if admin:
        return jsonify(admin.serialize()), 200
    else:
        return jsonify({'message': 'Admin not found'}), 404

# User Registration
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']

    try:
        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        new_account = Account(user_id=new_user.id)
        db.session.add(new_account)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 400

# User Login
@app.route('/login', methods=['POST'])
def login_user():
    data = request.json
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Admin Registration
@app.route('/admin/register', methods=['POST'])
def register_admin():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']

    try:
        hashed_password = generate_password_hash(password, method='sha256')
        new_admin = Admin(username=username, email=email, password=hashed_password)
        db.session.add(new_admin)
        db.session.commit()

        return jsonify({'message': 'Admin registered successfully'}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists'}), 400

# Admin Login
@app.route('/admin/login', methods=['POST'])
def login_admin():
    data = request.json
    username = data['username']
    password = data['password']

    admin = Admin.query.filter_by(username=username).first()

    if admin and check_password_hash(admin.password, password):
        return jsonify({'message': 'Admin login successful'}), 200
    else:
        return jsonify({'message': 'Invalid admin credentials'}), 401

# Transaction
@app.route('/transaction', methods=['POST'])
def make_transaction():
    data = request.json
    username = data['username']
    description = data['description']
    amount = data['amount']

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    account = user.accounts[0]  # Assuming a user has one account for simplicity

    if description == 'deposit':
        account.balance += amount
    elif description == 'withdraw':
        if amount > account.balance:
            return jsonify({'message': 'Insufficient funds'}), 400
        account.balance -= amount
    else:
        return jsonify({'message': 'Invalid transaction type'}), 400

    new_transaction = Transaction(account_id=account.id, description=description, amount=amount)
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({'message': 'Transaction successful'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
