import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import net from 'net';

class UserController {
    static async registration(req: Request, res: Response): Promise<void> {
        const data_user = req.body;

        // verificar se o email do usuário já existe no banco de dados
        const otherUser = await User.findOne({email: data_user.email});

        if(otherUser != undefined) {
            res.status(400).send({ error: 'Esse e-mail já está sendo usado!' });
            return 
        }

        try {
            //criar conexao com o socket
            const client = new net.Socket()
            client.connect(8000, 'localhost', () => {
                //enviar os dados via string para o servidor
                client.write(JSON.stringify(data_user) + '\n');
            });

            client.on('data', async (data) => {
                const response = JSON.parse(data.toString());
    
                //valida se a resposta foi erro
                if (response.status === 'error') {
                    //envia mensagem de erro
                    res.status(400).send({ error: response.message });
                    //fecha conexao com o servidor
                    client.destroy(); 
                    return;
                }
    
                //se a resposta for positiva, criptografa a senha 
                const hashedPassword = await bcrypt.hash(data_user.password, 10);
                delete data_user.confirmedPassword;
                // cria uma instacia para o usuário
                const user = new User({
                    ...data_user,
                    coins: 0,
                    password: hashedPassword
                });
                //salva no banco de dados e manda uma resposta positiva
                await user.save();
                res.status(201).send({ message: "Usuário Cadastrado" });
                // fecha a conexao do servidor
                client.destroy();
            });
    
            // erro do socket
            client.on('error', (err) => {
                console.error('Socket Error:', err);
                res.status(500).send({ error: "Erro ao conectar ao servidor Java" });
            });

        } catch (e) {
            //erro na api
            console.error(e);
            res.status(500).send({ error: "Erro" });
        }
    }

    static async addCoin(req: Request, res: Response): Promise<void> {
        const data = req.body;

        const uid = data.uid;
        const coins = data.coins;

        try {
           
            const updatedUser = await User.findOneAndUpdate(
                { uid: uid },
                { $set: { coins: coins } },
                { new: true }
            );
    
            if (!updatedUser) {
                res.status(404).send('Usuário não encontrado');
            } else {
                res.status(200).send('Moeda atualizada com sucesso');
            }
    
        } catch(e) {

        }
    }

    //ataulizar user para adicionar o uid do usuário em seu documento
    static async addUidUser(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const uid =  data.uid;
        const email = data.email;

        try {

            const addUid = await User.findOneAndUpdate(
                {email: email},
                {$set: { uid: uid }},
                {new: true}
            )

            if (!addUid) {
                res.status(404).send('Usuário não encontrado');
            } else {
                res.status(200).send('Uid adicionado')
            }

        } catch(e) {
            console.log(e)
        }
    }
}

export default UserController;
