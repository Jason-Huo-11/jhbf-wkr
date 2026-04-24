// Worker 代码：代理 Bing 图片 API
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const bingApi = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
  if (url.pathname === '/bing') {
    const response = await fetch(bingApi);
    const data = await response.json();
    // 添加 CORS 头
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  return new Response('Not found', { status: 404 });
}
