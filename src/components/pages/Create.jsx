import React from "react";
import { FcFolder } from "react-icons/fc";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "react-query";
// import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Create() {
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    nomorregkendaraan: "",
    namapemilik: "",
    alamat: "",
    merkkendaraan: "",
    tahunpembuatan: "",
    kapasitassilinder: "",
    warna: "",
    bahanbakar: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      await API.post("/vehicles", form);
      Navigate("/");
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col d-flex align-items-center">
          <FcFolder style={{ fontSize: "60px" }} />
          <h4 className="ps-3">Aplikasi Data Kendaraan</h4>
        </div>
      </div>
      <div className="row">
        <div
          className="col m-3 p-3"
          style={{
            borderRadius: "5px",
            border: "2px solid black",
            background: "#FCE4D6",
          }}
        >
          <h5 className="mb-3">Tambah Data Kendaraan</h5>
          <Form
            className="d-flex gap-5"
            onSubmit={(e) => handleSubmit.mutate(e)}
          >
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  No.Registrasi Kendaraan
                </Form.Label>
                <Form.Control
                  name="nomorregkendaraan"
                  onChange={handleChange}
                  type="text"
                  placeholder="Input Cari No.Registrasi Kendaraan"
                  // value={nomorregkendaraan}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nama Pemilik</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input Nama Pemilik"
                  name="namapemilik"
                  onChange={handleChange}
                  // value={namapemilik}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold"> Merk Kendaraan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input Merk Kendaraan"
                  name="merkkendaraan"
                  onChange={handleChange}
                  // value={merkkendaraan}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Alamat Pemilik Kendaraan
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Input Alamat Pemilik Kendaraan"
                  type="text"
                  name="alamat"
                  onChange={handleChange}
                  // value={alamat}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tahun Pembuatan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tahun Pembuatan"
                  name="tahunpembuatan"
                  onChange={handleChange}
                  // value={tahunpembuatan}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Kapasitas Silinder</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kapasitas Silinder"
                  name="kapasitassilinder"
                  onChange={handleChange}
                  // value={kapasitassilinder}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Warna</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Warna"
                  name="warna"
                  onChange={handleChange}
                  // value={warna}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Bahan Bakar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bahan Bakar"
                  name="bahanbakar"
                  onChange={handleChange}
                  // value={bahanbakar}
                />
              </Form.Group>
            </div>
          </Form>
          <div className="row mb-3">
            <div className="col d-flex justify-content-start">
              <Button
                variant="primary"
                className="me-3"
                style={{
                  padding: ".5rem",
                  width: "8rem",
                  textAlign: "center",
                }}
                type="submit"
                onClick={(e) => handleSubmit.mutate(e)}
              >
                Simpan
              </Button>
              <Button
                variant="secondary"
                className="mx-1"
                style={{
                  padding: ".5rem",
                  width: "8rem",
                  textAlign: "center",
                }}
              >
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Kembali
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
    </div>
  );
}

export default Create;
