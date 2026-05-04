const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const supabase = createClient(
  "https://wvewdjbaalgoybicqbjv.supabase.co",
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2ZXdkamJhYWxnb3liaWNxYmp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzg0ODY0NCwiZXhwIjoyMDkzNDI0NjQ0fQ.qk8nN7sUOkCrVBbUSYYhoabRbTAFjUGivLgNejRF2lg
);

app.post("/webhook", async (req, res) => {
  try {
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
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});
