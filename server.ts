const kv = await Deno.openKv();

// Run a task every 1 minute.
// ※Deno deployでも有効なので、動きっぱなしにならないよう注意
// Deno.cron("Increment a counter", "* * * * *", async () => {
//   console.log("cron job is running.");
//   await kv.atomic().sum(["visitors"], 10n).commit();
// });

Deno.serve(async (_req) => {
  await kv.atomic().sum(["visitors"], 1n).commit();

  const count = await kv.get(["visitors"]);

  return new Response(`Hello, #${count.value} World!`);
});
