from google.adk.agents import Agent
from xhtml2pdf import pisa 
import uuid
import os


def html_to_pdf(dashboard_html: str) -> dict:
    """
    Converte um HTML num arquivo PDF e salva no diretório especificado.

    Args:
        :param dashboard_html: ‘string’ do código HTML a ser convertido.

    Returns:
        :dict: um dicionário indicando o caminho do PDF gerado.
    """

    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(script_dir)))
        
        new_dir = os.path.join(base_dir, "scredito_pdfs")
        os.makedirs(new_dir, exist_ok=True)

        filename = f"{uuid.uuid4()}.pdf"

        output_path = os.path.join(new_dir, filename)

        with open(output_path, "w+b") as pdf_file:    
            pisa_status = pisa.CreatePDF(
                dashboard_html,               
                dest=pdf_file)                
      
        if pisa_status.err:
            raise Exception(f"Erro na conversão do pisa: {pisa_status.err}")

        print(f"PDF gerado em: {output_path}")
        return {"pdf_path": output_path}

    except Exception as e:
        print(f"Erro ao gerar PDF: {e}")
        return {"error": str(e)}

agent_pdf = Agent(
    name="html_to_pdf_renderer_agent_v1",
    model="gemini-2.5-pro",
    description=(
        "Recebe um código em HTML. "
        "Sua única função é gerar um arquivo PDF com base nesse HTML e salvar esse PDF em um diretório."
    ),
    instruction=(
        """
        Você é um robô de geração de PDF. Sua única função é gerar um PDF a partir de um código HTML.
        
        **HTML DE ENTRADA**
        ```html
            {dashboard_html}
        ```
        """
    ),
    tools=[html_to_pdf]
)