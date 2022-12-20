#init flask app
from flask import Flask,send_from_directory, render_template, request, redirect, url_for
import json
app = Flask(__name__, static_url_path='', 
            static_folder='static',
            template_folder='templates')

@app.route('/')
def hello_world():
    return render_template('aaa.html')

@app.route('/api/saglabat', methods=['POST', 'GET'])
def saglabat():
    if request.method == 'POST':
        req = request.get_json()
        # print(req)
        with open('static/data.json', 'r') as f:
            data = json.load(f)
            data.append(req)

        with open('static/data.json', 'w') as f:
            json.dump(data, f)

        return req
    else:
        f = open("static/data.json", "r")
        listRes = json.load(f)
        f.close()
        return json.dumps(sorted(listRes, key=lambda vi: vi["punkti"], reverse=True))

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')