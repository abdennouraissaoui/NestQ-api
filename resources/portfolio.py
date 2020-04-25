from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.portfolio import PortfolioModel
from finance.optimizer import available_optimizers
# from finance.analytics import create_portfolio_tearsheet, cache
import traceback


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
        opt_start = ""
        opt_end = ""
        # get the weights
        # TODO: Handle cases where the allocation type is not supported
        if data['allocation'] in ["Manual", "Equal Allocation"]:
            data["holdings"] = available_optimizers[data['allocation']](data["holdings"])
        else:
            parser.add_argument('optimizationStartDate', required=True, help="This field cannot be left blank!")
            parser.add_argument('optimizationEndDate', required=True, help="This field cannot be left blank!")
            data = parser.parse_args()
            opt_start = data['optimizationStartDate'][:10]
            opt_end = data['optimizationEndDate'][:10]

        if data['allocation'] in ["Hierarchical Risk Parity", "Minimum Volatility", "Maximum Sharpe Ratio"]:
            data["holdings"] = available_optimizers[data['allocation']](list(data['holdings'].keys()),
                                                                        opt_start,
                                                                        opt_end)

        elif data['allocation'] == "Efficient Volatility":
            parser.add_argument('targetVolatility', required=True, help="This field cannot be left blank!")
            data = parser.parse_args()
            data['holdings'] = available_optimizers[data['allocation']](list(data['holdings'].keys()),
                                                                        float(data["targetVolatility"]) / 100,
                                                                        opt_start,
                                                                        opt_end)

        elif data['allocation'] == "Efficient Return":
            parser.add_argument('targetReturn', required=True, help="This field cannot be left blank!")
            data = parser.parse_args()
            data['holdings'] = available_optimizers[data['allocation']](list(data['holdings'].keys()),
                                                                        float(data["targetReturn"]) / 100,
                                                                        opt_start,
                                                                        opt_end)
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
        try:
            data = self.get_data()
            portfolio = self.create_portfolio(name, data)
        except:
            traceback.print_exc()
            return {"message": "An error occured when inserting a portfolio"}, 500
        return portfolio.json(), 201

    @jwt_required
    def put(self, name):
        portfolio = PortfolioModel.find_by_name(name, get_jwt_identity())
        if portfolio:
            # cache.delete_memoized(create_portfolio_tearsheet)
            try:
                data = self.get_data(additional_reqs={"name": str})
                original_create_date = portfolio.date_created
                portfolio.delete_from_db()
                portfolio = self.create_portfolio(data['name'], data)
                portfolio.date_created = original_create_date

            except:
                traceback.print_exc()

                return {"message": "An error occurred when updating the portfolio"}, 500
        else:
            try:
                data = self.get_data()
                portfolio = self.create_portfolio(name, data)
            except:
                traceback.print_exc()
                return {"message": "An error occurred creating the portfolio"}, 500

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

