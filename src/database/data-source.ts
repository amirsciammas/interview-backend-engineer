import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { UserDocument } from '../entity/UserDocument'
import { AlbumDocument } from '../entity/AlbumDocument';
import { ImageDocument } from '../entity/ImageDocument';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqli',
    synchronize: true,
    logging: false,
    entities: [ UserDocument, AlbumDocument, ImageDocument ],
    migrations: [],
    subscribers: [],
})
