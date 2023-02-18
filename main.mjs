import * as dotenv from 'dotenv'
dotenv.config();
dotenv.config({ path: ".env.defaults" });

process.title = "domino api";

import fetch from 'node-fetch';
import Fastify from 'fastify'
import formbody from '@fastify/formbody'

const fastify = Fastify({
    logger: true
});

fastify.register(formbody);

fastify.post("/anonymous", async function (request, reply) {
    if (request.body?.message && request?.body.token) {
        let description = request.body.message;
        description = description.replace(/#domino-club/g, "<#863664078325022720>");
    
        const r = await fetch("https://discord.com/api/webhooks/1042101026553069608/" + request.body.token, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ embeds: [{ description }] }),
        });

        return r.text();
    } else {
        reply.status(400);
    
        return { 
            error: {
                "message": "expecting x-www-form-urlencoded with message and token fields",
            },
        };
    }
});

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
