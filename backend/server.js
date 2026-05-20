const express = require('express');
const sql = require('mssql'); // Mudamos de mssql para sql para bater com a linha 14
const cors = require('cors');
require('dotenv').config();
console.log(process.env);

const app = express();
app.use(express.json());
app.use(cors());

// Configuração da conexão com nomes corrigidos do .env
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Conectar ao Banco de Dados do Docker
sql.connect(dbConfig)
    .then(pool => {
        if (pool.connected) {
            console.log('🚀 Conectado ao SQL Server no Docker com sucesso!');
        }
    })
    .catch(err => {
        console.error('❌ Erro ao conectar no banco de dados:', err.message);
    });

// Rota de teste para ver se a API está viva
app.get('/', (req, res) => {
    res.send('API do Catálogo Sessão da Tarde está rodando!');
});

app.post('/filmes', async (req, res) => {
    try {

        const { titulo, ano, genero, diretor } = req.body;

        const pool = await sql.connect(dbConfig);

        await pool.request()
            .input('titulo', sql.VarChar, titulo)
            .input('ano', sql.Int, ano)
            .input('genero', sql.VarChar, genero)
            .input('diretor', sql.VarChar, diretor)
            .query(`
                INSERT INTO Filmes (titulo, ano, genero, diretor)
                VALUES (@titulo, @ano, @genero, @diretor)
            `);

        res.status(200).json({
            mensagem: 'Filme salvo com sucesso!'
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            erro: 'Erro ao salvar filme'
        });
    }
});

app.get('/filmes', async (req, res) => {

    try {

        const pool = await sql.connect(dbConfig);

        const resultado = await pool.request()
            .query('SELECT * FROM Filmes');

        res.json(resultado.recordset);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            erro: 'Erro ao buscar filmes'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌍 Servidor rodando na porta ${PORT}`);
});