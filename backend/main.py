from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS  # Important for frontend communication
from openai import OpenAI
import os

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
CORS(app, 
     origins=["http://localhost:5173", "http://127.0.0.1:5173"],
     supports_credentials=True,
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type"])

# Initialize OpenAI client for Ollama
openai = OpenAI(base_url='http://localhost:11434/v1', api_key='ollama')
MODEL = 'llama3.2'  

system_prompt = """
You are a helpful assistant that can answer geography questions.
"""

@app.route('/')
def index():
    """Serve the frontend HTML page"""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files from the frontend dist folder"""
    return send_from_directory(app.static_folder, path)

@app.before_request
def handle_options():
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        return response

@app.route('/api/chat', methods=['POST'])
def chat():
    """API endpoint to handle chat messages"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Get response from Ollama
        response = openai.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        )
        
        ai_response = response.choices[0].message.content
        
        return jsonify({
            'response': ai_response,
            'model': MODEL
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')



