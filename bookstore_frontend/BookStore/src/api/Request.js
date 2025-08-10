export async function Request(endPoint) {
    const response = await fetch(endPoint);
    if (!response.ok) throw new Error(`Không thể truy cập ${endPoint}`);
    return response.json();
}