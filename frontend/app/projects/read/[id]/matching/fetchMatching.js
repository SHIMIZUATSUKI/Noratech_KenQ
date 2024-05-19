export default async function fetchMatching(id) {
    const url = `http://127.0.0.1:5000/matching?project_id=${id}`;  // URLにクエリパラメータを追加
    const res = await fetch(url, {cache: "no-cache"});
    if (!res.ok) {
        throw new Error('Failed to fetch matching data');
    }
    return res.json();
}
