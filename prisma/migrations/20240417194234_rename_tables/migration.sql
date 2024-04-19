-- RenameOrders
ALTER TABLE "Orders"
RENAME TO "Order";


-- RenameCustomers
ALTER TABLE "Customers"
RENAME TO "Customer";

-- RenameOrderItems
ALTER TABLE "OrderItems"
RENAME TO "OrderItem";
