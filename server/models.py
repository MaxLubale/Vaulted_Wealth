from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    accounts = db.relationship('Account', backref='user', lazy=True)

    @classmethod
    def get_user_by_id(cls, user_id):
        return cls.query.get(user_id)
    
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'joined_at': self.joined_at.strftime('%Y-%m-%d %H:%M:%S')
            
        }


class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='admin', lazy=True)

    @classmethod
    def get_admin_by_id(cls, admin_id):
        return cls.query.get(admin_id)
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'joined_at': self.joined_at.strftime('%Y-%m-%d %H:%M:%S')
            
        }

class Account(db.Model):
    __tablename__ = 'account'
    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime, default=datetime.utcnow)
    balance = db.Column(db.Float, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationship with Transaction
    transactions = db.relationship('Transaction', backref='account', lazy=True)

class Transaction(db.Model):
    __tablename__ = 'transaction'
    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# class Admin(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String(50))
#     last_name = db.Column(db.String(50))
#     username = db.Column(db.String(50), unique=True, nullable=False)
#     password = db.Column(db.String(50), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     joined_at = db.Column(db.DateTime, default=datetime.utcnow)

#     # Relationship with User
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     user = db.relationship('User', backref='admin', uselist=False)
