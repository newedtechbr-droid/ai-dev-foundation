export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const range = request.headers.get("Range");
    if (response.status !== 200) return response;

    const headers = new Headers(response.headers);
    headers.set("Accept-Ranges", "bytes");
    if (!range) return new Response(response.body, { status: 200, headers });

    const body = await response.arrayBuffer();
    const size = body.byteLength;
    const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!match || (match[1] === "" && match[2] === "")) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    }

    let start;
    let end;
    if (match[1] === "") {
      start = Math.max(size - Number(match[2]), 0);
      end = size - 1;
    } else {
      start = Number(match[1]);
      end = match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1);
    }
    if (start >= size || start > end) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    }

    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    return new Response(body.slice(start, end + 1), { status: 206, headers });
  },
};
