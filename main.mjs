import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: ".env.defaults" });

process.title = "domino api";

import Fastify from 'fastify';
import formbody from '@fastify/formbody';

import anonymous from './anonymous.mjs';

const fastify = Fastify({
    logger: true
});

fastify.register(formbody);
fastify.register(anonymous);

const options = {
    host: process.env.HOST ?? "localhost",
    port: parseInt(process.env.PORT ?? "3000"), 
};

fastify.listen(options, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }

    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
});

export {};
