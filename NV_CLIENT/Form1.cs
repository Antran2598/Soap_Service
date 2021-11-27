using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace NV_CLIENT
{
    public partial class Form1 : Form
    {
        bsite.NVService NV_Service = new bsite.NVService();
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
           List<bsite.ChitietNV> nhanviens = NV_Service.laydanhsach().ToList();
            dataGridView1.DataSource = nhanviens;
        }

        private void dataGridView1_SelectionChanged(object sender, EventArgs e)
        {
            if (dataGridView1.SelectedRows.Count == 1)
            {
                int manv = int.Parse(dataGridView1.SelectedRows[0].Cells["Manv"].Value.ToString());
                bsite.ChitietNV nhanvien = NV_Service.Getdetails(manv);
                if (nhanvien != null)
                {
                    textBox2.Text = nhanvien.Manv.ToString();
                    textBox3.Text = nhanvien.Ten;
                    textBox4.Text = nhanvien.Chucvu;
                    textBox5.Text = nhanvien.Phongban;
                    textBox6.Text = nhanvien.Chuthich;
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            String keyword = textBox1.Text.Trim();
            List<bsite.ChitietNV> nhanviens = NV_Service.Search(keyword).ToList();
            dataGridView1.DataSource = nhanviens;
        }

        private void button2_Click(object sender, EventArgs e)
        {

            bsite.ChitietNV newnhanvien = new bsite.ChitietNV()
            {
                Manv = 0,
                Ten = textBox3.Text.Trim(),
                Chucvu = textBox4.Text.Trim(),
                Phongban = textBox5.Text.Trim(),
                Chuthich = textBox6.Text.Trim()
            };
            bool result = NV_Service.Addnew(newnhanvien);
            if (result)
            {
                List<bsite.ChitietNV> nhanviens = NV_Service.laydanhsach().ToList();
                dataGridView1.DataSource = nhanviens;
            }
            else
            {
                MessageBox.Show("SORRY HONEY");
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            bsite.ChitietNV newnhanvien = new bsite.ChitietNV()
            {
                Manv = int.Parse(textBox2.Text.Trim()),
                Ten = textBox3.Text.Trim(),
                Chucvu = textBox4.Text.Trim(),
                Phongban = textBox5.Text.Trim(),
                Chuthich = textBox6.Text.Trim()
            };
            bool result = NV_Service.Update(newnhanvien);
            if (result)
            {
                List<bsite.ChitietNV> nhanviens = NV_Service.laydanhsach().ToList();
                dataGridView1.DataSource = nhanviens;
            }
            else
            {
                MessageBox.Show("SORRY HONEY");
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            DialogResult dialogResult = MessageBox.Show("ARE U SURE?", "CONFIRMATION", MessageBoxButtons.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
                int manv = int.Parse(textBox2.Text.Trim());
                bool result = NV_Service.Delete(manv);
                if (result)
                {
                    List<bsite.ChitietNV> nhanviens = NV_Service.laydanhsach().ToList();
                    dataGridView1.DataSource = nhanviens;
                }
                else
                {
                    MessageBox.Show("SORRY HONEY");
                }
            }
        }
    }
}
