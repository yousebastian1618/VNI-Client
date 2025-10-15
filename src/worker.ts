// src/worker.ts
import {ExecutionContext} from 'graphql/execution/execute';
import {environment} from './environments/environment';

const BACKEND = environment.server_url

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // 1) Proxy API/GraphQL to your backend (keeps same-origin in the client)
    if (url.pathname.startsWith('/graphql')) {
      const target = new URL(url.pathname + url.search, BACKEND).toString();

      // Clone request, forward body for non-GET/HEAD
      const init: RequestInit = {
        method: request.method,
        headers: request.headers,
        body: ['GET','HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
      };

      const resp = await fetch(target, init);

      // Optionally pass through CORS or enforce it here (usually backend already sets it)
      // const headers = new Headers(resp.headers);
      // headers.set('Vary', 'Origin');

      return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: resp.headers // or `headers` if you modified them above
      });
    }

    // 2) Serve static assets
    let resp = await env.ASSETS.fetch(request);

    // 3) SPA fallback: if static 404 and it’s a GET, return index.html
    if (resp.status === 404 && request.method === 'GET') {
      const indexUrl = new URL('/index.html', url.origin);
      resp = await env.ASSETS.fetch(new Request(indexUrl, request));
    }

    return resp;
  }
};
