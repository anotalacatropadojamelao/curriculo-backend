const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rota teste
app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

// Webhook Cakto
app.post('/webhook/cakto', (req, res) => {
  const data = req.body;

  console.log('Webhook recebido:', data);

  if (data.status === 'aprovado') {
    console.log('Pagamento aprovado para:', data.email);

    // Aqui depois você vai:
    // - criar usuário
    // - liberar acesso
  }

  res.sendStatus(200);
});

// Porta (Render usa variável PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
