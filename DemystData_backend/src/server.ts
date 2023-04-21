import 'dotenv/config';
import * as http from 'http';
import app from '@app/index';

(function startServer () {
    const PORT: number = process.env.APP_PORT ? +process.env.APP_PORT : 3000;

    http.createServer(app).listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})();


