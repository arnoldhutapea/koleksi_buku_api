from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["koleksi_buku_db"]
buku_collection = db["buku"]
