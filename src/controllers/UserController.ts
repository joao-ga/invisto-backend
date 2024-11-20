import { Request, Response } from "express";
import User from "../models/User";
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
                delete data_user.confirmedPassword;
                delete data_user.password;
                // cria uma instacia para o usuário
                const user = new User({
                    ...data_user,
                    coins: 0,
                    property:0
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
                { $inc: { coins: coins } },
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

    static async validateUser(req: Request, res: Response) {
        const email = req.body.email;
        const user = await User.findOne({email: email})

        if(user) {
            res.status(201).send({user: user})
        } else {
            res.status(400).send({message: 'Usuário não encontrado'})
        }
    }

    static async getUserData(req:Request, res:Response) {
        const uid = req.body.uid;
        try {
            const user = await User.findOne({uid: uid});
            if(user) {
                const data = {
                    coin: user.coins,
                    ranking_id: user.ranking_id
                }
                const coins = user.coins;
                res.status(201).send({data: data})
            } else {
                res.status(400).send({message: 'Usuário não encontrado'})
            }

        } catch(e) {
            console.log(e)
        }
    
    }

    static async buyStock(req: Request, res: Response): Promise<void> {
        const data = req.body;

        const uid = data.uid;
        const code = data.code;

        try {
            const updateUserStocks = await User.findOneAndUpdate(
                { uid: uid },
                { $addToSet: { stocks: code } },
                { new: true, upsert: false }
            );
    
            if (!updateUserStocks) {
                res.status(404).send('Usuário não encontrado');
            } else {
                res.status(200).send('Stock comprada com sucesso');
                console.error("Stock comprada com sucesso: " + code + "Response: "+ updateUserStocks);
            }
    
        } catch(e) {
            console.error("Erro ao adicionar stock:", e);
            res.status(404).send('Erro ao comprar stock: ' + e);
        }
    }

    static async sellStock(req: Request, res: Response): Promise<void> {
        const data = req.body;

        const uid = data.uid;
        const code = data.code;

        try {
            const updateUserStocks = await User.findOneAndUpdate(
                { uid: uid },
                { $pull: { stocks: code } },
                { new: true }
            );
    
            if (!updateUserStocks) {
                res.status(404).send('Usuário não encontrado');
            } else {
                res.status(200).send('Stock vendida com sucesso');
            }
    
        } catch(e) {
            console.error("Erro ao remover stock:", e);
            res.status(404).send('Erro ao vender stock: ' + e);
        }
    }
}

export default UserController;
