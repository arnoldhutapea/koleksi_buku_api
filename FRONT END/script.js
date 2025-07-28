const API_URL = "http://127.0.0.1:5000/buku";

const form = document.getElementById("buku-form");
const tableBody = document.querySelector("#buku-table tbody");

const judulInput = document.getElementById("judul");
const pengarangInput = document.getElementById("pengarang");
const tahunInput = document.getElementById("tahun_terbit");
const kategoriInput = document.getElementById("kategori");
const isbnInput = document.getElementById("isbn");

let editMode = false;
let editId = null;

// ✅ Load semua buku dari API
async function loadBuku() {
  const res = await fetch(API_URL);
  const data = await res.json();

  tableBody.innerHTML = "";

  data.forEach(b => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.judul}</td>
      <td>${b.pengarang}</td>
      <td>${b.tahun_terbit}</td>
      <td>${b.kategori}</td>
      <td>${b.isbn}</td>
    `;

    const actionTd = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => startEdit(b);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteBuku(b.id);

    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);

    row.appendChild(actionTd);
    tableBody.appendChild(row);
  });
}

// ✅ Tambah atau Update Buku
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bukuData = {
    judul: judulInput.value.trim(),
    pengarang: pengarangInput.value.trim(),
    tahun_terbit: tahunInput.value.trim(),
    kategori: kategoriInput.value.trim(),
    isbn: isbnInput.value.trim()
  };

  if (!editMode) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bukuData)
    });
  } else {
    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bukuData)
    });
    editMode = false;
    editId = null;
    form.querySelector("button").textContent = "Tambah Buku";
  }

  form.reset();
  loadBuku();
});

// ✅ Hapus Buku
async function deleteBuku(id) {
  if (confirm("Yakin ingin menghapus buku ini?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadBuku();
  }
}

// ✅ Mulai Edit
function startEdit(buku) {
  judulInput.value = buku.judul;
  pengarangInput.value = buku.pengarang;
  tahunInput.value = buku.tahun_terbit;
  kategoriInput.value = buku.kategori;
  isbnInput.value = buku.isbn;

  editMode = true;
  editId = buku.id;
  form.querySelector("button").textContent = "Update Buku";
}

loadBuku();
