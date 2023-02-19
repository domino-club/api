import fetch from 'node-fetch';

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} options
 */
async function routes(fastify, options) {
    fastify.post("/anonymous", async function (request, reply) {
        if (!request.body?.message && !request?.body.token) {
            reply.status(400);
            return { "message": `expecting x-www-form-urlencoded with message and token fields` };
        }
        
        let description = request.body.message;
        description = description.replace(/#domino-club/g, "<#863664078325022720>");
    
        const r = await fetch("https://discord.com/api/webhooks/1042101026553069608/" + request.body.token, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ embeds: [{ description }] }),
        });

        reply.code(r.status);
        return r.text();
    });
}

export default routes;
