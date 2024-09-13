-- CreateTable
CREATE TABLE "computers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manufacturer" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "purchase_date" DATETIME NOT NULL,
    "warranty_expiry_date" DATETIME NOT NULL,
    "specifications" TEXT,
    "image_url" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "computers_serial_number_key" ON "computers"("serial_number");
