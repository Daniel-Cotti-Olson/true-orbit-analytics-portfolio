import pandas as pd
import random
from faker import Faker
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()

# --- Configuration ---
NUM_RECORDS = 1000
START_DATE = datetime(2024, 1, 1)
END_DATE = datetime(2024, 12, 31)

# Define product catalog with categories and prices
PRODUCT_CATALOG = {
    "Apparel": {
        "Enchanted Forest T-Shirt": 24.99,
        "Minimalist Dragon Hoodie": 45.50,
        "'Code & Coffee' Tee": 22.99,
        "Sorcerer's Hat Embroidered Cap": 28.00,
    },
    "Home Goods": {
        "Cthulhu Silhouette Mug": 15.99,
        "Dwarven Axe Coasters (Set of 4)": 19.99,
        "Elven Leaf Art Print": 32.00,
        "Mimic's Grin Throw Pillow": 25.00,
    },
    "Accessories": {
        "Viking Rune Keychain": 9.50,
        "Cosmic Horror Sticker Pack": 12.00,
        "RPG Class Symbol Enamel Pin": 10.00,
        "Developer Joke Sticker": 3.50,
    }
}

# --- Data Generation ---
data = []
all_products = []
for category, products in PRODUCT_CATALOG.items():
    for product, price in products.items():
        all_products.append({"name": product, "category": category, "price": price})

# Make some products more popular than others
weights = [random.uniform(0.5, 1.5) for _ in all_products]
# Make 'Enchanted Forest T-Shirt' and 'Cthulhu Silhouette Mug' clear bestsellers
weights[0] = 3.0  # Enchanted Forest T-Shirt
weights[4] = 2.5  # Cthulhu Silhouette Mug
# Make 'Developer Joke Sticker' an underperformer
weights[-1] = 0.2

for i in range(NUM_RECORDS):
    # Choose a product based on weights
    chosen_product = random.choices(all_products, weights=weights, k=1)[0]
    
    # Generate a random date
    random_date = START_DATE + timedelta(seconds=random.randint(0, int((END_DATE - START_DATE).total_seconds())))
    
    # Create a record
    record = {
        "OrderID": 1001 + i,
        "Date": random_date.strftime('%Y-%m-%d'),
        "Product": chosen_product["name"],
        "Category": chosen_product["category"],
        "Price": chosen_product["price"],
        "CustomerID": fake.uuid4()
    }
    data.append(record)

# --- Create DataFrame and Save ---
df = pd.DataFrame(data)
df.to_csv("sales_data.csv", index=False)

print(f"Successfully generated sales_data.csv with {len(df)} records.")
