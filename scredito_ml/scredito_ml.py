import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

file_path = "scredito_clientes_perfil.csv"
# Leitura do CSV -> dataframe
try:
  df = pd.read_csv(file_path)
  print(f"CSV '{file_path}' carregado com sucesso!")
  print("\nInformações do DataFrame:")
  print(df.describe())
  print("\nPrimeiras 5 linhas do DataFrame:")
  print(df.head())
except FileNotFoundError:
    print(f"Erro: Arquivo {file_path} não encontrado.")
    exit()

# Divisão de classes / rótulo
X = df[['renda_familiar', 'score_credito']]
y = df['perfil']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y, random_state=42)
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print(classification_report(y_test, y_pred))
acc = accuracy_score(y_test, y_pred)
print(f"Acurácia: {acc:.4f}")

model_file = 'scredito_rf.joblib'
joblib.dump(model, model_file)

print(f"Modelo salvo como '{model_file}'")

from google.colab import files
files.download(model_file)