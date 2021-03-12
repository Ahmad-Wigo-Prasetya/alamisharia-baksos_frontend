package com.alamiShariahtest.demo.model;

import java.util.List;

import javax.persistence.*;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;

@Document(collection = "history-transaksi")
@AllArgsConstructor
public class HistoryTransaksiAnggota {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String namaAnggotaBertransaksi;
    // Foreign key

    // One-to-Many
    private List<Transaksi> transaksi;

    // Setter dan Getter

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNamaAnggotaBertransaksi() {
        return namaAnggotaBertransaksi;
    }

    public void setNamaAnggotaBertransaksi(String namaAnggotaBertransaksi) {
        this.namaAnggotaBertransaksi = namaAnggotaBertransaksi;
    }

    public List<Transaksi> getTransaksi() {
        return transaksi;
    }

    public void setTransaksi(List<Transaksi> transaksi) {
        this.transaksi = transaksi;
    }

    public void addTransaksi(Transaksi transaksi) {
        this.transaksi.add(transaksi);
    }

    public HistoryTransaksiAnggota(long id, String namaAnggotaBertransaksi, List<Transaksi> transaksi) {
        this.id = id;
        this.namaAnggotaBertransaksi = namaAnggotaBertransaksi;
        this.transaksi = transaksi;
    }

    public HistoryTransaksiAnggota() {
    }

    @Override
    public String toString() {
        return "HistoryTransaksiAnggota [id=" + id + ", namaAnggotaBertransaksi=" + namaAnggotaBertransaksi
                + ", transaksi=" + transaksi + "]";
    }

}