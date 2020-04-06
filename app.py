from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from blacklist import BLACKLIST

from db import db

from resources.user import (
    UserRegister,
    UserPortfolios,
    UserLogin,
    TokenRefresh,
    UserLogout)
from resources.portfolio import Portfolio, PortfolioConstructionOptions
from resources.analytics import Analytics
# from resources.analytics import Analytics

app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True  # To allow flask propagating exception even if debug is set to false on app
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.secret_key = 'icecream'
api = Api(app)


@app.before_first_request
def create_tables():
    # create all the tables unless they exist
    # when we import for instance Store, it goes to Store resource then Store Model and
    # then sees the defintion of the db. If we don't import it won't create the table
    db.create_all()


jwt = JWTManager(app)


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    return decrypted_token['jti'] in BLACKLIST


api.add_resource(UserRegister, '/api/register')
api.add_resource(Portfolio, '/api/portfolio/<string:name>')
api.add_resource(PortfolioConstructionOptions, "/api/portfolio-construction-options")
api.add_resource(UserPortfolios, '/api/user/portfolios')
api.add_resource(UserLogin, "/api/login")
api.add_resource(TokenRefresh, '/api/refresh')
api.add_resource(UserLogout, "/api/logout")
api.add_resource(Analytics, "/api/tearsheet/<string:portfolio_name>")
db.init_app(app)
if __name__ == '__main__':
    app.run(debug=True)  # important to mention debug=True
