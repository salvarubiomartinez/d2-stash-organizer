import { readGameFile, writeJson } from "./files";
import { EquipmentTier, Weapon } from "../types";
import { getString } from "../strings";

export async function weaponsToJson() {
  const table = await readGameFile("Weapons");
  const weapons: Record<string, Weapon> = {};
  for (const line of table) {
    const code = line[3].trim();
    const tier =
      code === line[37].trim()
        ? EquipmentTier.NORMAL
        : code === line[38].trim()
        ? EquipmentTier.EXCEPTIONAL
        : EquipmentTier.ELITE;
    weapons[code] = {
      name: getString(line[5].trim()),
      type: line[1].trim(),
      tier,
      maxSockets: Number(line[55]) || 0,
      indestructible: line[29].trim() === "1",
      stackable: line[46] === "1",
      twoHanded: line[17] === "1",
      width: Number(line[44]),
      height: Number(line[45]),
      qlevel: Number(line[30]),
      levelReq: Number(line[32]),
      trackQuestDifficulty: line[69] === "1" || undefined,
    };
  }
  await writeJson("Weapons", weapons);
  return weapons;
}
