from flask import Flask, request, jsonify
from models import db, User, Account, Transaction, Admin
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bank.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

# Route to get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'username': user.username} for user in users]
    return jsonify({'users': user_list})

# Route to get all admins
@app.route('/admins', methods=['GET'])
def get_all_admins():
    admins = Admin.query.all()
    admin_list = [{'id': admin.id, 'username': admin.username} for admin in admins]
    return jsonify({'admins': admin_list})

# Route to get user by ID
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        user_data = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email
        }
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# Route to get admin by ID
@app.route('/admin/<int:admin_id>', methods=['GET'])
def get_admin_by_id(admin_id):
    admin = Admin.query.get(admin_id)
    if admin:
        admin_data = {
            'id': admin.id,
            'first_name': admin.first_name,
            'last_name': admin.last_name,
            'username': admin.username,
            'email': admin.email
        }
        return jsonify(admin_data), 200
    else:
        return jsonify({'message': 'Admin not found'}), 404

# Route to update user username
@app.route('/update_username/<int:user_id>', methods=['PUT'])
def update_username(user_id):
    user = User.query.get(user_id)

    if user:
        new_username = request.json.get('new_username')

        if new_username:
            user.username = new_username
            db.session.commit()
            return jsonify({'message': 'Username updated successfully'}), 200
        else:
            return jsonify({'error': 'New username is missing or empty'}), 400
    else:
        return jsonify({'error': 'User not found'}), 404

# Route to delete a user's transaction
@app.route('/delete_transaction/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)

    if transaction:
        user = User.query.filter_by(id=transaction.account.user_id).first()

        db.session.delete(transaction)
        db.session.commit()

        return jsonify({'message': 'Transaction deleted successfully'}), 200
    else:
        return jsonify({'error': 'Transaction not found'}), 404

# Route to register a new user
@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data['username']
    password = data['password']
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_user = User(username=username, password=generate_password_hash(password), first_name=first_name, last_name=last_name, email=email)
    db.session.add(new_user)
    db.session.commit()

    new_account = Account(user_id=new_user.id)
    db.session.add(new_account)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/admin/signup', methods=['POST'])
def admin_signup():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    

    if not username or not password or not email or not first_name or not last_name:
        return jsonify({'message': 'All fields (username, password, email, first_name, last_name) are required'}), 400

    # Check if the username and email are already taken
    existing_admin_username = Admin.query.filter_by(username=username).first()
    existing_admin_email = Admin.query.filter_by(email=email).first()

    if existing_admin_username:
        return jsonify({'message': 'Username is already taken'}), 400

    if existing_admin_email:
        return jsonify({'message': 'Email is already registered'}), 400

    # Create a new admin
    new_admin = Admin(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    db.session.add(new_admin)
    db.session.commit()

    return jsonify({'message': 'Admin registered successfully'}), 201


# Route to login a user
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
    
# Route to login an admin

@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Replace this with your actual authentication logic
    admin = Admin.query.filter_by(username=username, password=password).first()

    if admin:
        login_user(admin)
        return jsonify({'message': 'Admin login successful'}), 200
    else:
        return jsonify({'message': 'Invalid admin credentials'}), 401

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
