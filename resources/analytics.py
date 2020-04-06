from models.portfolio import PortfolioModel
from finance.analytics import create_full_tear_sheet
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity


class Analytics(Resource):
    # TODO: add analysis period
    @jwt_required
    def get(self, portfolio_name):
        portfolio = PortfolioModel.find_by_name(portfolio_name, get_jwt_identity())
        if portfolio:
            return create_full_tear_sheet(portfolio), 200
        else:
            return {"message": "Portfolio by the name {} was not found".format(portfolio_name)}, 404


