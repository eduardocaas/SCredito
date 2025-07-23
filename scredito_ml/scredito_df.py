import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

file_path = "scredito_clientes.csv"
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

# Define o perfil com base na renda e score
def set_perfil(row):
  if row['renda_familiar'] > 5000:
    renda = 'A'
  elif 2500 < row['renda_familiar'] <= 5000:
    renda = 'B'
  elif row['renda_familiar'] <= 2500:
    renda = 'C'

  if row['score_credito'] > 650:
    score = '1'
  elif 400 < row['score_credito'] <= 650:
    score = '2'
  elif row['score_credito'] <= 400:
    score = '3'

  return renda + score

# Aplicação de função de definição de perfil e criação de CSV
df['perfil'] = df.apply(set_perfil, axis=1)
df.to_csv('scredito_clientes_perfil.csv', index=False)

# Porcentagem de perfis
perfil_percentual = df['perfil'].value_counts(normalize=True) * 100
print(perfil_percentual.round(2))

# Definição textual de perfis
legenda_dict = {
    'A1': 'Alta renda e score alto',
    'A2': 'Alta renda e score médio',
    'A3': 'Alta renda e score baixo',
    'B1': 'Média renda e score alto',
    'B2': 'Média renda e score médio',
    'B3': 'Média renda e score baixo',
    'C1': 'Baixa renda e score alto',
    'C2': 'Baixa renda e score médio',
    'C3': 'Baixa renda e score baixo',
}

perfil_percentual = df['perfil'].value_counts(normalize=True) * 100
perfil_percentual = perfil_percentual.sort_index() # Ordenação alfabética

# Gráfico
fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.bar(perfil_percentual.index, perfil_percentual.values, color='skyblue')

# Títulos e labels
ax.set_title('Distribuição percentual dos perfis')
ax.set_ylabel('Porcentagem (%)')
ax.set_xlabel('Perfil')
ax.set_ylim(0, perfil_percentual.max() + 5)
ax.grid(axis='y', linestyle='--', alpha=0.7)

# Legenda
from matplotlib.patches import Patch
legendas = [Patch(facecolor='skyblue', label=f"{k} = {v}") for k, v in legenda_dict.items()]
ax.legend(handles=legendas, loc='upper left', bbox_to_anchor=(1.05, 1), title="Legenda")

plt.tight_layout()
plt.show()