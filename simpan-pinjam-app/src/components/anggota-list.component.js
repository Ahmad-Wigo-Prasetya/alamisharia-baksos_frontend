import React, { Component } from "react";
import SimpanPinjamDataService from "../services/simpan-pinjam.service";

class ListAnggotaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            anggotas: []
        };
        this.addAnggota = this.addAnggota.bind(this);
        this.updateAnggota = this.updateAnggota.bind(this);
        // this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        SimpanPinjamDataService.getAllAnggota()
            .then(response => {
                // sort by id
                response.data.result.sort(function (a, b) {
                    return a.id - b.id;
                });

                this.setState({
                    anggotas: response.data.result
                });
                console.log(response.data.result);
            })
            .catch(e => {
                console.log(e);
            });
    }

    addAnggota() {
        this.props.history.push('/add-anggota');
    }

    updateAnggota(id, anggota) {
        this.props.history.push(`/update-anggota/${id}`);

        this.props.history.push({
            pathname: `/update-anggota/${id}`,
            state: { anggotaBeingUpdated: anggota }
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Daftar Anggota</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={() => this.addAnggota()}> +Tambah Anggota</button>
                </div>
                <br></br>
                <div className="row">
                    <table id="table-anggota" class="table table-hover table-striped table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Tanggal Lahir</th>
                                <th>Alamat</th>
                                <th>Pekerjaan</th>
                                <th>Gaji</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.anggotas.map(anggota => (
                                <tr key={anggota.id}>
                                    <td>{anggota.nama}</td>
                                    <td>
                                        {new Intl.DateTimeFormat('en-GB', {
                                            month: 'long',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(anggota.tanggal_lahir))}
                                    </td>
                                    <td>{anggota.alamat}</td>
                                    <td>{anggota.pekerjaan}</td>
                                    <td>{anggota.gaji}</td>
                                    <td>
                                        <button onClick={() => this.updateAnggota(anggota.id, anggota)} className="btn btn-success btn-sm">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListAnggotaComponent