from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.portfolio import PortfolioModel
from finance.optimizer import available_optimizers


def get_weights(tickers, method, start=None, end=None):
    if method in available_optimizers.keys():
        return available_optimizers[method](tickers, start, end)


class Portfolio(Resource):
    @classmethod
    def get_data(cls, additional_reqs={}):
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('holdings', type=dict, required=True, help="This field cannot be left blank!")
        parser.add_argument('allocation', type=str, required=True, help="This field cannot be left blank!")
        parser.add_argument('rebalancingFrequency', type=str, required=True, help="This field cannot be left blank!")

        for requirement, type in additional_reqs.items():
            parser.add_argument(requirement, type=type, required=True, help="This field cannot be left blank!")
        data = parser.parse_args()

        # get the weights
        # TODO: Handle cases where the allocation type is not supported
        if data['allocation'] != "Manual":
            parser.add_argument('optimizationStartDate', required=True, help="This field cannot be left blank!")
            parser.add_argument('optimizationEndDate', required=True, help="This field cannot be left blank!")
            data = parser.parse_args()
            data['optimizationStartDate'] = data['optimizationStartDate'][:10]
            data['optimizationEndDate'] = data['optimizationEndDate'][:10]
            data['holdings'] = get_weights(list(data['holdings'].keys()),
                                           data['allocation'],
                                           data['optimizationStartDate'],
                                           data['optimizationEndDate'])
        else:
            data["holdings"] = {ticker: float(weight) / 100
                                for (ticker, weight) in data["holdings"].items()}
        return data

    @classmethod
    def create_portfolio(cls, name, data):
        portfolio = PortfolioModel(name, get_jwt_identity(), data)
        portfolio.save_to_db()
        return portfolio

    @jwt_required
    def get(self, name):
        portfolio = PortfolioModel.find_by_name(name, get_jwt_identity())
        if portfolio:
            return portfolio.json(), 200
        else:
            return {'message': "Could not fund a portfolio with name '{}'".format(name)}, 404

    @jwt_required
    def post(self, name):
        if PortfolioModel.find_by_name(name, get_jwt_identity()):
            return {'message': "A portfolio with name '{}' already exists.".format(name)}, 400
        data = self.get_data()
        try:
            portfolio = self.create_portfolio(name, data)
        except:
            return {"message": "An error occured when inserting a portfolio"}, 500
        return portfolio.json(), 201

    @jwt_required
    def put(self, name):
        portfolio = PortfolioModel.find_by_name(name, get_jwt_identity())
        if portfolio:
            data = self.get_data(additional_reqs={"name": str})
            try:
                original_create_date = portfolio.date_created
                portfolio.delete_from_db()
                portfolio = self.create_portfolio(data['name'], data)
                portfolio.date_created = original_create_date

            except:
                return {"Message": "An error occured updating the portfolio"}, 500
        else:
            data = self.get_data()
            try:
                portfolio = self.create_portfolio(name, data)
            except:
                return {"Message": "An error occured creating the portfolio"}, 500

        portfolio.save_to_db()
        return portfolio.json(), 200

    @jwt_required
    def delete(self, name):
        portfolio = PortfolioModel.find_by_name(name, get_jwt_identity())
        if portfolio:
            portfolio.delete_from_db()
        return {'message': 'Successfully deleted {}'.format(name)}, 200

class PortfolioConstructionOptions(Resource):
    @jwt_required
    def get(self):
        return {"optimizers": list(available_optimizers.keys()),
                "rebal_freqs": ["Monthly", "Annualy"]}

