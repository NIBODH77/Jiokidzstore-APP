from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    pool_recycle=3600,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def call_procedure(db, procedure_name: str, params: dict = None):
    if params is None:
        params = {}
    
    param_list = ", ".join([f":{key}" for key in params.keys()])
    sql = f"CALL {procedure_name}({param_list})"
    
    db.execute(text(sql), params)
    db.commit()

def call_procedure_with_result(db, procedure_name: str, params: dict = None):
    if params is None:
        params = {}
    
    param_placeholders = []
    for key, value in params.items():
        param_placeholders.append(f"{key} := :{key}")
    
    param_str = ", ".join(param_placeholders)
    sql = f"SELECT * FROM {procedure_name}({param_str})"
    
    result = db.execute(text(sql), params)
    return result.fetchall()
