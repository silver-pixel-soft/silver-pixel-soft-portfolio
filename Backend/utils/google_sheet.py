import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
from dotenv import load_dotenv
load_dotenv()


def get_sheet():
  scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive"
  ]

  creds = ServiceAccountCredentials.from_json_keyfile_name(
    "config/creadential.json", scope
  )

  client = gspread.authorize(creds)
  sheet = client.open_by_key(os.environ.get('SHEET_ID')).sheet1
  return sheet

def get_all_records():
  sheet = get_sheet()
  return sheet.get_all_records()

def insert_row(data):
  sheet = get_sheet()
  sheet.append_row(data)