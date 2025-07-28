def serialize_buku(buku):
    return {
        "id": str(buku["_id"]),
        "judul": buku["judul"],
        "pengarang": buku["pengarang"],
        "tahun_terbit": buku["tahun_terbit"],
        "kategori": buku["kategori"],
        "isbn": buku["isbn"]
    }
