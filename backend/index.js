const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MrClr@122006!",
  database: "sistema_monitoria"
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("✅ Conexão bem-sucedida ao MySQL!");
});

// ---------------------- DISCIPLINAS ----------------------

app.get("/disciplinas", (req, res) => {
  const sql = "SELECT * FROM disciplinas";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar disciplinas:", err);
      res.status(500).send("Erro no servidor");
    } else {
      res.json(results);
    }
  });
});

app.post("/disciplinas", (req, res) => {
  const { nome, codigo } = req.body;
  const sql = "INSERT INTO disciplinas (nome, codigo) VALUES (?, ?)";
  db.query(sql, [nome, codigo], (err) => {
    if (err) {
      console.error("Erro ao cadastrar disciplina:", err);
      res.status(500).send("Erro no servidor");
    } else {
      res.send("Disciplina cadastrada com sucesso!");
    }
  });
});


// ================= ROTAS =================

// Rota inicial
app.get("/", (req, res) => {
  res.send("API do Sistema de Monitoria está rodando! 🚀");
});

// ---------- MONITORES ----------
app.get("/monitores", (req, res) => {
  db.query("SELECT * FROM monitores", (err, results) => {
    if (err) return res.status(500).send("Erro no servidor");
    res.json(results);
  });
});

app.post("/monitores", (req, res) => {
  const { nome, curso, email } = req.body;
  const sql = "INSERT INTO monitores (nome, curso, email) VALUES (?, ?, ?)";
  db.query(sql, [nome, curso, email], (err) => {
    if (err) return res.status(500).send("Erro ao cadastrar monitor");
    res.send("Monitor cadastrado com sucesso!");
  });
});

// ---------- MATERIAIS ----------
app.get("/materiais", (req, res) => {
  db.query("SELECT * FROM materiais", (err, result) => {
    if (err) return res.status(500).send("Erro");
    res.json(result);
  });
});

app.post("/materiais", (req, res) => {
  const { titulo, link, descricao } = req.body;
  const sql = "INSERT INTO materiais (titulo, link, descricao) VALUES (?, ?, ?)";
  db.query(sql, [titulo, link, descricao], (err) => {
    if (err) return res.status(500).send("Erro");
    res.send("Material cadastrado!");
  });
});

// ---------- DÚVIDAS ----------
app.get("/duvidas", (req, res) => {
  db.query("SELECT * FROM duvidas", (err, result) => {
    if (err) return res.status(500).send("Erro");
    res.json(result);
  });
});

app.post("/duvidas", (req, res) => {
  const { aluno, pergunta } = req.body;
  const sql = "INSERT INTO duvidas (aluno, pergunta) VALUES (?, ?)";
  db.query(sql, [aluno, pergunta], (err) => {
    if (err) return res.status(500).send("Erro");
    res.send("Dúvida enviada!");
  });
});

// ---------- AVALIAÇÕES ----------
app.get("/avaliacoes", (req, res) => {
  db.query("SELECT * FROM avaliacoes", (err, result) => {
    if (err) return res.status(500).send("Erro");
    res.json(result);
  });
});

app.post("/avaliacoes", (req, res) => {
  const { monitor, comentario, nota } = req.body;
  const sql = "INSERT INTO avaliacoes (monitor, comentario, nota) VALUES (?, ?, ?)";
  db.query(sql, [monitor, comentario, nota], (err) => {
    if (err) return res.status(500).send("Erro");
    res.send("Avaliação cadastrada!");
  });
});

// ================= SERVER =================
app.listen(3001, () => {
  console.log("🚀 Servidor rodando na porta 3001");
});
