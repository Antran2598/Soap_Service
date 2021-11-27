using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace NV_SITE
{
    /// <summary>
    /// Summary description for NVService
    /// </summary>
    [WebService(Namespace = "http://antran.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class NVService : System.Web.Services.WebService
    {
        [WebMethod]
        public List<ChitietNV> laydanhsach()
        {
            List<ChitietNV> nhanviens = new NV_DAO().laytatca();
            return nhanviens;
        }
        [WebMethod]
        public ChitietNV Getdetails(int manv)
        {
            ChitietNV nhanvien = new NV_DAO().Selectbycode(manv);
            return nhanvien;

        }
        [WebMethod]
        public List<ChitietNV> Search(String keyword)
        {
            List<ChitietNV> nhanviens = new NV_DAO().Selectbyword(keyword);
            return nhanviens;
        }
        [WebMethod]
        public bool Addnew(ChitietNV newnhanvien)
        {
            bool result = new NV_DAO().Insert(newnhanvien);
            return result;
        }

        [WebMethod]
        public bool Delete(int manv)
        {
            bool result = new NV_DAO().Delete(manv);
            return result;
        }

        [WebMethod]
        public bool Update(ChitietNV newnhanvien)
        {
            bool result = new NV_DAO().Update(newnhanvien);
            return result;
        }

    }
}
