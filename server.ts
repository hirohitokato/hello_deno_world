const kv = await Deno.openKv();

Deno.serve(async (_req) => {
    await kv.atomic().sum(["visitors"], 1n).commit();
    
    const count = await kv.get(["visitors"]);

    return new Response(`Hello, #${count.value} World!`);
});
