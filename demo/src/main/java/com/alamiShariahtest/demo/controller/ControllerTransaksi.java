package com.alamiShariahtest.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.sql.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.alamiShariahtest.demo.model.Transaksi;
import com.alamiShariahtest.demo.model.Anggota;
import com.alamiShariahtest.demo.model.HistoryTransaksiAnggota;
import com.alamiShariahtest.demo.repository.RepositoryTransaksi;
import com.alamiShariahtest.demo.repository.RepositoryAnggota;
import com.alamiShariahtest.demo.repository.RepositoryHistoryTransaksiAnggota;
import com.alamiShariahtest.demo.rest.BaseResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

@Controller
@RequestMapping("/api")
public class ControllerTransaksi {

    @Autowired
    RepositoryTransaksi repositoryTransaksi;

    @Autowired
    RepositoryAnggota repositoryAnggota;

    @Autowired
    RepositoryHistoryTransaksiAnggota repositoryHistoriTransaksiAnggota;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/getAllTransaksi")
    @ResponseBody
    public BaseResponse<List<Transaksi>> getAllTransaksi() {
        BaseResponse<List<Transaksi>> response = new BaseResponse<List<Transaksi>>();
        response.setStatus(200);
        response.setMessage("Berhasil Mengambil Transaksi");
        response.setResult(repositoryTransaksi.findAll());

        return response;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/addTransaksi")
    @ResponseBody
    public BaseResponse<Transaksi> addTransaksi(@RequestBody Transaksi transaksi, BindingResult bindingResult,
            @RequestParam(value = "id_anggota") long idAnggota) {
        BaseResponse<Transaksi> response = new BaseResponse<Transaksi>();

        // System.out.println("test post");
        // System.out.println("id anggota: " + idAnggota);
        if (bindingResult.hasErrors()) {
            response.setStatus(500);
            response.setMessage("Error");
        } else {
            Transaksi newTransaksi = new Transaksi();
            newTransaksi.setStatus(transaksi.getStatus());
            newTransaksi.setNominal(transaksi.getNominal());
            newTransaksi.setTanggal_transaksi(transaksi.getTanggal_transaksi());
            Optional<Anggota> anggotaTransaksi = repositoryAnggota.findById(idAnggota);
            newTransaksi.setAnggota(anggotaTransaksi.get());

            System.out.println("MASUK GAK? X");
            repositoryTransaksi.save(newTransaksi);
            // Add to mongoDB
            // System.out.println("MASUK GAK? Y");
            // Boolean isAnggotaExist =
            // repositoryHistoriTransaksiAnggota.existsById(idAnggota);
            // System.out.println("MASUK GAK? Z");
            // System.out.println(isAnggotaExist);

            // if (isAnggotaExist) {
            // System.out.println("MASUK GAK? 1");
            // System.out.println(newTransaksi);

            // Optional<HistoryTransaksiAnggota> historiTransaksi =
            // repositoryHistoriTransaksiAnggota
            // .findById(idAnggota);

            // System.out.println("MASUK GAK? 2");
            // historiTransaksi.get().getTransaksi().add(newTransaksi);
            // System.out.println("MASUK GAK? 3");

            // repositoryHistoriTransaksiAnggota.save(historiTransaksi.get());

            // System.out.println(historiTransaksi.get().toString());
            // } else {
            // System.out.println("MASUK GAK? 4");

            // HistoryTransaksiAnggota historiTransaksi = new HistoryTransaksiAnggota();
            // historiTransaksi.setId(anggotaTransaksi.get().getId());
            // historiTransaksi.setNamaAnggotaBertransaksi(anggotaTransaksi.get().getNama());
            // System.out.println("MASUK GAK? 5");

            // ArrayList<Transaksi> riwayatTransaksi = new ArrayList<Transaksi>();

            // riwayatTransaksi.add(newTransaksi);

            // historiTransaksi.setTransaksi(riwayatTransaksi);
            // System.out.println("MASUK GAK? 6");
            // repositoryHistoriTransaksiAnggota.save(historiTransaksi);

            // System.out.println(historiTransaksi.toString());
            // }

            response.setStatus(200);
            response.setMessage("Berhasil Menambah Transaksi");
            response.setResult(transaksi);
        }

        return response;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/updateTransaksi")
    @ResponseBody
    public BaseResponse<Transaksi> updateTransaksi(@RequestBody Transaksi transaksi, BindingResult bindingResult,
            @RequestParam(value = "id") long id, @RequestParam(value = "id_anggota") long idAnggota) {
        BaseResponse<Transaksi> response = new BaseResponse<Transaksi>();

        System.out.println("test edit");
        if (bindingResult.hasErrors()) {
            response.setStatus(500);
            response.setMessage("Error");
        } else {
            Transaksi oldTransaksi = repositoryTransaksi.findById(id).get();
            oldTransaksi.setStatus(transaksi.getStatus());
            oldTransaksi.setNominal(transaksi.getNominal());
            oldTransaksi.setTanggal_transaksi(transaksi.getTanggal_transaksi());
            Optional<Anggota> anggotaTransaksi = repositoryAnggota.findById(idAnggota);
            oldTransaksi.setAnggota(anggotaTransaksi.get());

            repositoryTransaksi.save(oldTransaksi);

            response.setStatus(200);
            response.setMessage("Berhasil Mengubah Transaksi");
            response.setResult(transaksi);
        }

        return response;
    }

}
