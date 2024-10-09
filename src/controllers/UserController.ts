import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import net from 'net';

class UserController {
    static async registration(req: Request, res: Response): Promise<void> {
        const data_user = req.body;

        try {
            console.log(data_user);

            //enviar para o servidor os dados do usuário via socket
            const client = new net.Socket()
            client.connect(8000, 'localhost', () => {
                // Enviar dados do usuário em formato JSON
                client.write(JSON.stringify(data_user));
            });

            client.on('data', async (data) => {
                const response = JSON.parse(data.toString());
    
                // Verificar se a resposta do servidor é válida
                if (response.status === 'error') {
                    res.status(400).send({ error: response.message });
                    client.destroy(); 
                    return;
                }
    
                // Se a resposta for válida, criptografar a senha e salvar no banco
                const hashedPassword = await bcrypt.hash(data_user.password, 10);
                const user = new User({
                    ...data_user,
                    password: hashedPassword
                });
    
                await user.save();
                res.status(201).send({ message: "Usuário Cadastrado" });
                client.destroy();
            });
    
            client.on('error', (err) => {
                console.error('Socket Error:', err);
                res.status(500).send({ error: "Erro ao conectar ao servidor Java" });
            });

        } catch (e) {
            console.error(e);
            res.status(500).send({ error: "Erro" });
        }
    }
}

export default UserController;
