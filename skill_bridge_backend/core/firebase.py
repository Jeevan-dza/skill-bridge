import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

load_dotenv()

# Initialize Firebase Admin SDK
def init_firebase():
    if not firebase_admin._apps:
        # Check standard credentials
        if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
            cred = credentials.ApplicationDefault()
        else:
            # Check explicit environment variables
            project_id = os.getenv("FIREBASE_ADMIN_PROJECT_ID")
            client_email = os.getenv("FIREBASE_ADMIN_CLIENT_EMAIL")
            private_key = os.getenv("FIREBASE_ADMIN_PRIVATE_KEY", "").replace('\\n', '\n')
            
            if project_id and client_email and private_key:
                cred = credentials.Certificate({
                    "type": "service_account",
                    "project_id": project_id,
                    "private_key_id": "mock_id",
                    "private_key": private_key,
                    "client_email": client_email,
                    "client_id": "mock_client_id",
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_x509_cert_url": f"https://www.googleapis.com/robot/v1/metadata/x509/{client_email.replace('@', '%40')}"
                })
            else:
                # Mock memory fallback for dev without creds
                print("WARNING: Starting Firebase Admin without real credentials. Mocking firestore.")
                return None

        firebase_admin.initialize_app(cred)
    
    return firestore.client()

db = init_firebase()

def get_db():
    return db
