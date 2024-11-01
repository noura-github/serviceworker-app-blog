from flask import Flask, jsonify, render_template, send_from_directory, request

app = Flask(__name__)


employees_data = [
    {'first_name': 'Jack', 'last_name': 'Sparrow', 'email': 'jack@gmail.com'},
    {'first_name': 'Mary', 'last_name': 'Cruze', 'email': 'mary@gmail.com'},
    {'first_name': 'Hony', 'last_name': 'Moon', 'email': 'hony@gmail.com'},
    {'first_name': 'Tanya', 'last_name': 'Crood', 'email': 'tanya@yahoo.com'},
]


# Route for Home Page
@app.route('/')
def index():
    # Render the index.html file
    return render_template('index.html')


# Route for About Page
@app.route('/about')
def about():
    return render_template('about.html')


# Route for Contact Page
@app.route('/employee')
def employee():
    return render_template('employee.html', employees_data=employees_data)


# Serve the service worker with the 'Service-Worker-Allowed' header
@app.route('/sw.js')
def service_worker():
    response = send_from_directory('static/js', 'sw.js')
    response.headers['Service-Worker-Allowed'] = '/'
    return response


if __name__ == '__main__':
    app.run(debug=True)
