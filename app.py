from dashboard import create_app

app = create_app()

if __name__ == '__main__':
    print("Rodando!")
    app.run(debug=True)
else:
    print("deu ruim")