import sys
import os

# Adiciona o diretório raiz do projeto ao path do Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from google.adk.agents import SequentialAgent

from agente_analista.agent import agent_analyst
from agente_dashboard.agent import agent_dashboard
from agente_pdf.agent import agent_pdf

code_pipeline_agent = SequentialAgent(
    name="Code_Pipeline_Agent",
    description="Executa uma sequência de análise de perfil, geração de HTML, e conversão de HTML para PDF",
    sub_agents=[agent_analyst, agent_dashboard, agent_pdf]
)

root_agent = code_pipeline_agent