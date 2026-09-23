export async function onRequest(context) {
  try {
    // 1. Apni JPG/PNG image ka path yahan dein (Jaise '/preview.png' ya '/preview.jpg')
    const imageUrl = new URL('/trgg5y5.svg', context.request.url);

    // 2. Image fetch karo
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      return new Response('Image Not Found', { status: 404 });
    }

    // 3. Image ko Buffer mein convert karo
    const imageBuffer = await imageResponse.arrayBuffer();

    // 4. Response return karo (PNG ke liye 'image/png', JPG ke liye 'image/jpeg')
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpg', // JPG image ho toh 'image/jpeg' likhein
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    return new Response(`Error fetching image: ${error.message}`, { status: 500 });
  }
}

