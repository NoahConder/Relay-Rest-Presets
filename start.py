import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, render_template
from signalwire.rest import Client as signalwire_client
from pyngrok import ngrok
from flask_cors import CORS


# Load our .env for our credentials.
load_dotenv()


# SIGNALWIRE credentials.
projectID = os.getenv('SIGNALWIRE_PROJECT')
authToken = os.getenv('SIGNALWIRE_TOKEN')
spaceURL = os.getenv('SIGNALWIRE_SPACE')
sw_phone_number = os.getenv('PHONE_NUMBER')

# SIGNALWIRE variable
client = signalwire_client(projectID, authToken, signalwire_space_url=spaceURL)

# initializing Flask
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/laml', methods=['GET', 'POST'])
def laml():
    return render_template('laml.html')


@app.route('/new', methods=['GET', 'POST'])
def new():
    return render_template('new_laml.html')


@app.route('/presets', methods=['GET', 'POST'])
def presets():
    return render_template('presets.html')


@app.route('/presets_handle', methods=['GET', 'POST'])
def presets_handle():
    laml_box = request.args.get("laml_box_cox")
    name = request.args.get("name")
    url = "https://noah-space.signalwire.com/api/laml/2010-04-01/Accounts/s/LamlBins"

    payload = f"Name={name}&Contents={laml_box}"
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic MWY2ZmFhYTgtMDYxNC00NjMwLWE0NDktN2MwOGI2MDJmZjVlOlBUMmQ0NGQ2OGNiYzZiYTA4MGVlM2JkNjI5MDYzODhhODVjYTFlMmM4OGIxYjYyZjlj"
    }
    print(name)
    print(laml_box)
    response = requests.post(url, data=payload, headers=headers)

    print(response.text)
    # If the name is null, we error out.
    if name == "":
        output = "ERROR!!! Please enter a name for your bin!"
        return render_template('return_laml.html', output=output)

    # If the name is not null, we create the bin.
    else:
        output = "The bin was successfully created!"
        return render_template('return_laml.html', output=output)


def start_ngrok():
    # Set up a tunnel on port 5000 for our Flask object to interact locally
    url = ngrok.connect(5000).public_url
    print(' * Tunnel URL:', url)


if __name__ == '__main__':
    if os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        start_ngrok()
# What we use to boot up flask and run it in debug mode.
app.run(debug=True)
