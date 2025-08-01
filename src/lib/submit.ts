import { InsuranceApplication, PassportFile, PersonInfo, ReceiptFile, InsuranceOrder } from "@/types/all";
import { compressFile, getFileSize } from "./fileHandling";

export async function generateUniqueTrackCode():Promise<string>{
    const res = await fetch("/api/order/generateUniqueTrackCode");
    const data = await res.json();
    const trackCode = data.trackCode;
    return trackCode;
}

export async function uploadPassportToDB(file: PassportFile): Promise<number> {
    // getFileSize(file);

    const compressed = await compressFile(file);

    // getFileSize(compressed);
    
    const res = await fetch("/api/order/uploadPassport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compressed),
    });
    const data = await res.json();
    const id = data.id;
    return id;
}

export async function uploadReceiptToDB(file: ReceiptFile): Promise<number> {
    // getFileSize(file);

    const compressed = await compressFile(file);

    // getFileSize(compressed);

    const res = await fetch("/api/order/uploadReceipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compressed),
    });
    const data = await res.json();
    const id = data.id;
    return id;
}

export async function storePersonInfoToDB(info: PersonInfo): Promise<number> {
    const res = await fetch("/api/order/storePersonInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    });
    const data = await res.json();
    const id = data.id;
    return id;
}

export async function storeApplicationToDB(application: InsuranceApplication): Promise<number> {
    const res = await fetch("/api/order/storeApplication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
    });
    const data = await res.json();
    const id = data.id;
    return id;
}

export async function storeInsuranceOrderToDB(order: InsuranceOrder, agent: string): Promise<number> {
    console.log(order);
    const res = await fetch("/api/order/storeInsuranceOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({order, agent}),
    });
    const data = await res.json();
    const id = data.id;
    return id;
}
