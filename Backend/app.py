from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_mail import Mail, Message
from utils import email_template, google_sheet
import os

app = Flask(__name__)
load_dotenv()

# =================== Configs ===================
API_VERSION = os.getenv("API_VERSION") or "1.0.0"
PORT = os.getenv("PORT") or 5000
DEBUG = os.getenv("DEBUG") or False

# =================== Email configs ===================
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)

# =================== Health check route ===================
@app.route('/')
def index():
  return jsonify({
    "status": "success",
    "message": "Welcome to the Silver Pixel Soft API",
    "version": API_VERSION,
    "data": None
  }), 200

# =================== Contact route ===================
@app.route('/contact', methods=['POST'])
def contact():
  # =================== Get the data from the form ===================
  first_name = request.form.get('first_name')
  last_name = request.form.get('last_name')
  email = request.form.get('email')
  service_needed = request.form.get('service_needed')
  budget = request.form.get('budget')
  project_description = request.form.get('project_description')

  # =================== Validate the data ===================
  if not all([first_name, last_name, email, service_needed, budget]):
    return jsonify({
      "status": "error",
      "message": "All fields are required",
      "version": API_VERSION,
      "data": None
    }), 400

  # =================== Send the data to the email ===================
  try:
    # ================ Requesting the HTML template =================
    template = email_template.email_template(first_name, last_name, email, service_needed, budget, project_description)

    # ================ Sending the email =================
    msg = Message(
      f"Contect from Silver Pixel Soft: {first_name} {last_name}",
      recipients=[os.getenv("RECIPITENT_USERNAME")],
      html = template
    )
    mail.send(msg)
  except Exception as e:
    return jsonify({
      "status": "error",
      "message": "Failed to send email",
      "version": API_VERSION,
      "data": None
    }), 500
  
  # =================== Insert the data to the google sheet ===================
  try:
    google_sheet.insert_row([first_name + " " + last_name, email, service_needed, budget, project_description])
  except Exception as e:
    return jsonify({
      "status": "error",
      "message": "Failed to insert data to the google sheet",
      "version": API_VERSION,
      "data": None
    }), 500

  return jsonify({
    "status": "success",
    "message": "Contact form submitted successfully",
    "version": API_VERSION,
    "data": {
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "service_needed": service_needed,
      "budget": budget,
      "project_description": None if not project_description else project_description
    }
  }), 200

# =================== Run the app ===================
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=PORT, debug=DEBUG)
