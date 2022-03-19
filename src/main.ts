import {AppDataSource} from './database/data-source';
import {app} from './app';

AppDataSource.initialize().then(async () => {
    app.listen(2500, () => {
        console.log('Listening on port 2500');
    });
}).catch(error => console.error(error));
