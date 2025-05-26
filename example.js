import { init } from '@rangkotodotcom/simdapo';

(async () => {
    process.env.NODE_ENV = 'staging';

    const client = await init({
        clientId: 'abc',
        clientSecret: 'xyz',
    });

    const res = await client.createUser({ name: 'Dewi', age: 31 });
    console.log(res);
})();
