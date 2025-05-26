import { init } from './dist/index.js';

(async () => {
    process.env.SIMDAPO_MODE = 'development';

    const client = await init({
        clientId: '123',
        clientSecret: 'abc',
    });

    const res = await client.getSemester();
    console.log(res);
})();
