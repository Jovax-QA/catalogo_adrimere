# Setup Local & Ngrok

Comandos rápidos para rodar o projeto localmente e expor via ngrok.

---

## 🖥️ Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Subir aplicação
npm run dev

# 3. Abrir no navegador
http://localhost:5173
```

---

## 🌐 Expor via Ngrok

```bash
# 1. Instalar ngrok globalmente
npm install -g ngrok

# 2. Configurar authtoken (obter em https://dashboard.ngrok.com/get-started/your-authtoken)
ngrok config add-authtoken SEU_TOKEN_AQUI

# 3. Criar túnel para porta 5173
ngrok http 5173

# 4. Copiar URL pública (ex: https://abc123.ngrok-free.app)
```

---

## 📝 Observações

- A porta padrão do Vite é `5173`
- Ngrok gera URL temporária (válida até reiniciar)
- Para URL fixa, usar `ngrok http 5173 --subdomain=meu-catalogo` (planos pagos)
