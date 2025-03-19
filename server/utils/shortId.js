import { customAlphabet } from "nanoid";

// Generate a 5-digit number
const nanoid = customAlphabet("1234567890", 5);

// In-memory map to store UUID ↔ Short Number relationships
const uuidMap = new Map();

export function uuidToShort(uuid) {
    if (!uuidMap.has(uuid)) {
        const shortId = nanoid(); // Generate a 5-digit number
        uuidMap.set(uuid, shortId);
        uuidMap.set(shortId, uuid); // Store reverse mapping
    }
    return uuidMap.get(uuid);
}

export function shortToUuid(shortId) {
    return uuidMap.get(shortId) || null; // Retrieve original UUID
}
