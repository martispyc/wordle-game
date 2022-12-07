#init flask app
from flask import Flask,send_from_directory, render_template, request, redirect, url_for
app = Flask(__name__, static_url_path='', 
            static_folder='static',
            template_folder='templates')

@app.route('/')
def hello_world():
    return render_template('aaa.html')

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)