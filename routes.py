from flask import Blueprint, request, jsonify
from config import buku_collection
from models import serialize_buku
from bson.objectid import ObjectId

routes = Blueprint("routes", __name__)

@routes.route("/buku", methods=["GET"])
def get_all_buku():
    buku = buku_collection.find()
    return jsonify([serialize_buku(b) for b in buku]), 200

@routes.route("/buku", methods=["POST"])
def add_buku():
    data = request.json
    new_buku = {
        "judul": data["judul"],
        "pengarang": data["pengarang"],
        "tahun_terbit": data["tahun_terbit"],
        "kategori": data["kategori"],
        "isbn": data["isbn"]
    }
    result = buku_collection.insert_one(new_buku)
    new_buku["_id"] = result.inserted_id
    return jsonify(serialize_buku(new_buku)), 201

@routes.route("/buku/<id>", methods=["PUT"])
def update_buku(id):
    data = request.json
    buku_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {
            "judul": data["judul"],
            "pengarang": data["pengarang"],
            "tahun_terbit": data["tahun_terbit"],
            "kategori": data["kategori"],
            "isbn": data["isbn"]
        }}
    )
    return jsonify({"message": "Buku updated"}), 200

@routes.route("/buku/<id>", methods=["DELETE"])
def delete_buku(id):
    result = buku_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return jsonify({"message": "Buku deleted"}), 200
    else:
        return jsonify({"error": "Buku not found"}), 404
