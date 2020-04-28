from db import db
from datetime import datetime
from copy import deepcopy

class PortfolioModel(db.Model):
    __tablename__ = "portfolios"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    date_created = db.Column(db.DateTime)
    date_modified = db.Column(db.DateTime)
    settings = db.Column(db.JSON)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('UserModel')

    def __init__(self, name, user_id, settings):
        self.user_id = user_id
        self.name = name
        self.settings = settings
        self.date_created = datetime.now()
        self.date_modified = datetime.now()

    def json(self):
        port_settings = deepcopy(self.settings)
        port_settings["holdings"] = {ticker: round(weight * 100, 2)
                                     for (ticker, weight) in port_settings["holdings"].items()}
        return {'name': self.name,
                'settings': port_settings,
                'date_created': self.date_created.isoformat(),
                'date_modified': self.date_modified.isoformat()
                }

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_name(cls, name, user_id):
        return cls.query.filter_by(name=name, user_id=user_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
