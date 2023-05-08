from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

#SESSION LOGIN
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        print(user)
        if user:
            if check_password_hash(user.password, password):
                flash('Logado com sucesso!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Senha incorreta, tente novamente.', category='error')
        else:
            flash('Email não existe', category='error')

    return render_template("login.html", user=current_user)

#SESSION LOGOUT
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

#SESSION SIGN UP
@auth.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == "POST":
        firstName = request.form.get("first-name")
        lastName = request.form.get("last-name")
        email = request.form.get("email")
        password = request.form.get("password")
        passwordConfirm = request.form.get("password-confirm")

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email já cadastrado!', category='error')
        elif len(firstName) < 3:
            flash('o nome precisa ser maior que 3 caracteres.', category='error')
        elif len(lastName) < 3:
            flash('o sobrenome precisa ser maior que 3 caracteres.', category='error')
        elif len(email) < 9:
            flash('o email precisa ser maior que 9 caracteres.', category='error')
        elif len(password) < 7: 
            flash('a senha precisa ser maior que 7 caracteres.', category='error')
        elif password != passwordConfirm:
            flash('a senha esta diferente', category='error')
        else:
            #add user in database
            new_user = User(email=email, first_name=firstName, last_name=lastName, password=generate_password_hash(password, method="sha256"))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash("conta criada com sucesso!", category='success')
            return redirect(url_for('views.home'))

    return render_template("sign_up.html", user=current_user)
