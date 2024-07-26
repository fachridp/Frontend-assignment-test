// 0. Mendeklarasikan function dengan nama calculateShippingCost() dan ekspektasinya dia menerima 3 argumen melalui step 9 di bawah.
function calculateShippingCost(destination, weight, priority) {
 // 1. Saya memasukkan destination pilihan dan priority ke dalam array.
 const setDestinations = ["domestic", "international"];
 const setPriority = ["standard", "express", "priority"];

 // 2. set initial cost
 let additionalCost = 0
 let totalShippingCost = 0;

 // 3. kondisi jika weight di bawah 1 maka invalid, jika weight di atas 10 maka dikenakan biaya tambahan yaitu 10 dolar.
 if (weight < 1) return console.log("Invalid weight");
 if (weight > 10) additionalCost = 10;

 // 4. Saya menggunakan find() (agar hasilnya langsung dalam bentuk string, tidak dalam bentuk array baru atau object baru) untuk mencocokkan destinasi pilihan user dengan destinasi yang disediakan, kemudian hasilnya akan masuk ke getUserDestination. Jika user memilih destinasi yang tidak tersedia maka invalid.
 const getUserDestination = setDestinations.find(item => item === destination);
 if (!getUserDestination) return console.log("Invalid destination");

 // 5. Saya menggunakan find() (agar hasilnya langsung dalam bentuk string, tidak dalam bentuk array baru atau object baru) untuk mencocokkan prioroty pilihan user dengan priority yang disediakan, kemudian hasilnya akan masuk ke getUserPriority. Jika user memilih priority yang tidak tersedia maka invalid.
 const getUserPriority = setPriority.find(item => item === priority)
 if (!getUserPriority) return console.log("Invalid priority");

 // 6. Jika user memilih destinasi domestic, maka base cost nya adalah $5 untuk priority standard, $10 untuk priority express dan $20 untuk priority. Dan jika weight lebih dari 10kg maka ada tambahan cost yaitu $10 fix.
 if (getUserDestination === "domestic") {
  if (getUserPriority === "standard") totalShippingCost = 5 + additionalCost;
  if (getUserPriority === "express") totalShippingCost = 10 + additionalCost;
  if (getUserPriority === "priority") totalShippingCost = 20 + additionalCost;
 }

 // 7. Jika user memilih destinasi international, maka cost nya lebih mahal yaitu $5 untuk priority standard, $10 untuk priority express dan $20 untuk priority. Dan jika weight lebih dari 10kg maka ada tambahan cost yaitu $10 fix.
 if (getUserDestination === "international") {
  if (getUserPriority === "standard") totalShippingCost = 15 + additionalCost
  if (getUserPriority === "express") totalShippingCost = 25 + additionalCost;
  if (getUserPriority === "priority") totalShippingCost = 50 + additionalCost;
 }

 // 8. Mengembalikan console.log() dan program selesai dieksekusi.
 return console.log(totalShippingCost);
}

// 9. Memanggil function calculateShippingCost() dan memngoper 3 argumen sesuai dengan kebijakan yang berlaku.
calculateShippingCost("international", 11, "express");