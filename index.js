const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

// ⚠️ só cria se existir
let supabase;

if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  console.log("Supabase conectado");
} else {
  console.log("Supabase NÃO configurado ainda");
}

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.post("/webhook", async (req, res) => {
  try {
    if (!supabase) {
      return res.sendStatus(200);
    }

    const data = req.body;

    if (data.status === "paid") {
      const email = data.customer.email;

      await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true
      });

      console.log("Usuário criado:", email);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Erro:", err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});
