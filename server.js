const fastify = require("fastify")({ logger: false });

fastify.get("/", function (request, reply) {
  reply.code(200);
  reply.send(reply.statusCode)
});

fastify.listen({ port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
