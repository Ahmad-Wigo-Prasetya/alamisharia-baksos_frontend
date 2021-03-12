import React, { Component } from "react";
import SimpanPinjamDataService from "../services/simpan-pinjam.service";

class AddAnggotaComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      nama: '',
      tanggal_lahir: '',
      alamat: '',
      pekerjaan: '',
      gaji: 0,

      submitted: false
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    // this.onChangeNama = this.onChangeNama.bind(this);
    // this.onChangeTanggalLahir = this.onChangeTanggalLahir.bind(this);
    // this.onChangeAlamat = this.onChangeAlamat.bind(this);
    // this.onChangePekerjaan = this.onChangePekerjaan.bind(this);
    // this.onChangeGaji = this.onChangeGaji.bind(this);
    this.saveNewAnggota = this.saveNewAnggota.bind(this);
  }

  onChangeValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // onChangeNama(e) {
  //   this.setState({
  //     nama: e.target.value
  //   });
  // }

  // onChangeTanggalLahir(e) {
  //   this.setState({
  //     tanggal_lahir: e.target.value
  //   });
  // }

  // onChangeAlamat(e) {
  //   this.setState({
  //     alamat: e.target.value
  //   });
  // }

  // onChangePekerjaan(e) {
  //   this.setState({
  //     pekerjaan: e.target.value
  //   });
  // }

  // onChangeGaji(e) {
  //   this.setState({
  //     gaji: e.target.value
  //   });
  // }

  saveNewAnggota() {
    var data = {
      nama: this.state.nama,
      tanggal_lahir: this.state.tanggal_lahir,
      alamat: this.state.alamat,
      pekerjaan: this.state.pekerjaan,
      gaji: this.state.gaji,
    };

    console.log(data);

    if (data.gaji < 0) {
      alert("Gaji kurang dari 0");
    } else {
      SimpanPinjamDataService.addAnggota(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            nama: response.data.nama,
            tanggal_lahir: response.data.tanggal_lahir,
            alamat: response.data.alamat,
            pekerjaan: response.data.pekerjaan,
            gaji: response.data.gaji,

            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  }

  backToDaftarAnggota() {
    this.props.history.push('/daftar-anggota');
  }

  anotherNewAnggota() {
    this.props.history.push('/add-anggota');
  }

  render() {
    const { nama, tanggal_lahir, alamat, pekerjaan, gaji } = this.state;
    return (
      <div className="submit-form container">
        {this.state.submitted ? (
          <div>
            <h4>Anggota Berhasil Ditambah!</h4>
            <button className="btn btn-light" onClick={() => this.backToDaftarAnggota()}>
              Kembali ke Daftar Anggota
            </button>
            <button className="btn btn-primary" onClick={() => this.anotherNewAnggota()}>
              +Tambah Anggota
            </button>
          </div>
        ) : (
            <div style={{ "text-align": 'left' }}>
              <h2 className="text-center">Tambah Anggota</h2>
              <hr></hr>
              <div className="form-group">
                <label htmlFor="nama">Nama :</label>
                <input
                  type="text"
                  className="form-control"
                  id="nama"
                  required
                  value={nama}
                  onChange={this.onChangeValue}
                  name="nama"
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="tanggal_lahir">Tanggal Lahir :</label>
                <input
                  type="date"
                  className="form-control"
                  id="tanggal_lahir"
                  required
                  value={tanggal_lahir}
                  onChange={this.onChangeValue}
                  name="tanggal_lahir"
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="alamat">Alamat :</label>
                <input
                  type="text"
                  className="form-control"
                  id="alamat"
                  required
                  value={alamat}
                  onChange={this.onChangeValue}
                  name="alamat"
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="pekerjaan">Pekerjaan :</label>
                <input
                  type="text"
                  className="form-control"
                  id="alamat"
                  required
                  value={pekerjaan}
                  onChange={this.onChangeValue}
                  name="pekerjaan"
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="gaji">Gaji :</label>
                <input
                  type="number"
                  className="form-control"
                  id="alamat"
                  required
                  value={gaji}
                  onChange={this.onChangeValue}
                  name="gaji"
                ></input>
              </div>

              <button onClick={this.saveNewAnggota} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
      </div>
    );
  }
}

export default AddAnggotaComponent