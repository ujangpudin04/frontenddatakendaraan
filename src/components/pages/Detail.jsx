import React from "react";
import { FcFolder } from "react-icons/fc";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

function Detail() {
  const [data, setData] = useState();

  let { id } = useParams();

  // let { data: vehicles } = useQuery("vehiclesData", async () => {
  //   const response = await API.get("/vehicles/" + id);
  //   return response.data;
  // });

  const getData = async () => {
    try {
      const response = await API.get("/vehicles/" + id);
      return setData(response.data);
    } catch (e) {
      return e.messages;
    }
  };

  useEffect(() => {
    getData();
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
          {}
          <h5 className="mb-3">Detail Data Pemilik Kendaraan</h5>
          <Form className="d-flex gap-5">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  No.Registrasi Kendaraan
                </Form.Label>
                <Form.Control
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                  disabled
                  type="text"
                  value={data?.nomorregkendaraan}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nama Pemilik</Form.Label>
                <Form.Control
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                  disabled
                  type="text"
                  value={data?.namapemilik}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold"> Merk Kendaraan</Form.Label>
                <Form.Control
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                  disabled
                  type="text"
                  value={data?.merkkendaraan}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  {" "}
                  Alamat Pemilik Kendaraan
                </Form.Label>
                <Form.Control
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                  disabled
                  as="textarea"
                  rows={3}
                  value={data?.alamat}
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tahun Pembuatan</Form.Label>
                <Form.Control
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                  disabled
                  type="text"
                  value={data?.tahunpembuatan}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Kapasitas Silinder</Form.Label>
                <Form.Control
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                  disabled
                  type="text"
                  value={data?.kapasitassilinder}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Warna</Form.Label>
                <Form.Control
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                  disabled
                  type="text"
                  value={data?.warna}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Bahan Bakar</Form.Label>
                <Form.Control
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                  disabled
                  type="text"
                  value={data?.bahanbakar}
                />
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>

      {/* Button */}
      <div className="row mb-3">
        <div className="col d-flex justify-content-start">
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
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
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Detail;
