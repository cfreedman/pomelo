from typing import List
from pydantic import BaseModel, ConfigDict

from app.schema.ingredients import Ingredient


class Store(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    address: str
    latitude: float
    longitude: float

    ingredients: List[Ingredient]


class StoreCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    address: str
    latitude: float
    longitude: float
