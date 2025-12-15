import asyncio
import asyncpg

# Database connection details
DB_CONFIG = {
    'user': 'postgres',
    'password': '',
    'database': 'cloudkidd_db',
    'host': 'localhost',
    'port': 5432
}

# List of SQL procedure files to execute
PROCEDURE_FILES = [
    'procedures/add_to_cart.sql',
    'procedures/apply_coupon.sql',
    'procedures/cancel_order.sql',
    'procedures/create_order.sql',
    'procedures/decrease_inventory.sql',
    'procedures/freeze_order_pricing.sql',
    'procedures/increase_inventory.sql',
    'procedures/initiate_refund.sql',
    'procedures/lock_inventory.sql',
    'procedures/payment_webhook.sql',
    'procedures/register_payment_attempt.sql',
    'procedures/release_inventory.sql',
    'procedures/restore_inventory.sql',
    'procedures/rollback_coupon.sql',
    'procedures/send_otp.sql',
    'procedures/update_cart_quantity.sql',
    'procedures/update_order_status.sql',
    'procedures/validate_cart_before_checkout.sql',
    'procedures/validate_coupon_usage_limit.sql',
    'procedures/verify_otp.sql',
    'procedures/verify_payment.sql'
]

async def run_procedure(conn, file_path):
    """Run a single SQL procedure from a file."""
    try:
        with open(file_path, 'r') as file:
            sql = file.read()
        await conn.execute(sql)
        print(f"Successfully executed: {file_path}")
    except Exception as e:
        print(f"Failed to execute {file_path}: {e}")

async def main():
    """Main function to execute all procedures."""
    try:
        conn = await asyncpg.connect(**DB_CONFIG)
        print("Connected to the database.")

        for procedure_file in PROCEDURE_FILES:
            await run_procedure(conn, procedure_file)

        await conn.close()
        print("All procedures executed successfully.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    asyncio.run(main())
