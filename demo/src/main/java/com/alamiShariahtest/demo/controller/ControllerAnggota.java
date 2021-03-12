package com.alamiShariahtest.demo.controller;

import java.util.List;

import com.alamiShariahtest.demo.model.Anggota;
import com.alamiShariahtest.demo.model.HistoryTransaksiAnggota;
import com.alamiShariahtest.demo.repository.RepositoryAnggota;
import com.alamiShariahtest.demo.repository.RepositoryHistoryTransaksiAnggota;
import com.alamiShariahtest.demo.rest.BaseResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

@Controller
@RequestMapping("/api")
public class ControllerAnggota {

    @Autowired
    RepositoryAnggota repositoryAnggota;

    @Autowired
    RepositoryHistoryTransaksiAnggota repositoryHistoriTransaksiAnggota;

    // Posgre SQL
    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/getAllAnggota")
    @ResponseBody
    public BaseResponse<List<Anggota>> getAllAnggota() {

        BaseResponse<List<Anggota>> response = new BaseResponse<List<Anggota>>();
        response.setStatus(200);
        response.setResult(repositoryAnggota.findAll());

        if (response.getStatus() == 200) {
            System.out.println("BERHASIL RETRIEVE ANGGOTA");
        }
        return response;
    }

    // MongoDB
    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/getHistoriTransaksiAnggota")
    @ResponseBody
    public BaseResponse<List<HistoryTransaksiAnggota>> getHistoriTransaksiAnggota() {

        System.out.println("test get mongodb");
        BaseResponse<List<HistoryTransaksiAnggota>> response = new BaseResponse<List<HistoryTransaksiAnggota>>();
        System.out.println("test get mongodb masuk gak");
        response.setStatus(200);
        System.out.println("test get mongodb masuk gak 1");
        response.setMessage("Berhasil Mengambil Histori Transaksi Anggota");
        System.out.println("test get mongodb masuk gak 2");
        System.out.println(repositoryHistoriTransaksiAnggota.findAll().toString());
        System.out.println("test get mongodb masuk gak 3");
        response.setResult(repositoryHistoriTransaksiAnggota.findAll());
        System.out.println("test get mongodb masuk gak 4");

        return response;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, path = "/addAnggota")
    @ResponseBody
    public BaseResponse<Anggota> addAnggota(@RequestBody Anggota anggota, BindingResult bindingResult) {
        BaseResponse<Anggota> response = new BaseResponse<Anggota>();

        System.out.println("test post");
        if (bindingResult.hasErrors()) {
            response.setStatus(500);
            response.setMessage("Error");
        } else {
            Anggota newAnggota = new Anggota();
            newAnggota.setNama(anggota.getNama());
            newAnggota.setTanggal_lahir(anggota.getTanggal_lahir());
            newAnggota.setAlamat(anggota.getAlamat());
            newAnggota.setPekerjaan(anggota.getPekerjaan());
            newAnggota.setGaji(anggota.getGaji());

            repositoryAnggota.save(newAnggota);

            response.setStatus(200);
            response.setMessage("Berhasil Menambah Anggota");
            response.setResult(newAnggota);
        }

        return response;
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.PUT, path = "/updateAnggota")
    @ResponseBody
    public BaseResponse<Anggota> updateAnggota(@RequestBody Anggota anggota, BindingResult bindingResult,
            @RequestParam(value = "id") long id) {
        BaseResponse<Anggota> response = new BaseResponse<Anggota>();

        System.out.println("test edit");
        if (bindingResult.hasErrors()) {
            response.setStatus(500);
            response.setMessage("Error");
        } else {
            Anggota oldAnggota = repositoryAnggota.findById(id).get();
            oldAnggota.setNama(anggota.getNama());
            oldAnggota.setTanggal_lahir(anggota.getTanggal_lahir());
            oldAnggota.setAlamat(anggota.getAlamat());

            repositoryAnggota.save(oldAnggota);

            response.setStatus(200);
            response.setMessage("Berhasil Mengubah Anggota");
            response.setResult(anggota);
        }

        return response;
    }
}
