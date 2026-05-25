from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

# =================== Configs ===================
API_VERSION = os.getenv("API_VERSION") or "1.0.0"
PORT = os.getenv("PORT") or 5000
DEBUG = os.getenv("DEBUG") or False

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
  # send_email(first_name, last_name, email, service_needed, budget, project_description)
  

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
 