from app import app
from db import db

db.init_app(app)

@app.before_first_request
def create_tables():
    # create all the tables unless they exist
    # when we import for instance Store, it goes to Store resource then Store Model and
    # then sees the defintion of the db. If we don't import it won't create the table
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)  # important to mention debug=True
