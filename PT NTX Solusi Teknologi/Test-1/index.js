// 0. Pembuatan function dengan nama calculateTax() dengan ekspektasi function ini akan menerima 3 argumen nantinya (pada step 23 terakhir)
function calculateTax(income, age, dependents) {
 // 1. saya memasukkan parameternya ke dalam sebuah variabel agar lebih rapi dan lebih readable
 const citizensIncome = income;
 const citizensAge = age;
 const dependentsFamily = dependents;

 // 2. discountIncome adalah variabel untuk mendapatkan potongan tax berdasarkan penghasilan dan initial valuenya 0
 let discountIncome = 0;

 // 3. discountAge adalah variabel untuk mendapatkan potongan tax berdasarkan umur dan initial valuenya 0
 let discountAge = 0;

 // 4. deductionTaxDependents adalah variabel untuk menampung deduction.Setiap kepala mendapatkan $500. Dan initial valuenya 0 nanti tinggal dikalikan.
 let deductionTaxDependents = 0;

 // 5. Total annual tax yg harus dibayar nantinya akan ditampung di sini


 // 6. Jika user mengoper argumen value untuk variabel income yang tipe datanya bukan number atau di bawah 0 atau minus, maka muncul pesan di console invalid income
 if (income < 0 || typeof income !== "number") return console.log("Invalid income");

 // 7. Jika user mengoper argumen value untuk variabel age yang tipe datanya bukan number atau di bawah 0 atau minus, maka muncul pesan di console invalid age
 if (age < 0 || typeof age !== "number") return console.log("Invalid age");

 // 8. Jika user mengoper argumen value untuk variabel dependents yang tipe datanya bukan number atau di bawah 0 atau minus, maka muncul pesan di console invalid dependents
 if (dependents < 0 || typeof dependents !== "number") return console.log("Invalid dependents");

 // 9. Jika pendapatan user di bawah $3000, maka ia tidak mendapatkan potongan
 if (citizensIncome < 3000) discountIncome = 0;

 // 10. Jika pendapatan user di $3000 dan di bawah $5000 ($4999), maka ia mendapatkan potongan sebanyak 3%
 if (citizensIncome >= 3000 && citizensIncome < 5000) discountIncome = 0.03 // 3%;

 // 11. Jika pendapatan user di atas $4999 dan di bawah $10001, maka ia mendapatkan potongan sebanyak 10%
 if (citizensIncome >= 5000 && citizensIncome <= 10000) discountIncome = 0.10 // 10%;

 // 12. Jika pendapatan user di atas $10000 dan di bawah 50001 maka ia mendapatkan potongan sebanyak 20%
 if (citizensIncome >= 10001 && citizensIncome <= 50000) discountIncome = 0.20; //20$;

 // 13. Jika pendapatan user $50001 atau lebih, maka ia mendapatkan potongan sebanyak 30%
 if (citizensIncome >= 50001) discountIncome = 0.30; //30%

 // 14. Jika umur citizen masih di bawah 18 tahun, maka dia tidak wajib bayar pajak
 if (citizensAge < 18) console.log("Not eligible for tax");

 // 15. Jika umur citizen sudah menyentuh 18 tahun dan di bawah umur 66 tahun maka dia mendapatkan potongan pajak dari umur sebanyak 10%
 if (citizensAge >= 18 && citizensAge < 65) discountAge = 0.10; // 10%

 // 16. Jika umur citizen 65 tahun atau lebih, maka dia mendapatkan potongan pajak dari umur sebanyak 20%
 if (citizensAge >= 65) discountAge = 0.20; // 20%

 // 17. Jika user memeliki tanggungan/anggota keluarga yang harus ditanggung, maka akan mendapatkan pemotongan per kepalanya sebesar $500. (e.g. 5dependents * $500)
 if (dependentsFamily > 0) deductionTaxDependents = dependents * 500;

 // 18. Di sini akan menjumlahkan dicount pajak dari umur dan discount pajak dari pendapatan user
 const ageIncomeTaxRate = discountAge + discountIncome;

 // 19. Deduction/pemotongan per kepala keluarga (pada step 17) akan dimasukkan ke dependentsTaxRate variabel.
 const dependentsTaxRate = deductionTaxDependents;

 // 20. Melakukan perhitungan untuk mendatpkan total pajak tahunan yang harus dibayar.
 let totalAmount = (citizensIncome - dependentsTaxRate) * ageIncomeTaxRate;

 // 21. Convert int agar ada komanya dan mudah dibaca
 console.log(`Total pajak tahunan yang harus dibayar adalah $${totalAmount.toLocaleString('en-US', { maximumFractionDigits: 3 })}`);

 // 22. recursive
 calculateTax();
}

// 23. Panggil function nya dan oper sebanyak 3 argument
calculateTax(50000, 65, 10);