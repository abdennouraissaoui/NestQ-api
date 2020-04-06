from db import db


class UserModel(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80))
    password = db.Column(db.String(80))
    firstName = db.Column(db.String(80))
    lastName = db.Column(db.String(80))
    portfolios = db.relationship('PortfolioModel', lazy='dynamic')

    def __init__(self, email, password, firstName, lastName):
        self.email = email
        self.password = password
        self.firstName = firstName
        self.lastName = lastName

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json(self):
        return {'id': self.id,
                'email': self.email
                }

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def portfolios_json(self):
        return {'portfolios': [portfolio.json() for portfolio in self.portfolios.all()]}

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

