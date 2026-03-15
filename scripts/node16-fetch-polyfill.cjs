/* eslint-disable no-undef */
const http = require("http");
const https = require("https");
const { URL } = require("url");

class Headers {
  constructor(init) {
    this._map = new Map();

    if (!init) return;

    if (init instanceof Headers) {
      for (const [key, value] of init.entries()) this.append(key, value);
      return;
    }

    if (Array.isArray(init)) {
      for (const [key, value] of init) this.append(key, value);
      return;
    }

    for (const [key, value] of Object.entries(init)) {
      if (Array.isArray(value)) {
        for (const item of value) this.append(key, item);
      } else if (value != null) {
        this.append(key, value);
      }
    }
  }

  _normalizeName(name) {
    return String(name).toLowerCase();
  }

  _normalizeValue(value) {
    return String(value);
  }

  append(name, value) {
    const key = this._normalizeName(name);
    const normalized = this._normalizeValue(value);
    const existing = this._map.get(key);
    this._map.set(key, existing ? `${existing}, ${normalized}` : normalized);
  }

  set(name, value) {
    this._map.set(this._normalizeName(name), this._normalizeValue(value));
  }

  get(name) {
    const value = this._map.get(this._normalizeName(name));
    return value === undefined ? null : value;
  }

  has(name) {
    return this._map.has(this._normalizeName(name));
  }

  delete(name) {
    this._map.delete(this._normalizeName(name));
  }

  *entries() {
    yield* this._map.entries();
  }

  *keys() {
    yield* this._map.keys();
  }

  *values() {
    yield* this._map.values();
  }

  forEach(callback, thisArg) {
    for (const [key, value] of this._map.entries()) {
      callback.call(thisArg, value, key, this);
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

function toBuffer(body) {
  if (body == null) return Buffer.alloc(0);
  if (Buffer.isBuffer(body)) return body;
  if (body instanceof Uint8Array) return Buffer.from(body);
  if (typeof body === "string") return Buffer.from(body);
  if (typeof body === "object") return Buffer.from(String(body));
  return Buffer.from(String(body));
}

class BodyContainer {
  constructor(body) {
    this._bodyBuffer = toBuffer(body);
    this.bodyUsed = false;
  }

  async arrayBuffer() {
    this.bodyUsed = true;
    const buffer = this._bodyBuffer;
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  }

  async text() {
    this.bodyUsed = true;
    return this._bodyBuffer.toString("utf-8");
  }

  async json() {
    return JSON.parse(await this.text());
  }
}

class Request extends BodyContainer {
  constructor(input, init = {}) {
    const source = input instanceof Request ? input : null;
    const body = init.body !== undefined ? init.body : source?._bodyBuffer;
    super(body);

    this.url = source ? source.url : String(input);
    this.method = String(init.method || source?.method || "GET").toUpperCase();
    this.headers = new Headers(init.headers || source?.headers);
    this.redirect = init.redirect || source?.redirect || "follow";
    this.signal = init.signal || source?.signal || null;
  }

  clone() {
    return new Request(this, { body: this._bodyBuffer });
  }
}

class Response extends BodyContainer {
  constructor(body = null, init = {}) {
    super(body);
    this.status = init.status || 200;
    this.statusText = init.statusText || "";
    this.headers = new Headers(init.headers);
    this.ok = this.status >= 200 && this.status < 300;
    this.redirected = false;
    this.type = "default";
    this.url = "";
  }

  clone() {
    return new Response(this._bodyBuffer, {
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
    });
  }

  static json(data, init = {}) {
    const headers = new Headers(init.headers);
    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    return new Response(JSON.stringify(data), { ...init, headers });
  }

  static redirect(url, status = 302) {
    return new Response(null, {
      status,
      headers: { location: url },
    });
  }
}

function fetch(input, init = {}) {
  const request = input instanceof Request ? input : new Request(input, init);
  const url = new URL(request.url);
  const transport = url.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    const req = transport.request(
      url,
      {
        method: request.method,
        headers: Object.fromEntries(request.headers),
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () => {
          const response = new Response(Buffer.concat(chunks), {
            status: res.statusCode || 200,
            statusText: res.statusMessage || "",
            headers: res.headers,
          });
          response.url = request.url;
          resolve(response);
        });
      }
    );

    req.on("error", reject);

    if (request._bodyBuffer.length > 0) {
      req.write(request._bodyBuffer);
    }
    req.end();
  });
}

if (typeof globalThis.Headers === "undefined") globalThis.Headers = Headers;
if (typeof globalThis.Request === "undefined") globalThis.Request = Request;
if (typeof globalThis.Response === "undefined") globalThis.Response = Response;
if (typeof globalThis.fetch === "undefined") globalThis.fetch = fetch;
