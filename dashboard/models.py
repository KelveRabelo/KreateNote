# class Item(db.Model):
#     id = db.Column(db.Integer(), nullables=False, primary_key=True)
#     EMPRESA = db.Column(db.String(30), nullables=False)
#     cnpj_empresa = db.Column(db.Integer(), nullables=True)
#     tipo_equipamento = db.Column(db.String(30), nullables=False)
#     imei = db.Column(db.String(30), nullables=False, uniques=True)
#     numero_serie = db.Column(db.String(30), nullables=False, uniques=True)
#     modelo = db.Column(db.String(), nullables=True)
#     fabricante = db.Column(db.String(), nullables=True)
#     nota_fiscal = db.Column(db.String(), nullables=False, uniques=True)
#     tempo_garantia = db.Column(db.String(), nullables=False)
#     data_inicio_garantia = db.Column(db.String(), nullables=False)
#     data_final_garantia = db.Column(db.String(), nullables=False)
#     data_aquisicao = db.Column(db.String(), nullables=False)
#     data_entrega = db.Column(db.String(), nullables=False)
#     data_devolucao = db.Column(db.String(), nullables=False)
#     nome_usuario = db.Column(db.String(), nullables=False, unique=True)
#     matricula = db.Column(db.String(), nullables=False, unique=True)
#     login = db.Column(db.String(), nullables=False)
#     departamento = db.Column(db.String(), nullables=False)
#     centro_custo = db.Column(db.String(), nullables=False)
#     diretoria = db.Column(db.String(), nullables=False)
#     status = db.Column(db.String(), nullables=False)
#     estado = db.Column(db.String(), nullables=True)
#     valor_equipamento = db.Column(db.Integer(), nullables=False)


#     def __repr__(self):
#         return f'Item{self.name}'


from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Note(db.Model):
    id =            db.Column(db.Integer, primary_key=True)
    data =          db.Column(db.String(10000))
    date =          db.Column(db.DateTime(timezone=True), default=func.now())
    user_id =       db.Column(db.Integer, db.ForeignKey('user.id'))

class User(db.Model, UserMixin):
    id =            db.Column(db.Integer, primary_key=True)
    first_name =    db.Column(db.String(150))
    last_name =     db.Column(db.String(150))
    email =         db.Column(db.String(150), unique=True)
    password =      db.Column(db.String(150))
    notes =         db.relationship('Note')