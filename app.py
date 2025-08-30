from flask import Flask, render_template, request, redirect, flash
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "supersecretkey")  # Needed for flash messages

# ✅ Flask-Mail config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")  # your Gmail
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")  # Gmail app password
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("MAIL_USERNAME")
app.config["TEMPLATES_AUTO_RELOAD"] = True

mail = Mail(app)

# ✅ Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message_body = request.form['message']

        # ✅ send email
        msg = Message(subject=f"Portfolio Contact from {name}",
                      recipients=[os.getenv("MAIL_USERNAME")],
                      body=f"From: {name} <{email}>\n\n{message_body}")
        try:
            mail.send(msg)
            flash("✅ Message sent successfully!", "success")
        except Exception as e:
            print(f"Error sending email: {e}")
            flash("❌ Failed to send message. Please try again later.", "danger")

        return redirect('/contact')
    return render_template('contact.html')

if __name__ == "__main__":
    app.run(debug=True)