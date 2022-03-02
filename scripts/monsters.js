
const dataPromise = fetch("assets/monsters.json")
    .then(response => response.json());

export async function getMonsterDetails (monster) {
    const data = await dataPromise;
    return data[monster];
}

export async function getAllMonsterIds () {
    const data = await dataPromise;
    return Object.keys(data);
}
