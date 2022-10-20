import React from "react";
import { FcFolder } from "react-icons/fc";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useState, useEffect } from "react";

function Update() {
  const [update, setUpdate] = useState();

  let { id } = useParams();

  // let { data: vehicles } = useQuery("vehiclesData", async () => {
  //   const response = await API.get("/vehicles/" + id);
  //   return response.data;
  // });

  const getUpdate = async () => {
    try {
      const response = await API.get("/vehicles/" + id);
      console.log(response?.data);
      return setUpdate(response.data);
    } catch (e) {
      return e.messages;
    }
  };

  useEffect(() => {
    getUpdate();
  }, []);

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
          <h5 className="mb-3">Edit Data Kendaraan</h5>
          <Form className="d-flex gap-5">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  No.Registrasi Kendaraan
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input Cari No.Registrasi Kendaraan"
                  value={update.nomorregkendaraan}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nama Pemilik</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input Nama Pemilik"
                  value={update.namapemilik}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold"> Merk Kendaraan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input Merk Kendaraan"
                  value={update.merkkendaraan}
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
                  value={update.alamat}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tahun Pembuatan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tahun Pembuatan"
                  value={update.tahunpembuatan}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Kapasitas Silinder</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kapasitas Silinder"
                  value={update.kapasitassilinder}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Warna</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Warna"
                  value={update.warna}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Bahan Bakar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bahan Bakar"
                  value={update.bahanbakar}
                />
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>

      {/* Button */}
      <div className="row mb-3">
        <div className="col d-flex justify-content-start">
          <Button
            variant="primary"
            className="me-3"
            style={{ padding: ".5rem", width: "8rem", textAlign: "center" }}
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
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Update;
