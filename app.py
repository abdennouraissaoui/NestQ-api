import os
from flask import Flask, render_template
from flask_restful import Api
from flask_jwt_extended import JWTManager
from blacklist import BLACKLIST

from resources.user import (
    UserRegister,
    UserPortfolios,
    UserLogin,
    TokenRefresh,
    UserLogout)
from resources.portfolio import Portfolio, PortfolioConstructionOptions
from resources.analytics import Analytics
# from resources.analytics import Analytics

app = Flask(__name__,static_folder="build/static", template_folder="build")
@app.route("/")
def react_app():
    return render_template('index.html')


app.config['PROPAGATE_EXCEPTIONS'] = True  # To allow flask propagating exception even if debug is set to false on app
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///data.db')
app.config['JWT_BLACKLIST_ENABLED'] = True
app.secret_key = 'icecream'
api = Api(app)

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

