from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import text
from .config import settings

DATABASE_URL = settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

engine = create_async_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    pool_recycle=3600,
)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

async def call_procedure(db: AsyncSession, procedure_name: str, params: dict = None):
    if params is None:
        params = {}
    
    param_list = ", ".join([f":{key}" for key in params.keys()])
    sql = text(f"CALL {procedure_name}({param_list})")
    
    await db.execute(sql, params)
    await db.commit()

async def call_procedure_with_result(db: AsyncSession, procedure_name: str, params: dict = None):
    if params is None:
        params = {}
    
    param_placeholders = []
    for key, value in params.items():
        param_placeholders.append(f"{key} := :{key}")
    
    param_str = ", ".join(param_placeholders)
    sql = text(f"SELECT * FROM {procedure_name}({param_str})")
    
    result = await db.execute(sql, params)
    return result.fetchall()
