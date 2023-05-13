from flask import Blueprint, render_template, redirect, request, flash, jsonify, url_for
from flask_login import login_required, current_user
from .models import Note
from . import db
import json

views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    return render_template("home.html", user=current_user)


@views.route('/note', methods=['GET', 'POST'])
@login_required
def note():
    if request.method == "POST":
        note = request.form.get("note")
        if len(note) < 1:
            flash('Short note!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added.', category='success')
    return render_template("note.html", user=current_user)


@views.route('/delete-note', methods=['POST'])
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            flash('Deleted note.', category='error')
            db.session.delete(note)
            db.session.commit()
            
            return jsonify({'status': 'success'})
    
    return jsonify({'status': 'error', 'message': 'Note não encontrado.'})
