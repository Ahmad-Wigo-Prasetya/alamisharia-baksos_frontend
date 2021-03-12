package com.alamiShariahtest.demo.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.*;

import com.alamiShariahtest.demo.model.Transaksi;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Anggota")
public class Anggota implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "nama")
    private String nama;

    @Column(name = "tanggal_lahir")
    private Date tanggal_lahir;

    @Column(name = "alamat")
    private String alamat;

    @Column(name = "pekerjaan")
    private String pekerjaan;

    @Column(name = "gaji")
    private Integer gaji;

    // Foreign key

    // One-to-Many
    @OneToMany(mappedBy = "anggota", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Transaksi> transaksi;

    // Setter dan Getter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public Date getTanggal_lahir() {
        return tanggal_lahir;
    }

    public void setTanggal_lahir(Date tanggal_lahir) {
        this.tanggal_lahir = tanggal_lahir;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    @Override
    public String toString() {
        return "Anggota [id=" + id + ", nama=" + nama + ", tanggal_lahir=" + tanggal_lahir + ", alamat=" + alamat + "]";
    }

    public List<Transaksi> getTransaksi() {
        return transaksi;
    }

    public void setTransaksi(List<Transaksi> transaksi) {
        this.transaksi = transaksi;
    }

    public Anggota(long id, String nama, Date tanggal_lahir, String alamat, List<Transaksi> transaksi) {
        this.id = id;
        this.nama = nama;
        this.tanggal_lahir = tanggal_lahir;
        this.alamat = alamat;
        this.transaksi = transaksi;
    }

    public Anggota() {
    }

    public String getPekerjaan() {
        return pekerjaan;
    }

    public void setPekerjaan(String pekerjaan) {
        this.pekerjaan = pekerjaan;
    }

    public Integer getGaji() {
        return gaji;
    }

    public void setGaji(Integer gaji) {
        this.gaji = gaji;
    }
}
