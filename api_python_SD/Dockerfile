# Imagem base
FROM python:3.11

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de requisitos
COPY requirements.txt /app/requirements.txt

# Instalar dependências
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copiar os demais arquivos do projeto
COPY . /app

# Expor a porta 8000 (ou qualquer outra que você use)
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["python", "main.py"]
