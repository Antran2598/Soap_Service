const URI = "https://bsite.net/antran2598/NVService.asmx";
const config = { headers : { 'Content-Type': 'text/xml' } }; 

function page_Load(){
    laydanhsach();
}

function btnSearch_Click(){
    var keyword = document.getElementById("txtKeyword").value.trim();
    if(keyword.length > 0){
        search(keyword);
    }else{
        laydanhsach();
    }
}

function lnkID_Click(Manv){
    getDetails(Manv);
}

function btnAdd_Click(){
    var newnhanvien = {
        Manv:0,
        Ten: document.getElementById("txtTen").value,
        Chucvu: document.getElementById("txtChucvu").value,
        Phongban: document.getElementById("txtPhongban").value,
        Chuthich: document.getElementById("txtChuthich").value
    };
    addNew(newnhanvien);
}

function btnUpdate_Click(){
    var newnhanvien = {
        Manv:document.getElementById("txtManv").value,
        Ten: document.getElementById("txtTen").value,
        Chucvu: document.getElementById("txtChucvu").value,
        Phongban: document.getElementById("txtPhongban").value,
        Chuthich: document.getElementById("txtChuthich").value
    };
    update(newnhanvien);
}

function btnDelete_Click(){
    if(confirm("ARE U SURE?")){
        var manv = document.getElementById("txtManv").value;
        deletee(manv);
    }
}

function laydanhsach() { 
    var body = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><laydanhsach xmlns="http://antran.org/" /></soap:Body></soap:Envelope>`; 
    axios.post(URI + "?op=laydanhsach", body, config).then((response) => { 
        var xmlData = response.data;
        //alert(xmlData); // for DEBUG
        var jsonData = new X2JS ().xml_str2json(xmlData);
        //alert(JSON.stringify (jsonData)); // for DEBUG 
        var nhanviens = jsonData.Envelope.Body.laydanhsachResponse.laydanhsachResult.ChitietNV;
        //alert(JSON.stringify (nhanviens)); // for DEBUG 
        renderNVList (nhanviens); 
     });    
}   

function search(keyword){
    var body = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><Search xmlns="http://antran.org/"><keyword>${keyword}</keyword></Search></soap:Body></soap:Envelope>`;
    axios.post(URI + "?op=Search", body, config).then((response) => { 
        var xmlData = response.data;
        //alert(xmlData);
        var jsonData = new X2JS ().xml_str2json(xmlData);
        //alert(JSON.stringify (jsonData));
        var data = jsonData.Envelope.Body.SearchResponse.SearchResult.ChitietNV;
        //alert(JSON.stringify (nhanviens));
        var nhanviens=[];
        if(Array.isArray(data)) nhanviens = data;
        else if(typeof(data) == "object") nhanviens.push(data);
        renderNVList(nhanviens);
    });  
}

function getDetails(manv){
    var body = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><Getdetails xmlns="http://antran.org/"><manv>${manv}</manv></Getdetails></soap:Body></soap:Envelope>`;
    axios.post(URI + "?op=Getdetails", body, config).then((response) => { 
        var xmlData = response.data;
        //alert(xmlData);
        var jsonData = new X2JS ().xml_str2json(xmlData);
        //alert(JSON.stringify (jsonData));
        var data = jsonData.Envelope.Body.GetdetailsResponse.GetdetailsResult;
        var nhanvien = data;
        renderNVDetails(nhanvien);
    });    
}

function addNew(newnhanvien){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Addnew xmlns="http://antran.org/">
          <newnhanvien>
            <Manv>${newnhanvien.Manv}</Manv>
            <Ten>${newnhanvien.Ten}</Ten>
            <Chucvu>${newnhanvien.Chucvu}</Chucvu>
            <Phongban>${newnhanvien.Phongban}</Phongban>
            <Chuthich>${newnhanvien.Chuthich}</Chuthich>
          </newnhanvien>
        </Addnew>
      </soap:Body>
    </soap:Envelope>`;
    axios.post(URI + "?op=Addnew", body, config).then((response) => {
        var xmlData = response.data;
        var jsonData = new X2JS ().xml_str2json(xmlData);
        var data = jsonData.Envelope.Body.AddnewResponse.AddnewResult;
        var result = JSON.parse(data);
        if (result){
            laydanhsach();
            clearTextboxes();
        }else{
            alert('sorry bae!!');
        }
    });
}

function update(newnhanvien){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Update xmlns="http://antran.org/">
          <newnhanvien>
            <Manv>${newnhanvien.Manv}</Manv>
            <Ten>${newnhanvien.Ten}</Ten>
            <Chucvu>${newnhanvien.Chucvu}</Chucvu>
            <Phongban>${newnhanvien.Phongban}</Phongban>
            <Chuthich>${newnhanvien.Chuthich}</Chuthich>
          </newnhanvien>
        </Update>
      </soap:Body>
    </soap:Envelope>`;
    axios.post(URI + "?op=Update", body, config).then((response) => {
        var xmlData = response.data;
        var jsonData = new X2JS ().xml_str2json(xmlData);
        var data = jsonData.Envelope.Body.UpdateResponse.UpdateResult;
        var result = JSON.parse(data);
        if (result){
            laydanhsach();
            clearTextboxes();
        }else{
            alert('sorry bae!!');
        }
    });
}

function deletee(manv){
    var body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Delete xmlns="http://antran.org/">
          <manv>${manv}</manv>
        </Delete>
      </soap:Body>
    </soap:Envelope>`;
    axios.post(URI + "?op=Delete", body, config).then((response) => {
        var xmlData = response.data;
        var jsonData = new X2JS ().xml_str2json(xmlData);
        var data = jsonData.Envelope.Body.DeleteResponse.DeleteResult;
        var result = JSON.parse(data);
        if (result){
            laydanhsach();
            clearTextboxes();
        }else{
            alert('sorry bae!!');
        }
    });
}

function renderNVList(nhanviens){
    var rows = "";
    for(var ChitietNV of nhanviens){
        rows += "<tr onclick='lnkID_Click(" + ChitietNV.Manv + ")' style='cursor:pointer'>";
        rows += "<td>" + ChitietNV.Manv + "</td>";
        rows += "<td>" + ChitietNV.Ten + "</td>";
        rows += "<td>" + ChitietNV.Chucvu + "</td>";
        rows += "<td>" + ChitietNV.Phongban + "</td>";
        rows += "<td>" + ChitietNV.Chuthich + "</td>";
        rows += "</td>";
    }
    var header = "<tr><th>Manv</th><th>Ten</th><th>Chucvu</th><th>Phongban</th><th>Chuthich</th></tr>";
    document.getElementById("lstNVS").innerHTML = header + rows;
}

function renderNVDetails(nhanvien){
    document.getElementById("txtManv").value = nhanvien.Manv;
    document.getElementById("txtTen").value = nhanvien.Ten ;
    document.getElementById("txtChucvu").value = nhanvien.Chucvu;
    document.getElementById("txtPhongban").value = nhanvien.Phongban;
    document.getElementById("txtChuthich").value = nhanvien.Chuthich;
}

function clearTextboxes(){
    document.getElementById("txtManv").value ='';
    document.getElementById("txtTen").value ='';
    document.getElementById("txtChucvu").value ='';
    document.getElementById("txtPhongban").value ='';
    document.getElementById("txtChuthich").value ='';
}

