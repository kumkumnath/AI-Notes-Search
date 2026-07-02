from pydantic import BaseModel, EmailStr

# The data we expect when a user registers
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# The data we send back to the user (never the password!)
class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True # Allows Pydantic to read SQLAlchemy models