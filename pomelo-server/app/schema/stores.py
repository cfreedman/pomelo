from pydantic import BaseModel, ConfigDict


class Store(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    address: str
    latitude: float
    longitude: float


class StoreCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    address: str
    latitude: float
    longitude: float
