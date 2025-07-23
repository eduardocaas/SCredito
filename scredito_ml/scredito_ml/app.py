# app.py

import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

CSV_PATH = os.path.join(os.path.dirname(__file__), '..', 'scredito_clientes_perfil.csv')

# Inicializa a aplicação Flask
app = Flask(__name__)

CORS(app)
# Carrega o modelo RandomForest treinado
# O modelo é carregado apenas uma vez quando o servidor inicia
try:
    model = joblib.load("scredito_rf.joblib")
    print("✅ Modelo 'scredito_rf.joblib' carregado com sucesso!")
except FileNotFoundError:
    print("❌ Erro: O arquivo 'scredito_rf.joblib' não foi encontrado.")
    model = None

# Define a rota (endpoint) para fazer previsões
@app.route('/perfil', methods=['POST'])
def prever_perfil():
    # Verifica se o modelo está disponível
    if model is None:
        return jsonify({'erro': 'Modelo não foi carregado, verifique os logs.'}), 500

    try:
        # 1. Pega os dados JSON enviados na requisição
        dados_entrada = request.get_json()
        print(f"📥 Dados recebidos: {dados_entrada}")

        # 2. Valida se as chaves necessárias estão presentes
        if 'renda_familiar' not in dados_entrada or 'score_credito' not in dados_entrada:
            return jsonify({'erro': 'Dados incompletos. Forneça "renda_familiar" e "score_credito".'}), 400

        # 3. Converte os dados para um DataFrame do Pandas
        df_entrada = pd.DataFrame([dados_entrada], columns=['renda_familiar', 'score_credito'])

        # 4. Usa o modelo para fazer a previsão
        previsao = model.predict(df_entrada)

        # 5. O resultado é um array, então pegamos o primeiro item
        perfil_predito = previsao[0]

        # 6. Retorna o resultado em formato JSON
        print(f"✅ Previsão realizada: {perfil_predito}")
        return jsonify({'perfil_predito': perfil_predito})

    except Exception as e:
        # Em caso de qualquer outro erro, retorna uma mensagem clara
        traceback.print_exc()
        return jsonify({'erro': 'Ocorreu um erro inesperado.', 'detalhes': str(e)}), 500

@app.route('/salvar_cliente', methods=['POST'])
def salvar_cliente():
    try:
        cliente_para_salvar = request.get_json()
        print(f"📥 [SALVAR] Dados recebidos para salvar: {cliente_para_salvar}")

        colunas = [
            "cliente_id", "idade", "renda_familiar", "regiao", "escolaridade",
            "tem_negocio_proprio", "score_credito", "data_cadastro",
            "usa_orientacao_financeira", "perfil"
        ]
        
        df_novo_cliente = pd.DataFrame([cliente_para_salvar], columns=colunas)

        arquivo_existe = os.path.exists(CSV_PATH)
        
        df_novo_cliente.to_csv(
            CSV_PATH, 
            mode='a', 
            header=not arquivo_existe, 
            index=False,
            encoding='utf-8'
        )
        
        print(f"✅ [SALVAR] Cliente {cliente_para_salvar.get('cliente_id')} salvo com sucesso!")
        return jsonify({"status": "sucesso", "mensagem": "Cliente cadastrado com sucesso!"}), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({'erro': 'Ocorreu um erro ao salvar o cliente.', 'detalhes': str(e)}), 500
    
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)