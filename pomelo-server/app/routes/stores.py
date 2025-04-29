from flask import Blueprint, jsonify, request

from app import db
from app.models import Store
from app.schemas import StoreBase

stores_bp = Blueprint("stores", __name__)


@stores_bp.get("/")
def get_stores():
    stores = Store.query.all()
    response = [StoreBase(store).model_dump() for store in stores]
    return jsonify(response)


@stores_bp.get("/<int:id>")
def get_store_by_id(id: int):
    store = Store.query.get_or_404(id)
    response = StoreBase(store).model_dump()
    return jsonify(response)


@stores_bp.post("/")
def create_store():
    data = request.get_json()
    store_data = StoreBase.model_validate(**data)
    new_store = Store(**store_data.model_dump())
    db.session.add(new_store)
    db.session.commit()


@stores_bp.put("/<int:id>")
def update_store_by_id(id: int):
    store = Store.query.get_or_404(id)
    data = request.get_json()
    store_data = StoreBase.model_validate(**data)

    store.name = store_data.name
    store.address = store_data.address
    store.latitude = store_data.latitude
    store.longitude = store_data.longitude
    db.session.commit()

    return jsonify(StoreBase(store).model_dump()), 200


@stores_bp.delete("/<int:id>")
def delete_store_by_id(id: int):
    store = Store.get_or_404(id)
    db.session.delete(store)
    db.session.commit()

    return jsonify({"message": "Store deleted successfully"}), 200
