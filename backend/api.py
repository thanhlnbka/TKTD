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
    rq = Query(lan="vi",show_score= True ,start=0,rows=40,request_dict=dict,connect_solr=path)
    arr_results,time, hits = rq.get_results()
    time_str = "Khoảng {} kết quả. Truy vấn hết {} ms".format(hits,time)
    print(rq.get_results()[1])
    return jsonify(arr_results = arr_results, time = time_str )

if __name__ == '__main__':
    app.run()

