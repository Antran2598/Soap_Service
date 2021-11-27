using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;


namespace NV_SITE
{
    class NV_DAO
    {
        /* String strCon = ConfigurationManager.ConnectionStrings["strCon"].ConnectionString;*/ // in App.config 
        MydbDataContext db = new MydbDataContext(ConfigurationManager.ConnectionStrings["strCon"].ConnectionString); // in App.config 
        public List<ChitietNV> laytatca()
        {
            db.ObjectTrackingEnabled = false;
            List<ChitietNV> nhanviens = db.ChitietNVs.ToList();
            return nhanviens;

        }


        public List<ChitietNV> Selectbyword(String keyword)
         {
            db.ObjectTrackingEnabled = false;
            List<ChitietNV> Nhanviens = db.ChitietNVs.Where(b => b.Ten.Contains(keyword)).ToList();
            return Nhanviens;
        }


        public ChitietNV Selectbycode(int manv) 
        {
            db.ObjectTrackingEnabled = false;
            ChitietNV nhanvien = db.ChitietNVs.SingleOrDefault(b => b.Manv == manv);
            return nhanvien;
        }

        public bool Insert(ChitietNV newnhanvien)
        {
            try
            {
                db.ChitietNVs.InsertOnSubmit(newnhanvien);
                db.SubmitChanges();
                return true;
            }
            catch { return false; }
        }

        public bool Delete(int manv)
        {
            ChitietNV dbnhanvien = db.ChitietNVs.SingleOrDefault(b => b.Manv == manv);
            if (db.ChitietNVs != null)
            {
                try
                {
                    db.ChitietNVs.DeleteOnSubmit(dbnhanvien);
                    db.SubmitChanges();
                    return true;
                }
                catch { return false; }
            }
            return false;
        }


        public bool Update(ChitietNV newnhanvien)
        {
            ChitietNV dbnhanvien = db.ChitietNVs.SingleOrDefault(b => b.Manv == newnhanvien.Manv);
            if(dbnhanvien != null)
            {
                try
                {
                    dbnhanvien.Ten = newnhanvien.Ten;
                    dbnhanvien.Chucvu = newnhanvien.Chucvu;
                    dbnhanvien.Phongban = newnhanvien.Phongban;
                    dbnhanvien.Chuthich = newnhanvien.Chuthich;
                    db.SubmitChanges();
                    return true;
                }
                catch { return false; }

            }
            return false;
        }
    }
        
}
