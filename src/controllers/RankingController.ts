import { Request, Response } from "express";
import Ranking from "../models/Ranking";
import User from "../models/User";

class RankingController {
    static async createRanking(req: Request, res: Response) {
        const uid =  req.body.uid;
        const id = generateRandomCode();
        
        let participants = [uid];

        const ranking = new Ranking ({
            id: id,
            participants: participants,
        })

        try {
            await ranking.save();

            await User.findOneAndUpdate(
                {uid: uid},
                {$set: { ranking_id: id }},
                {new: true}
            )

            res.status(201).send({message: 'Ranking criado'})
        } catch(e) {
            console.log(e)
        }
    }

    static async enterRanking(req: Request, res: Response): Promise<any> {
        const uid = req.body.uid;
        const ranking_code = req.body.ranking;
    
        try {
            const ranking = await Ranking.findOne({ id: ranking_code });
    
            if (!ranking) {
                return res.status(404).send({ message: "Ranking não encontrado" });
            }
            ranking.participants.push(uid);
            await ranking.save();

            await User.findOneAndUpdate(
                {uid: uid},
                {$set: { ranking_id: ranking_code }},
                {new: true}
            )
    
            res.status(200).send({ message: "Usuário adicionado ao ranking com sucesso" });
        } catch (e) {
            console.error(e);
        }
    }

    static async getRanking(req: Request, res: Response): Promise<any> {
        const ranking_id = req.body.ranking;
        let participants_ranking = [];

        try {
            const ranking = await Ranking.findOne({ id: ranking_id });
            
            if (!ranking) {
                return res.status(404).json({ message: "Ranking não encontrado" });
            }

            const participants = ranking.participants;
            
            for (const participant of participants) {
                const user = await User.findOne({ uid: participant });
    
                if (user) {
                    const data = {
                        name: user.name,
                        coins: user.coins,
                    };

                    participants_ranking.push(data);
                }
            }
            
            participants_ranking.sort((a: any, b: any) => b.coins - a.coins);

            return res.status(200).send({data: participants_ranking});
    
        } catch (e) {
            console.error(e);
        }
    }    
}

// funcao que gera um codigo aleatório do ranking
function generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

export default RankingController;