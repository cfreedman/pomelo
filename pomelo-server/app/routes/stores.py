from flask import Blueprint, jsonify, request

from app import db
from app.models import Store
import app.schema.stores as schema

stores_bp = Blueprint("stores", __name__)


@stores_bp.get("/")
def get_stores():
    stores = Store.query.all()
    response = [schema.Store(store).model_dump() for store in stores]
    return jsonify(response)


@stores_bp.get("/<int:id>")
def get_store_by_id(id: int):
    store = Store.query.get_or_404(id)
    response = schema.Store(store).model_dump()
    return jsonify(response)


@stores_bp.post("/")
def create_store():
    data = request.get_json()
    store_data = schema.Store.model_validate(**data)
    new_store = Store(**store_data.model_dump())
    db.session.add(new_store)
    db.session.commit()


@stores_bp.put("/<int:id>")
def update_store_by_id(id: int):
    store = Store.query.get_or_404(id)
    data = request.get_json()
    store_data = schema.Store.model_validate(**data)

    for field, value in schema.Store.model_dump():
        store.field = value
    db.session.commit()

    return jsonify(Store(store).model_dump()), 200


@stores_bp.delete("/<int:id>")
def delete_store_by_id(id: int):
    store = Store.get_or_404(id)
    db.session.delete(store)
    db.session.commit()

    return jsonify({"message": "Store deleted successfully"}), 200
