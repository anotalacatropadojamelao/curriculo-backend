const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const supabase = createClient(
  "https://wvewdjbaalgoybicqbjv.supabase.co",
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZXdkamJhYWxnb3liaWNxYmp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzg0ODY0NCwiZXhwIjoyMDkzNDI0NjQ0fQ.qk8nN7sUOkCrVBbUSYYhoabRbTAFjUGivLgNejRF2lg
);

app.post("/webhook", async (req, res) => {
  const data = req.body;

  if (data.status === "paid") {
    const email = data.customer.email;

    try {
      // cria usuário no auth
      await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true
      });

      // salva no banco
      await supabase.from("usuarios").insert({
        email: email,
        acesso: true
      });

      console.log("Usuário criado:", email);

    } catch (err) {
      console.error("Erro:", err);
    }
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});
