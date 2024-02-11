from flask import Flask, request, jsonify
from models import db, User, Account, Transaction, Admin
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, login_required
from werkzeug.exceptions import BadRequest, InternalServerError



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bank.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

# Route to get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'username': user.username, 'first_name': user.first_name ,'last_name': user.last_name ,'email':user.email} for user in users]
    return jsonify({'users': user_list})

# Route to get all admins
@app.route('/admins', methods=['GET'])
def get_all_admins():
    admins = Admin.query.all()
    admin_list = [{'id': admin.id, 'username': admin.username, 'first_name': admin.first_name ,'last_name': admin.last_name ,'email':admin.email} for admin in admins]
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
        return jsonify({'user': user_data}), 200
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
    try:
        data = request.json

        # Check if all required fields are present
        required_fields = ['username', 'password', 'first_name', 'last_name', 'email']
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            raise BadRequest(description=f'Missing required fields: {", ".join(missing_fields)}')

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

        # Create a new account with the default name 'personal'
        new_account = Account(user_id=new_user.id)
        db.session.add(new_account)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201
    except BadRequest as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Error during registration: {str(e)}")
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500

# admin signup
@app.route('/admin/signup', methods=['POST'])
def register_admin():
    data = request.json
    username = data['username']
    password = data['password']
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']

    if Admin.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_admin = Admin(username=username, password=generate_password_hash(password), first_name=first_name, last_name=last_name, email=email)
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
        
        user_data = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email
        }
        return jsonify({'user': user_data, 'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

    
# Route to login an admin

@app.route('/admin/login', methods=['POST'])
def login_admin():
    data = request.json
    username = data['username']
    password = data['password']

    admin = Admin.query.filter_by(username=username).first()

    if admin and check_password_hash(admin.password, password): 
        return jsonify({'message': 'Admin login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401 


@app.route('/user/<int:user_id>/accounts', methods=['GET'])
def get_user_accounts(user_id):
    user = User.query.get_or_404(user_id)

    accounts_data = []
    for account in user.accounts:
        account_data = {
            'id': account.id,
            'created_date': account.created_date.strftime('%Y-%m-%d %H:%M:%S'),
            'balance': account.balance,
            'name': account.account_name,  # Update this line to use 'account_name'
            'transactions': [
                {
                    'id': transaction.id,
                    'amount': transaction.amount,
                    'transaction_date': transaction.transaction_date.strftime('%Y-%m-%d %H:%M:%S')
                }
                for transaction in account.transactions
            ]
        }
        accounts_data.append(account_data)

    return jsonify({'accounts': accounts_data}), 200
    

# create new account 
@app.route('/user/<int:user_id>/accounts', methods=['POST'])
def create_account(user_id):
    user = User.query.get_or_404(user_id)

    data = request.json
    account_name = data.get('accountName', '')  

    
    if account_name not in ['personal', 'business', 'other']:
        return jsonify({'error': 'Invalid account name'}), 400

    new_account = Account(user=user, name=account_name)  
    db.session.add(new_account)
    db.session.commit()

    return jsonify({'message': 'Account created successfully'}), 201





if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
