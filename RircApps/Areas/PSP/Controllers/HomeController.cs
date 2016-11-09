using System;
using System.Collections.Generic;
using System.Web.Mvc;
using RircApps.Areas.PSP.Models;
using XLS_library;

namespace RircApps.Areas.PSP.Controllers
{
    public class HomeController : Controller
    {
        //GET: PSP/Home
#if DEBUG
        public ActionResult Index()
        {
            return View();
        }
#else
        public ActionResult Index( string sid )
        {
            Identifier.Identifier ident = new Identifier.Identifier();

            List<Identifier.Template> sidList = ident.GetUSR(sid);

            if ( sidList.Count > 0 )
            {
                return View();
            }
            else
            {
                return View( "AuthError" );
            }
        }
#endif

        #region WriteOutReport

        public ActionResult GetWriteOutHtml()
        {
            var writeOutHTML = Resources.ResourcePartialHTML.write_out_report;

            return Json(writeOutHTML, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetWriteOutReport(string dateFrom, string dateBefore)
        {
            Storage.StorageUnivarsalField = WriteOutReport.GetWriteOutReport(dateFrom, dateBefore);
            return Json(Storage.StorageUnivarsalField, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetWriteOutReportExcel()
        {
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + "Areas\\PSP\\Reports\\ReportWriteOut.xlsx";
                XLSWriter writer = new XLSWriter();
                if (writer.GetXLSFile(ListTransformer.ListToArrayForWriteOut(Storage.StorageUnivarsalField), path))
                {
                    return Json("true", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("false", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion


        #region ArrivedMiliteryReport
        public ActionResult GetArrivedMilitaryHtml()
        {
            var arrivedMilitaryHTML = Resources.ResourcePartialHTML.arrived_military_report;

            return Json(arrivedMilitaryHTML, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetArrivedMilitaryReport(string dateRDFrom, string dateRDBefore, string dateSTFrom, string dateSTBefore)
        {
            Storage.StorageUnivarsalField = ArrivedMilitaryReport.GetArrivedMilitaryReport(dateRDFrom, dateRDBefore, dateSTFrom, dateSTBefore);
            return Json(Storage.StorageUnivarsalField, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetArrivedMilitaryReportExcel()
        {
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + "Areas\\PSP\\Reports\\ReportArrivedMilitary.xlsx";
                XLSWriter writer = new XLSWriter();
                if (writer.GetXLSFile(ListTransformer.ListToArrayForArrivedMilitary(Storage.StorageUnivarsalField), path))
                {
                    return Json("true", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("false", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion


        #region DropOutMilitaryReport

        public ActionResult GetDropOutMilitaryHtml()
        {
            var DropOutMilitaryHtml = Resources.ResourcePartialHTML.drop_out_military_report;

            return Json(DropOutMilitaryHtml, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetDropOutMilitaryReport(string dateRDFrom, string dateRDBefore, string dateSTFrom, string dateSTBefore)
        {
            Storage.StorageUnivarsalField = DropOutMilitaryReport.GetDropOutMilitaryReport(dateRDFrom, dateRDBefore, dateSTFrom, dateSTBefore);
            return Json(Storage.StorageUnivarsalField, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDropOutMilitaryReportExcel()
        {
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + "Areas\\PSP\\Reports\\ReportDropOutMilitary.xlsx";
                XLSWriter writer = new XLSWriter();
                if (writer.GetXLSFile(ListTransformer.ListToArrayForDropOutMilitary(Storage.StorageUnivarsalField), path))
                {
                    return Json("true", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("false", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion


        #region StrenghtChangeReport

        public ActionResult StrenghtChangeReportHtml()
        {
            var strenghtChangeReportHtml = Resources.ResourcePartialHTML.strenght_change_report;

            return Json(strenghtChangeReportHtml, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDUItems() {
            var DUItems = StrengthChangeReport.GetDUItems();
            return Json(DUItems, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetStrengthChangeRegistrationReport(string dateFrom, string dateBefore, string duItems)
        {
            Storage.StorageItemsStrengthChangeRegistration = StrengthChangeReport.GetStrengthChangeRegistrationReport(dateFrom, dateBefore, duItems);

            return Json(Storage.StorageItemsStrengthChangeRegistration, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetStrengthChangeDropOutReport(string dateFrom, string dateBefore, string duItems)
        {
            Storage.StorageItemsStrengthChangeDropOut = StrengthChangeReport.GetStrengthChangeDropOutReport(dateFrom, dateBefore, duItems);
            return Json(Storage.StorageItemsStrengthChangeDropOut, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetStrengthChangeRegistrationReportExcel()
        {

            var strengthChange = StrengthChangeReport.StrengChangeToExcel();

            return Json(strengthChange, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}