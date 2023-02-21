export default routes;

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {Object} options
 */
async function routes(fastify, options) {
    fastify.addSchema({
        $id: "zone/anonymous",
        type: "object",
        required: ["message", "token"],
        properties: {
            message: { type: "string" },
            token: { type: "string" },
        }
    });

    fastify.post("/anonymous", { schema: { body: { $ref: "zone/anonymous" } } }, async function (request, reply) {
        let { message, token } = request.body; 

        let description = message;
        description = description.replace(/#domino-club/g, "<#863664078325022720>");
    
        const remote = await sendDiscordEmbedMessage("1042101026553069608", token, message);
        reply.code(remote.status);
        return remote.text();
    });
}

/**
 * @param {string} webhook
 * @param {string} token
 * @param {string} description
 */
async function sendDiscordEmbedMessage(webhook, token, description) {
    return fetch(`https://discord.com/api/webhooks/${webhook}/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ embeds: [{ description }] }),
    });
}
