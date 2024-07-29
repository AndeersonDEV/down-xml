import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import xlsx from 'xlsx';



const app = express();
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true, limit: '1000mb' }));
app.use(cors());

const upload = multer();

const emailSchema = new mongoose.Schema({
    loja: String,
    chave: String,
});

const Notas = mongoose.model('Banco', emailSchema);

mongoose.connect('mongodb+srv://HigorCafe:MlCuY2gH2u17vCEC@higorcafe.qp3nr5u.mongodb.net/Bases?retryWrites=true&w=majority&appName=HigorCafe')
    .then(() => console.log('Conexão com o MongoDB estabelecida'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.post('/ReceberChave', upload.none(), async (req, res) => {
    try {

        const chaves = JSON.parse(req.body.chaves);
        const loja = JSON.parse(req.body.loja);
        const corpo = req.body;

        // console.log(chaves);
        // console.log(loja);
        // console.log(corpo);

        let dados = [
            ['LOJA', 'CHAVE', 'STATUS'],  // Cabeçalho
            ...chaves.map(chave => [loja, chave])  // Dados
        ];

        const workbook = xlsx.utils.book_new()

        const worksheet = xlsx.utils.aoa_to_sheet(dados)
        xlsx.utils.book_append_sheet(workbook, worksheet)

        const diretorio = `\\\\5457dep02473145\\Users\\5310202\\Desktop\\Entrada\\Chaves_da_Loja_CD_${loja}.xlsx`

        xlsx.writeFile(workbook, diretorio)

        res.status(200).send({ "message": 'Chaves recebidas' });

        // let valoresSaida = Buscardados(loja)


    } catch (error) {

        console.error('Erro ao processar chaves:', error);
        res.status(400).send({ "message": 'Erro ao processar chaves' });

    }

});

async function Buscardados(loja) {

    const diretorio = `\\\\5457dep02473145\\Users\\5310202\\Desktop\\Saida\\Chaves_da_Loja_CD_${loja}.xlsx`

    const workbook = xlsx.readFile(diretorio)

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const dados = xlsx.utils.sheet_to_json(worksheet);

    return dados

}


app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 3000');
});
