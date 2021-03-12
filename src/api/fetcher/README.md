
# Fetcher Module
Fetcher adalah module untuk melakukan async, module ini dibuat untuk memisahkan fungsi fetch data dari komponen dan mempermudah pembacaan code.

# Penulisan Module
```javascript
const [method][module] = () => { // ex: getIndividualNominativeList || fetchIndividualNominativeList || postIndividualNominativeList 
    axios.[method](...)
      .then(res => {
        //manipulasi data disini, kemudian di return atau langsung di return 
          return res.data
      })
      .catch(err => {
        throw new Error(err)
      })
}
```
atau 
```javascript
const [method][module] = async () => { // ex: getIndividualNominativeList
    try {
      const res = await axios.[method](...)
      // manipulasi data disini, kemudian di return atau langsung di return 
      return res.data
    } catch(err) {
      throw new Error(err)
    }
}
```
# Penggunaan Module
Fungsi useQuery digunakan pada pages

**GET**
```javascript
const {data, isLoading, isFetching, isError} = useQuery(
  [ //key useQuery
    'url/path',
    { param } // param digunakan hanya ketika ada, bila tidak bisa dikosongkan
  ],
  ,{
  fetchFinancingList, //fungsi dari fetcher
  {
    refetchOnWindowFocus: false,
    initialData: () => { //initial data bila masih bingung bisa copy dari key userquery
      const state = queryClient.getQueryState([
        financingListURL.FINANCING_LIST,
        { search: '', filter: 'APPLICATION_GENERATED', companyID: undefined }
      ]); 
      // If the query exists and has data that is no older than 10 seconds...
      if (state && Date.now() - state.dataUpdatedAt <= 240000 * 1000) {
        // return the individual todo
        return state.data;
      }
      return [];
    },
    onSuccess: () => {
      // trigger ketika function async sukses
    },
    onError: () => {
      // trigger ketika function async gagal
    },
    onSettled: () => {
      // trigger ketika function async selesai dilakukan, terlepas dari berhasil atau gagal
    }
  }
})
```

**POST/PUT/EDIT/DELETE:** 
```javascript
const  campaignSchedulerMutation = useMutation(postBulkCampaignScheduler, {
	onSuccess: (res) => {
		const { status, successIds } = res || {};
		const  successData = successIds || [];
		if (status === 'FAILED') {
			window.snackBar.error(
				'Terjadi kesalahan sistem ketika melakukan penjadwalan'
			);
		} else  if (successData.length) {
			successData.map((sD) =>
				window.snackBar(`Berhasil menjadwalkan campaign untuk ID ${sD}`)
			);
		}
	},
	onError: () => {
		window.snackBar.error(
			'Terjadi kesalahan sistem ketika melakukan penjadwalan'
		);
	},
	onSettled: () => {
		setBlocking(false);
		return  refetch();
	}
});
```

> Pada pages ketika memakai useMutation, bisa memanggil fungsinya dengan *[nama_fungsi]*.mutate(*if_any_param*)

`
