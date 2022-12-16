import React from "react";
import { toast } from "react-toastify";

function Msg({ uid }) {
  return <span>{uid}</span>;
}

function Create2() {
  const notify = () => {
    toast(<Msg uid={"this is a uid for real"} />, {
      onOpen: ({ uid }) => window.alert(uid),
      onClose: ({ uid }) => window.alert(uid),
    });
  };

  return <button onClick={notify}>Notify</button>;
}

export default Create2;

// import React from "react";
// import { useFormik } from "formik";
// import { FcFolder } from "react-icons/fc";
// import { Form, Button, Alert } from "react-bootstrap";
// import { useState } from "react";
// import { useMutation } from "react-query";

// // import { useQuery } from "react-query";
// import { API } from "../../config/api";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// // year
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { basicSchema } from "../schema";

// const Create2 = () => {
//   const Navigate = useNavigate();

//   // getYear
//   const [startDate, setStartDate] = useState(null);
//   const [message, setMessage] = useState(null);

//   // handle dropdown
//   const getInitialState = () => {
//     const value = "";
//     return value;
//   };

//   const [value, setValue] = useState(getInitialState);

//   const handleColor = (e) => {
//     setValue(e.target.value);
//   };

//   //   const [form, setForm] = useState({
//   //     nomorregkendaraan: "",
//   //     namapemilik: "",
//   //     alamat: "",
//   //     merkkendaraan: "",
//   //     tahunpembuatan: "",
//   //     kapasitassilinder: "",
//   //     warna: "",
//   //     bahanbakar: "",
//   //   });

//   //   const handleChange = (e) => {
//   //     setForm({
//   //       ...form,
//   //       [e.target.name]: e.target.value,
//   //     });
//   //   };

//   //   const handleSubmit = useMutation(async (e) => {
//   //     try {
//   //       e.preventDefault();
//   //       form.warna = value;
//   //       form.tahunpembuatan = startDate?.getFullYear();
//   //       await API.post("/vehicles", form);
//   //       Navigate("/");
//   //     } catch (e) {
//   //       const error = e.response.data.message;
//   //       setMessage(error);
//   //     }
//   //   });

//   // console.log(message);
//   const { handleChange, handleBlur, handleSubmit, values } = useFormik({
//     initialValues: {
//       nomorregkendaraan: "",
//       namapemilik: "",
//       merkkendaraan: "",
//       alamat: "",
//       tahunpembuatan: "",
//       kapasitassilinder: "",
//       warna: "",
//       bahanbakar: "",
//     },
//     validationSchema: basicSchema,
//     handleSubmit: useMutation(async (e) => {
//       try {
//         e.preventDefault();
//         values.warna = value;
//         values.tahunpembuatan = startDate?.getFullYear();
//         await API.post("/vehicles", values);
//         Navigate("/");
//       } catch (e) {
//         const error = e.response.data.message;
//         setMessage(error);
//       }
//     }),
//   });

//   console.log(values);

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row ">
//           <div className="col d-flex align-items-center">
//             <FcFolder style={{ fontSize: "60px" }} />
//             <h4 className="ps-3">Aplikasi Data Kendaraan</h4>
//           </div>
//         </div>
//         <div className="row">
//           <div
//             className="col m-3 p-3"
//             style={{
//               borderRadius: "5px",
//               border: "2px solid black",
//               background: "#FCE4D6",
//             }}
//           >
//             <h5 className="mb-3">Tambah Data Kendaraan</h5>
//             <Form
//               className="d-flex gap-5"
//               onSubmit={(e) => handleSubmit.mutate(e)}
//             >
//               <div className="col-md-3">
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">
//                     No.Registrasi Kendaraan
//                   </Form.Label>
//                   <Form.Control
//                     onBlur={handleBlur}
//                     name="nomorregkendaraan"
//                     // onChange={handleChange}
//                     type="text"
//                     placeholder="Input Cari No.Registrasi Kendaraan"
//                     required
//                     value={values.nomorregkendaraan}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Nama Pemilik</Form.Label>
//                   <Form.Control
//                     onBlur={handleBlur}
//                     type="text"
//                     placeholder="Input Nama Pemilik"
//                     name="namapemilik"
//                     value={values.namapemilik}
//                     onChange={handleChange}
//                     // onChange={handleChange}
//                     required
//                     // value={namapemilik}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold"> Merk Kendaraan</Form.Label>
//                   <Form.Control
//                     onBlur={handleBlur}
//                     type="text"
//                     placeholder="Input Merk Kendaraan"
//                     name="merkkendaraan"
//                     value={values.merkkendaraan}
//                     onChange={handleChange}
//                     // onChange={handleChange}
//                     required
//                     // value={merkkendaraan}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">
//                     Alamat Pemilik Kendaraan
//                   </Form.Label>
//                   <Form.Control
//                     onBlur={handleBlur}
//                     as="textarea"
//                     rows={3}
//                     placeholder="Input Alamat Pemilik Kendaraan"
//                     type="text"
//                     name="alamat"
//                     value={values.alamat}
//                     onChange={handleChange}
//                     // onChange={handleChange}
//                     required
//                     // value={alamat}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-3">
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Tahun Pembuatan</Form.Label>

//                   <DatePicker
//                     className="form-control"
//                     selected={startDate}
//                     onChange={(date) => setStartDate(date)}
//                     showYearPicker
//                     dateFormat="yyyy"
//                     value={startDate}
//                     placeholderText="Select Year"
//                     required
//                   />

//                   {/* <Form.Control
//                   type="year"
//                   placeholder="Tahun Pembuatan"
//                   name="tahunpembuatan"
//                 //   onChange={handleChange}
//                   // value={tahunpembuatan}
//                 /> */}
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">
//                     Kapasitas Silinder
//                   </Form.Label>
//                   <Form.Control
//                     onBlur={handleBlur}
//                     type="number"
//                     placeholder="Kapasitas Silinder"
//                     name="kapasitassilinder"
//                     value={values.kapasitassilinder}
//                     onChange={handleChange}
//                     // onChange={handleChange}
//                     required
//                     // value={kapasitassilinder}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Warna</Form.Label>

//                   <div>
//                     <select
//                       value={value}
//                       onChange={handleColor}
//                       className="form-select"
//                       aria-label="Default select example"
//                     >
//                       <option value="" selected disabled>
//                         Choose One
//                       </option>
//                       <option value="Merah">Merah</option>
//                       <option value="Hitam">Hitam</option>
//                       <option value="Biru">Biru</option>
//                       <option value="Abu-abu">Abu-abu</option>
//                     </select>
//                   </div>
//                   {/* <Form.Control
//                   type="text"
//                   placeholder="Warna"
//                   name="warna"
//                 //   onChange={handleChange}
//                   // value={warna}
//                 /> */}
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label className="fw-bold">Bahan Bakar</Form.Label>
//                   <Form.Control
//                     onBlur={handleBlur}
//                     type="text"
//                     placeholder="Bahan Bakar"
//                     name="bahanbakar"
//                     value={values.bahanbakar}
//                     onChange={handleChange}
//                     // onChange={handleChange}
//                     required
//                     // value={bahanbakar}
//                   />
//                 </Form.Group>
//               </div>
//             </Form>
//             <div className="row mb-3">
//               <div className="col d-flex justify-content-start">
//                 <Button
//                   variant="primary"
//                   className="me-3"
//                   style={{
//                     padding: ".5rem",
//                     width: "8rem",
//                     textAlign: "center",
//                   }}
//                   type="submit"
//                   //   onClick={(e) => handleSubmit.mutate(e)}
//                 >
//                   Simpan
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   className="mx-1"
//                   style={{
//                     padding: ".5rem",
//                     width: "8rem",
//                     textAlign: "center",
//                   }}
//                 >
//                   <Link
//                     to={"/"}
//                     style={{ textDecoration: "none", color: "white" }}
//                   >
//                     Kembali
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Button */}
//       </div>
//     </>
//   );
// };

// export default Create2;
