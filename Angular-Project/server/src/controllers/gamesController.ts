import {Request, Response } from 'express';
import pool from '../database';
// import pool from '../database';

import db from '../database'

class GamesController {

    public async list (req: Request, res: Response) {
        // pool.query('DESCRIBE games')
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        // res.json({text: 'This is a game ' + req.params.id});
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({text: "The game doesn't exists"});
    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Game Saved'});
    }

    public async update (req: Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The game was updated'});
    }

    public delete (req: Request, res: Response) {
        const { id } = req.params;
        pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'The game was deleted'});
    }

}

const gamesController = new GamesController();
export default gamesController;