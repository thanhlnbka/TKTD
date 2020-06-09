from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import json
import pysolr
import sys
sys.path.append("/home/luuthanh/Desktop/TKTD/backend")
from process_function import Query

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

#connect Solr
path = "http://localhost:8983/solr/TestConfig/"

# sanity check route

@app.route('/api', methods = ['POST'])
def get_results():
    str_a = request.data.decode("utf-8")
    dict = json.loads(str_a)
    print(dict)
    rq = Query(lan="vi",show_score= True ,start=0,rows=20,request_dict=dict,connect_solr=path)
    arr_results = rq.get_results()
    # print(arr_results)
    return jsonify(arr_results)

if __name__ == '__main__':
    app.run()

