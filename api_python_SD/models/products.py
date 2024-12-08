from typing import Union, List
from pydantic import Field, BaseModel
from datetime import datetime


class GetProducts(BaseModel):
    class Product(BaseModel):
        id: int = Field(default=-1)
        name: str = Field(default="")
        price: float = Field(default=0.00)
        description: str = Field(default="")
        image: str = Field(default="")
    product: List[Product] = Field(default_factory=dict)


class SetProduct(BaseModel):
    id: int = Field(default=-1)
    name: str = Field(default="")
    price: float = Field(default=0.00)
    description: str = Field(default="")
    image: str = Field(default="")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "",
                "price": 0.00,
                "description": "",
                "image": ""
            }
        }
