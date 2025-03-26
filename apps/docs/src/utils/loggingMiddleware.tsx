import { createMiddleware } from "@tanstack/react-start";

// Remove async from functions that don't use await
const preLogMiddleware = createMiddleware()
	.client((ctx) => {
		const clientTime = new Date();

		return ctx.next({
			context: {
				clientTime,
			},
			sendContext: {
				clientTime,
			},
		});
	})
	.server((ctx) => {
		const serverTime = new Date();

		return ctx.next({
			sendContext: {
				serverTime,
				durationToServer:
					serverTime.getTime() - ctx.context.clientTime.getTime(),
			},
		});
	});

// For development purposes, keep the tracking info but avoid console.log
export const logMiddleware = createMiddleware()
	.middleware([preLogMiddleware])
	.client(async (ctx) => {
		const res = await ctx.next();

		// We'll use a custom logger or remove this in production
		// For now we'll keep the logic but comment out the console.log
		const now = new Date();
		const metrics = {
			duration: res.context.clientTime.getTime() - now.getTime(),
			durationToServer: res.context.durationToServer,
			durationFromServer: now.getTime() - res.context.serverTime.getTime(),
		};

		// In production, we might want to send these metrics to an analytics service
		// or use a proper logging service instead of console.log
		// console.log("Client Req/Res:", metrics);

		return res;
	});
