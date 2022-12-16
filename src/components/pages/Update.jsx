import React from "react";
import { FcFolder } from "react-icons/fc";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
// import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// year
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Update() {
  // handle dropdown warna
  const getInitialState = () => {
    const value = "";
    return value;
  };
  const [value, setValue] = useState(getInitialState);
  const [message, setMessage] = useState("");

  const handleColor = (e) => {
    setValue(e.target.value);
  };

  // getYear
  const [startDate, setStartDate] = useState(null);

  let { id } = useParams();

  let Navigate = useNavigate();

  const getUpdate = async () => {
    try {
      const response = await API.get("/vehicles/" + id);
      // console.log(response?.data);
      return setForm(response?.data);
    } catch (e) {
      return e.messages;
    }
  };

  const [form, setForm] = useState({
    id,
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

  // console.log(form);

  const notify = () => {
    if (form.namapemilik === "" || null) {
      toast.error("Nama Pemilik Tidak Boleh Kosong", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
    }
  };

  console.log(form.namapemilik);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      form.warna = value;
      form.tahunpembuatan = startDate?.getFullYear();
      await API.put("/vehicles", form);
      const setTimer = new Promise((resolve) => setTimeout(resolve, 1500));
      toast.promise(setTimer, {
        pending: "Sending Data",
        success: "Data Has Been Send 👌",
        error: "Data Don't Send🤯",
      });
      setTimeout(function () {
        Navigate("/");
      }, 4000);
    } catch (e) {
      console.error(e);
      notify();
    }

    // try {
    //   e.preventDefault();
    //   const config = {
    //     headers: {
    //       // "Content-type": "multipart/form-data",
    //       "Content-type": "application/json;",

    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //     },
    //   };

    //   // const body = JSON.parse(form);
    //   const body = JSON.stringify(form);
    //   setForm(body);

    //   // await axios.put(`http://localhost:8080/user/${id}`, user);
    //   await axios.put(`http://localhost:8081/api/v1/vehicles`, body, config);
    //   Navigate("/");
    // } catch (e) {
    //   console.error(e);
    // }
  });

  useEffect(() => {
    getUpdate();
  }, []);

  console.log(message);
  return (
    <div className="container-fluid">
      <ToastContainer />
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
                  type="text"
                  placeholder="Input Cari No.Registrasi Kendaraan"
                  value={form.nomorregkendaraan}
                  name="nomorregkendaraan"
                  onChange={handleChange}
                  required
                  disabled
                  style={{
                    cursor: "not-allowed",
                    background: "grey",
                    color: "white",
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nama Pemilik</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input Nama Pemilik"
                  value={form.namapemilik}
                  name="namapemilik"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold"> Merk Kendaraan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input Merk Kendaraan"
                  value={form.merkkendaraan}
                  name="merkkendaraan"
                  onChange={handleChange}
                  required
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
                  value={form.alamat}
                  name="alamat"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tahun Pembuatan</Form.Label>
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  value={startDate}
                  placeholderText={form?.tahunpembuatan}
                  required
                />

                {/* <Form.Control
                  type="text"
                  placeholder="Tahun Pembuatan"
                  value={form.tahunpembuatan}
                  name="tahunpembuatan"
                  onChange={handleChange}
                /> */}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Kapasitas Silinder</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kapasitas Silinder"
                  value={form.kapasitassilinder}
                  name="kapasitassilinder"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Warna</Form.Label>
                <div>
                  <select
                    value={value}
                    onChange={handleColor}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option value={form?.warna} selected disabled>
                      Choose One
                    </option>
                    <option value="Merah">Merah</option>
                    <option value="Hitam">Hitam</option>
                    <option value="Biru">Biru</option>
                    <option value="Abu-abu">Abu-abu</option>
                  </select>
                </div>

                {/* <Form.Control
                  type="text"
                  placeholder="Warna"
                  value={form.warna}
                  name="warna"
                  onChange={handleChange}
                /> */}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Bahan Bakar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bahan Bakar"
                  value={form.bahanbakar}
                  name="bahanbakar"
                  onChange={handleChange}
                  required
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
            type="submit"
            onClick={(e) => handleSubmit.mutate(e)}
          >
            Simpan
          </Button>

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

export default Update;
