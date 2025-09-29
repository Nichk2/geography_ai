# imports
from dotenv import load_dotenv
from openai import OpenAI
import flask 
import ollama


 
load_dotenv()

openai = OpenAI(base_url='http://localhost:11434/v1', api_key='ollama')
MODEL = 'llama3.2'

system_prompt = """
You are a helpful assistant that can answer geography questions.
"""

while True:
    message_prompt = input("Enter your question: ")
    response = openai.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message_prompt}
        ]
    )
    print(response.choices[0].message.content)

    if message_prompt == "exit":
        break